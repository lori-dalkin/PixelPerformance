import { dbconnection } from "./dbconnection";
import { Inventory } from "./inventory";
import { Electronic } from "./electronic";

var db = new dbconnection().getDBConnector();

export class InventoryRecord extends Inventory {

    /****************************************************************
   * Method to return all bought Inventories saved in the database
   *****************************************************************/




    public static async findAllPurchased(): Promise<{ [key: string]: Inventory[] }> {
        const timeout = ms => new Promise(res => setTimeout(res, ms));
        await timeout(1000);

        return db.many('SELECT * FROM bought_inventory;')
            .then(function (rows) {
                let inventories: { [key: string]: Inventory[] } = {};

                for (let i = 0; i < rows.length; i++) {
                    if (inventories[rows[i].cart_id] == null) {
                        inventories[rows[i].cart_id] = new Array<Inventory>();
                    }

                    let currInventory: Inventory = new Inventory(rows[i].serialNumber, Inventory.getProduct(rows[i].electronicID));

                    if (rows[i].return_date != null) {
                        currInventory.setReturnDate(new Date(rows[i].return_date));
                    }

                    inventories[rows[i].cart_id].push(currInventory);
                }
                return inventories;
            }).catch(function (err) {
                console.log("There was an error retrieving all bought inventory: " + err);
                return null;
            });
    }
    public async save(): Promise<boolean> {

        return db.none("INSERT INTO bought_inventory VALUES ('" + this.getserialNumber() + "','" + this.getinventoryType().getId() + "','" + this.getCartId() +
            "','" + this.getReturnDate() + "');")
            .then(function () {
                console.log("monitor added to db");
                return true;
            }).catch(function (err) {
                console.log("Error adding monitor to the db: " + err);
                return false;
            });
    }

    /* public static async updatePurchased(): Promise<boolean> {
 
 
 
 
     }*/


}


