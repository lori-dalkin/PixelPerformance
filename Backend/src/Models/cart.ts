import { Inventory } from "./inventory";
import {dbconnection} from "./dbconnection";

var db = new dbconnection().getDBConnector();

export class Cart {
    //This class will have an array of inventory objects, an id, and a userId.
    private id:number;
    private userId:number;
    private inventory:Inventory[] = new Array<Inventory>();

    constructor(newId:number, newUserId:number) {
        this.id = newId;
        this.userId = newUserId;
    }
    public getId():number {return this.id;}
    public setId(newId:number):void {this.id = newId;}

    public getUserId():number {return this.userId;}
    public setUserId(newUserId):void {this.userId = newUserId;}

    public setInventory(inv:Inventory[]):void{ this.inventory  = inv;}
    public getInventory():Inventory[]{ return this.inventory;}

    /*******************************************************
     * Method to return all carts saved in the database
     *******************************************************/
    public static async findAllPurchased(): Promise<Cart[]>{
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
}