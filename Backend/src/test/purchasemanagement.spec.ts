import { PurchaseManagement} from '../purchasemanagement';
import { WebPortal } from '../webportal';
import { expect } from 'chai';
import 'mocha';
import {dbconnection} from "../Models/dbconnection";
import {UserManagement} from "../usermanagement";
import { Inventory } from "../Models/inventory";
import { InventoryRecord } from "../Models/inventoryrecord";
import {User} from "../Models/user";
import {Catalog} from "../catalog";
import {Cart} from "../Models/cart";

var db = new dbconnection().getDBConnector();
let purchasemanagement = PurchaseManagement.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

describe('Adding an inventory to a cart', () => {
    
    it('should add the given inventory to the cart of a given client', () => {

        const client: User = UserManagement.getInstance().getAllClients()[0];
        const inventory: Inventory = Catalog.getInstance().inventories[0];

        PurchaseManagement.getInstance().addItemToCart(client.getId(),inventory.getinventoryType().getId());
        expect(PurchaseManagement.getInstance().checkItemAddedToCart(client.getId(), inventory.getserialNumber())).to.equal(true);            
    })
});

describe('Getting all inventory in a cart', () => {
    
    it('should return all inventory from a cart of a given client', () => {

        const client: User = UserManagement.getInstance().getAllClients()[0];
        const inventories = PurchaseManagement.getInstance().viewCart(client.getId());
        expect(inventories).to.exist;
        for (let i of inventories){
            expect(i).to.have.property('serialNumber');
            expect(i).to.have.property('inventoryType');
            expect(i).to.have.property('lockedUntil');
            expect(i).to.have.property('cartid');
            expect(i).to.have.property('returnDate');
        }           
    })
});

describe('Getting all purchase records', () => {

    it('should return a list of all purchase records for a given client', () => {
        const client: User = UserManagement.getInstance().getAllClients()[0];
        const userPurchases: Inventory[] = purchasemanagement.viewPurchases(client.getId());

        if(userPurchases.length != 0) {


            db.many("SELECT * FROM bought_inventory WHERE cart_id IN (SELECT cart_id FROM cart WHERE client_id='" + client.getId() + "');")
                .then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        let purchaseRecord = new InventoryRecord(data[i].serialNumber, Inventory.getProduct(data[i].electronicID));
                        purchaseRecord.setReturnDate(new Date(data[i].return_date));

                        //All purchases in working memory should be equal to all purchases in the db
                        expect(userPurchases[i]).to.deep.equal(purchaseRecord);
                    }
                }).catch(function (err) {
                console.log("No previous purchases");
            });
        }
        else{
            //Make a purchase for a client
            const purchaseItem: Inventory = Catalog.getInstance().inventories[0];
            const client: User = UserManagement.getInstance().getAllClients()[0];
            PurchaseManagement.getInstance().addItemToCart(client.getId(), purchaseItem.getinventoryType().getId());
            PurchaseManagement.getInstance().checkout(client.getId());

            //Retrieve the new purchase
            let userPurchases: Inventory[] = purchasemanagement.viewPurchases(client.getId());
        }

        for (let purchase of userPurchases) {
            //All purchases should have these properties
            expect(purchase).to.have.property('serialNumber');
            expect(purchase).to.have.property('inventoryType');
            expect(purchase).to.have.property('lockedUntil');
            expect(purchase).to.have.property('cartid');
            expect(purchase).to.have.property('returnDate');
        }
    })
});

