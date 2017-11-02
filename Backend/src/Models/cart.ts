import { Inventory } from "./inventory";
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
}