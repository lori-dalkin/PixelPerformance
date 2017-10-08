import { dbconnection } from "./dbconnection";
import { Electronic} from "./electronic";

var db =   new dbconnection().getDBConnector();

export class Inventory {

    private static eletronics :Electronic[] = new Array<Electronic>();
    private serialNumber: string;
	private inventoryType: Electronic;

    constructor( serialNumber: string, inventoryType: Electronic) {
        this.serialNumber = serialNumber;
        this.inventoryType = inventoryType;
    }

    public setserialNumber(serialNumber:string): void{this.serialNumber = serialNumber;}
    public getserialNumber():string{return this.serialNumber;}

    public setinventoryType(inventoryType:Electronic): void{this.inventoryType = inventoryType;}
    public getinventoryType():Electronic{return this.inventoryType;}


    public async delete(): Promise<boolean>{
        return db.none("DELETE FROM inventories WHERE serialNumber ='"+ this.serialNumber + "';")
            .then(function () {
                return true;
            }).catch(function (err) {
                console.log("No matching object found for delete:"+ err);
                return false;
            });
    }

    public static find(serialNumber:string): Promise<Inventory>
    {
       return db.one('SELECT * FROM clients WHERE serialNumber =' + serialNumber + ';')
            .then(function (row) {
                return new Inventory(row.serialNumber, null);
            }).catch(function (err) {
                console.log("No matching object found: "+ err);
                return null;
            });
    }

    public static async findAll(): Promise<Inventory[]> {
        return db.many('SELECT * FROM clients')
            .then(function (data:Inventory[]) {
                let inventories: Inventory[] = data;
                let inventoryObjects: Inventory[] = new Array<Inventory>();
                for(let i=0;i<inventories.length;i++){
                    inventoryObjects.push(new Inventory(inventories[i].serialNumber, null));
                }
                return inventoryObjects;
            }).catch(function (err) {
                console.log("Error in getting all clients:" + err);
                return null;
            });
    } 

}