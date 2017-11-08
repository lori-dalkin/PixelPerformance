import { Inventory } from "./inventory";
import {dbconnection} from "./dbconnection";
import {afterMethod, beforeMethod} from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');


var db = new dbconnection().getDBConnector();
export class Cart {
    //This class will have an array of inventory objects, an id, and a userId.
    private id: string;
    private userId: string;
    private inventory: Inventory[] = new Array<Inventory>();

    constructor(newId: string, newUserId: string) {
        this.id = newId;
        this.userId = newUserId;
    }
    public getId(): string {return this.id;}
    public setId(newId: string):void {this.id = newId;}

    public getUserId(): string {return this.userId;}
    public setUserId(newUserId: string):void {this.userId = newUserId;}

    public setInventory(inv: Inventory[]):void{ this.inventory  = inv;}
    public getInventory(): Inventory[]{ return this.inventory;}

    /*******************************************************
     * Method to return all carts saved in the database
     *******************************************************/
    private static async findAllPurchased(): Promise<Cart[]>{
        return db.many('SELECT * FROM cart;')
            .then(function(rows) {
                let carts: Cart[] = new Array<Cart>();
                for(let i=0; i < rows.length; i++) {
                    carts.push(new Cart(rows[i].id, rows[i].client_id));
                }
                return carts;
            }).catch(function (err) {
                console.log("There was an error retrieving all carts: " + err);
                return null;
            });
    }

    /********************************************************
     * Function to load all carts with previous purchases
     *********************************************************/
    @afterMethod(function(meta) {
        assert(meta.result != null);
    })
    public static async findAllRecords(): Promise<Cart[]>{
        let savedInventories: { [key: string]: Inventory[]} = {};
        let savedCarts: Cart[] = [];
        let dataPromises = new Array();

        //find all previously purchased carts
        dataPromises.push(Cart.findAllPurchased())
        dataPromises[0].then((data) => {
            for(let i=0; i< data.length; i++){
                savedCarts.push(data[i]);
            }
        });

        //find all previously purchased inventories
        dataPromises.push(Inventory.findAllPurchased());
        dataPromises[1].then( (data) => {
            for (let cartid in data){
                savedInventories[cartid] = data[cartid];
            }
        });

        return Promise.all(dataPromises).then(() => {
            for (let i = 0; i < savedCarts.length; i++) {
                savedCarts[i].setInventory(savedInventories[savedCarts[i].getId()]);
            }
            return savedCarts;
        }).catch( function (err) {
            console.log("Loading previously saved carts could not be completed.");
            return null;
        });
    }


    
    public async saveCart(): Promise<Boolean> {
        let storeOrNot = new Boolean;
        storeOrNot = db.none("INSERT INTO cart VALUES ('" + this.id + ",'" + this.userId + ')')
            .then(function () {
                console.log("UserCart added to db");
                return true;
            }).catch(function (err) {
                console.log("Error adding UserCart to the db: " + err);
                return false;
            });

        for (let i = 0; i < this.inventory.length; i++) {
            storeOrNot = db.none("INSERT INTO bought_inventory VALUES ('" + this.inventory[i].getserialNumber + ",'" + this.inventory[i].getinventoryType().getId() + ",'" + this.id + ')')
                .then(function () {
                    console.log("UserCart added to db");
                    return true;
                }).catch(function (err) {
                    console.log("Error adding UserCart to the db: " + err);
                    return false;
                });
        }

        return storeOrNot;
    }


    /********************************************************
     * Method to delete cart item and database item
     *********************************************************/

    public async removeInventoryRecord(id: String): Promise<boolean> {
        console.log(id);
        for (let i = 0; i < this.getInventory().length; i ++){
            if (this.getInventory()[i].getserialNumber() == id){
                this.setInventory(this.getInventory().splice(i, 1));
                break;
            }
        }

        return db.none("DELETE FROM bought_inventory WHERE \"serialNumber\" ='"+ id + "';")
        .then(function () {
            return true;
        }).catch(function (err) {
            console.log("No matching object found for delete:"+ err);
            return false;
        });
    }

}