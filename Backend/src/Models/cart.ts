import { Inventory } from "./inventory";
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
}