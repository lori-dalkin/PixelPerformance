import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";
import { Inventory } from "./Models/inventory";
import { InventoryRecord } from "./Models/inventoryrecord";
import {afterMethod, beforeInstance, beforeMethod} from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');
import * as uuid from "uuid";
import {isUndefined} from "util";
import {UnitOfWork} from "./unitofwork";


export class PurchaseManagement {

	private static _instance: PurchaseManagement;
	catalog: Catalog;
	activeCarts: Cart[];
	purchaseRecords: Cart[];
	unitOfWork: UnitOfWork;

	private constructor() {
		this.catalog = Catalog.getInstance();
		this.activeCarts = [];
		this.purchaseRecords = [];
		this.unitOfWork = UnitOfWork.getInstance();
		let dataPromises = new Array<Promise<Cart[]>>();

		dataPromises.push(Cart.findAllRecords());
		dataPromises[0].then((data) => {
			for (let i = 0; i<data.length; i++){
				this.purchaseRecords.push(data[i]);
			}
		});
	}

	public static getInstance() {
		if(!this._instance)
			this._instance = new this();
		return this._instance;
	}

    @beforeMethod(function (meta) {
        assert(validator.isUUID(meta.args[0]), "userID needs to be a uuid");
    })
    @afterMethod(function (meta) {
            assert(PurchaseManagement.getInstance().getCart(meta.args[0]) != null,"Cart was not create")
    })
	// startTransaction(userId: string): void
    public startTransaction(userId: string): void {
		if(this.findCart(userId)!=null){
			return;
		}
        var uuid1 = uuid.v1();
        let newCart = new Cart(uuid1, userId);
        this.activeCarts.push(newCart);
    }
	// cancelTransaction(userId: String): void
	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0]) != null, "no cart is assiated with the user");
	})
	@afterMethod(function(meta) {
		assert( PurchaseManagement.getInstance().findCart(meta.args[0]) == null, "cart was not removed from active carts");
	})

	public cancelTransaction(userId: String): void{
		for (let i = 0; i < this.activeCarts.length; i++){
			if (String(this.activeCarts[i].getUserId()) == userId){
				for (let a = 0; this.activeCarts[i].getInventory().length; a++){
					let tempCart = this.activeCarts[i].getInventory();
					tempCart[a].setLockedUntil(null);
				}
				this.activeCarts.splice(i,1);
			}
		}
	}

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) {
		assert(meta.result != null, "Inventory within cart not found.");
	})
	public viewCart(userId: string): Inventory []{
		return this.getCart(userId).getInventory()
	}

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "electronic id needs to be a uuid");
		assert(Catalog.getInstance().getInventoryByElectronic(meta.args[1]) != null,"electronic id  does not correspond to any item within Inventory");
		//assert(!meta.args[1].isLocked(), "Item is unavaible");
		//assert(PurchaseManagement.getInstance().findCart(meta.args[0]) == null || PurchaseManagement.getInstance().findCart(meta.args[0]).getInventory().length < 7,"Your cart is already full. (7 Max)")
	})
	@afterMethod(function(meta) {
		//assert(PurchaseManagement.getInstance().checkItemAddedToCart(meta.args[0],meta.args[1]), "Item was not added to cart" )
	})
	public addItemToCart(userId: string, electronicId: string): Boolean
	{
		let cart:Cart;
		try{
			cart = this.getCart(userId);
		}catch(e){
			var uuid1 = uuid.v1();
			cart = new Cart(uuid1, userId);
			this.activeCarts.push(cart);
		}

		let inventoryObj:Inventory = this.catalog.getInventoryByElectronic(electronicId);

		//obj is available to be taken since beforeMethod was successful
		//add obj to cart
		cart.getInventory().push(inventoryObj);
		//set obj lock time
		var futureDate = new Date(new Date().getTime() + 10*60000);
		inventoryObj.setLockedUntil(futureDate);

		//if obj was previously in another cart, remove it
		let prevCart =  this.findCart(inventoryObj.getCartId());
		if(prevCart != null)
			this.removeFromCart(prevCart.getUserId(),inventoryObj.getserialNumber());
		//set inventory's cart to this cart
		inventoryObj.setCartId(cart.getId());
		return true;
	}

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) {
		assert(meta.result != null, "There is no active cart for this user.");
	})
	public getCart(userId: string): Cart
	{
		for(var i=0;i<this.activeCarts.length; i++)
		{
			if(this.activeCarts[i].getUserId() == userId)
				return this.activeCarts[i];
		}
		return null;
	}


    @beforeMethod(function (meta) {
        assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
        // assert(PurchaseManagement.getInstance().findCart(meta.args[0]) != null, "there are no purchases associated to this account");
    })
    @afterMethod(function (meta) {
            assert(meta.result != null, "There was an error in retrieving your previous purchases");
    })
	// viewPurchases(userId: string): Inventory []

    public viewPurchases(userId: String): Inventory[] {
        let purchase_history: Inventory[] = new Array<Inventory>();
        for (let i = 0; i < this.purchaseRecords.length; i++) {
            if (this.purchaseRecords[i].getUserId() == userId && this.purchaseRecords[i].getInventory() != undefined) {
				purchase_history = purchase_history.concat(this.purchaseRecords[i].getInventory());
            }
		}
        
        return purchase_history;
    }
	// returnInventory(userId: string, serialNumber: string): bool

    @beforeMethod(function(meta) {
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
        assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
        // The client must have previous purchases recorded in the system.
        assert(PurchaseManagement.getInstance().findCart(meta.args[0]) != null, "there are no purchases associated to this account");
	 })
    @afterMethod(function(meta) {
		// The return is recorded to the client’s account.
		assert(PurchaseManagement.getInstance().getAllUsersPurchasedSerials(meta.args[0]).indexOf(meta.args[1]) < 0, "The return was not recorded to the user's account");
        //The returned items are put back into the system.
		assert(PurchaseManagement.getInstance().findInventoryBySerialNumber(meta.args[1]) != null, "The item was not successfully returned to the catalog.");
    })
    public returnInventory(userId: string, serialNumber: string): boolean{
		let allPurchases = this.purchaseRecords;
		let availableInventory = this.catalog;
        let returningInv: InventoryRecord;
        let returnedInv: Inventory;
        let modifiedCartId: string;
        let returnSuccess: boolean = true;
        let dateReturned: Date;
        let currInv: InventoryRecord[];

        //for each purchase record belonging to this user,
		//collect all inventories that were sold
		console.log("Finding all user's past purchases");
		for(let i = allPurchases.length - 1; i >= 0; i--){
            if (allPurchases[i].getUserId() == userId) {
                currInv = allPurchases[i].getInventory() as InventoryRecord[];

                //Find the inventory to return
                for (let invIndex = 0; invIndex < currInv.length; invIndex++) {
                    if (currInv[invIndex].getserialNumber() == serialNumber) {
                        if (currInv[invIndex].getserialNumber() == serialNumber) {
                            returningInv = currInv[invIndex];
                            modifiedCartId = allPurchases[i].getId();

                        }
                        // The object has previously been returned
                        if (returningInv.getReturnDate() != null) {
                        	console.log("Inventory has already been returned");
                        	return false;
                        }

                        dateReturned = new Date();
                        returningInv.setReturnDate(dateReturned);
                        console.log("returningInv returned date is : " + returningInv.getReturnDate());
                        break;
                    }
                }

                if (returningInv != null) {
                	break;
                }
			}
		}

		//set the cart and lockedUntil variables to null
	    returnedInv = new Inventory(returningInv.getserialNumber(), returningInv.getinventoryType());
		

		//Modify the cart to remove the inventory from its records
		console.log("Modifying db");
		let uow: UnitOfWork = this.unitOfWork;
		for (let i=0; i<allPurchases.length; i++){
            if (allPurchases[i].getId() == modifiedCartId) {
               
				returningInv.returnInventoryRecord(serialNumber, dateReturned).then((data) => {
					returnSuccess = data;
				});
                if (returnSuccess) {
                    availableInventory.returnInventory(returnedInv);
                    uow.registerNew(returnedInv);

                    if (allPurchases[i].getInventory().length == 0){
                    	let emptyCart: Cart = allPurchases[i];
                    	uow.registerDeleted(emptyCart);
                    }
                    return returnSuccess;
                }
                else {
                    console.log("Error processing return: could not remove purchase record for inventory with serial number: " + serialNumber)
                    return false;
                }
			}
		}
		return false;
    }


	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0]) != null, "no cart is assiated with the user");
		assert( meta.scope.getCart(meta.args[0]).getInventory().length>0, "an empty cart cannot be checkedout" )
	})
	@afterMethod(function(meta) {
		var purchaseManagement = PurchaseManagement.getInstance();
		//assert( purchaseManagement.findCart(meta.args[0]) == null, "cart was not removed from active carts");
		assert( purchaseManagement.findRecord(meta.args[0]) != null , "cart was not added to records");
		//assert(purchaseManagement.ifInventoriesExist(purchaseManagement.findRecord(meta.args[0]).getInventory()), "inventories weren't removed from catalog")
	})
	public checkout(userId: string):void{
		let cart:Cart =  this.findCart(userId);
		let uow: UnitOfWork = this.unitOfWork;
		for(let i=0; i< this.activeCarts.length;i++){
			if(this.activeCarts[i].getUserId() == userId){
				cart = this.activeCarts.splice(i, 1)[0];
				break;
			}
		}
		this.purchaseRecords.push(cart);
        for (let inventory of cart.getInventory()) {
            let invtodelete: Inventory = inventory ;
			this.catalog.checkoutInventory(inventory.getserialNumber());
			uow.registerDeleted(invtodelete);
		}
		uow.registerNew(cart);
		this.startTransaction(userId);
	}


	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0])!= null, "no cart was found for associated user")
	})

	@afterMethod(function(meta) {
		assert(meta.result != null,"matching inventory could not be found");
	})
	public removeFromCart(userId: string, serialNumber: string):Inventory{
		let cart = this.findCart(userId);
		let inventory= cart.getInventory();
		for( let i=0;i<inventory.length;i++){
			if(inventory[i].getserialNumber() == serialNumber){
				inventory[i].setCartId(null);
				inventory[i].setLockedUntil(null);
				return inventory.splice(i, 1)[0];
			}
		}
		return null;
	}

	// removeFromCart(userId: string, serialNumber: string): bool

	//Methods for Contract Programming
	public checkItemAddedToCart(userId:string, serialNumber:string):Boolean{
		for(let cart of this.activeCarts){
			if(cart.getUserId() == userId){
				for(let inventory of cart.getInventory()){
					if(inventory.getserialNumber() == serialNumber){
						return true;
					}
				}
			}
		}
		return false;
	}
	public checkItemIsLocked(givenItem:Inventory):Boolean{
		return givenItem.isLocked(); //return true if item in UNAVAILABLE
	}
	public findInventoryBySerialNumber(serialNumber):Inventory{
		let inventoryObj:Inventory;
		for(let i = 0;i<this.catalog.inventories.length;i++)
		{
			if(this.catalog.inventories[i].getserialNumber() == serialNumber)
			{
				inventoryObj = this.catalog.inventories[i];
				break;
			}
		}
		return inventoryObj;
	}

	public findCart( userId:string){
		for(let cart of this.activeCarts){
			if( cart.getUserId() == userId){
				return cart;
			}
		}
		return null
	}

	public findRecord( userId:string){
		for(let cart of this.purchaseRecords){
			if( cart.getUserId() == userId){
				return cart;
			}
		}
		return null
	}

	public ifInventoriesExist( inventories: Inventory[]): boolean{
		for( let inventory of inventories ){
			if( Catalog.getInstance().getInventory(inventory.getserialNumber()) != null ){
				return true;
			}
		}
		return false;
	}

	public getUsersPurchasedInventories(userId: string){
		let usersRecords: Cart[] = this.findAllRecordsForUser(userId);
		let allPurchases: Inventory[] = [];

		for(let i=0; i<usersRecords.length; i++){
			allPurchases.concat(usersRecords[i].getInventory());
		}
		return allPurchases;
	}

	public findAllRecordsForUser(userId: string): Cart[]{
		let allRecordsForUser: Cart[] = [];

		for(let i=0; i<this.purchaseRecords.length; i++){
			if (this.purchaseRecords[i].getUserId() == userId){
				allRecordsForUser.push(this.purchaseRecords[i]);
			}
		}
		return allRecordsForUser;
	}

	public getAllUsersPurchasedSerials(userId: string): string[]{
		let allPurchases: Inventory[] = this.getUsersPurchasedInventories(userId);
		let allSerials: string[] = [];

		for(let i=0; i<allPurchases.length; i++){
			allSerials.push(allPurchases[i].getserialNumber());
		}
		return allSerials;
	}

}