describe('Returning an inventory', () => {

    it('Should return an inventory that was purchased', () => {

        //Make a purchase for a client
        const purchaseItem: Inventory = Catalog.getInstance().inventories[0];
        const client: User = UserManagement.getInstance().getAllClients()[0];
        PurchaseManagement.getInstance().addItemToCart(client.getId(), purchaseItem.getinventoryType().getId());
        PurchaseManagement.getInstance().checkout(client.getId());

        //Retrieve the new purchase
        let userPurchases: Inventory[] = purchasemanagement.viewPurchases(client.getId());
        let returnItem: InventoryRecord = userPurchases[userPurchases.length-1] as InventoryRecord;

        //Assert that the purchase exists, that it has not been returned and that the inventory is no longer available to be purchased
        expect(returnItem.getinventoryType().getId()).to.equal(purchaseItem.getinventoryType().getId());
        expect(returnItem.getReturnDate()).to.be.null;
        expect(PurchaseManagement.getInstance().findInventoryBySerialNumber(returnItem.getserialNumber())).to.be.undefined;

        //Make the return
        PurchaseManagement.getInstance().returnInventory(client.getId(), returnItem.getserialNumber());

        //Assert that the return was made and that the item is available for purchasing again
        userPurchases = purchasemanagement.viewPurchases(client.getId());
        returnItem = userPurchases[userPurchases.length-1] as InventoryRecord;
        expect(returnItem.getReturnDate()).to.not.be.null;
        expect(PurchaseManagement.getInstance().findInventoryBySerialNumber(returnItem.getserialNumber())).to.not.be.undefined;
    });
});

describe('Getting a cart by user id', () => {

    it('should return a cart for a given client', () => {

        const client: User = UserManagement.getInstance().getAllClients()[0];
        purchasemanagement.startTransaction(client.getId());
        const cart = PurchaseManagement.getInstance().getCart(client.getId());
        
        expect(cart).to.exist;
        expect(cart).to.be.an.instanceof(Cart);
        expect(cart).to.have.property('id');
        expect(cart).to.have.property('userId');
        expect(cart).to.have.property('inventory');
    });
});

describe('Deleting a cart by id', () => {

    it('should remove current user avtive cart', () => {
        
        const client: User = UserManagement.getInstance().getAllClients()[0];
        purchasemanagement.startTransaction(client.getId());
        const cart = PurchaseManagement.getInstance().getCart(client.getId());

        purchasemanagement.cancelTransaction(client.getId());

        let userActiveCart = false;
        for (let i = 0; i < purchasemanagement.activeCarts.length; i ++){
            if (purchasemanagement.activeCarts[i].getUserId() == client.getId()){
                userActiveCart = true;
            }
        }

        expect(userActiveCart).to.equal(false);
    });
});

describe('Deleteing inventory from cart by id', () => {

    it('should remove specific item from user cart', () => {

        const client: User = UserManagement.getInstance().getAllClients()[0];
        const inventory: Inventory = Catalog.getInstance().inventories[0];

        PurchaseManagement.getInstance().addItemToCart(client.getId(),inventory.getinventoryType().getId());   
        
        PurchaseManagement.getInstance().removeFromCart(client.getId(), inventory.getserialNumber());

        let deletedInventory = true;

        for (let i = 0; i < PurchaseManagement.getInstance().getCart(client.getId()).getInventory().length; i++){
            if ( PurchaseManagement.getInstance().getCart(client.getId()).getInventory()[i].getserialNumber() == inventory.getserialNumber()){
                deletedInventory = false;
            }
        }

        expect(deletedInventory).to.equal(true);

    });
});

describe ('Checking out a cart', () => {

    it('should remove current user active cart and move to purchased record', () => {
        const client: User = UserManagement.getInstance().getAllClients()[0];
        purchasemanagement.startTransaction(client.getId());

        const inventory: Inventory = Catalog.getInstance().inventories[0];
        PurchaseManagement.getInstance().addItemToCart(client.getId(),inventory.getinventoryType().getId());

        const cart = PurchaseManagement.getInstance().getCart(client.getId());

        PurchaseManagement.getInstance().checkout(client.getId());

        let deletedCart = true;
        for (let i = 0; i < PurchaseManagement.getInstance().activeCarts.length; i++){
            if(PurchaseManagement.getInstance().activeCarts[i] == cart){
                deletedCart = false;
            }
        }

        expect(deletedCart).to.equal(true);

        let purchasedCart = false;
        for (let a = 0; a < PurchaseManagement.getInstance().purchaseRecords.length; a++){
            if (PurchaseManagement.getInstance().purchaseRecords[a] == cart){
                purchasedCart = true;
            }
        }

        expect(purchasedCart).to.equal(true);
    });
});
