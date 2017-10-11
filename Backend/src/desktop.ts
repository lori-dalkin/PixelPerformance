import { ComputerSystem } from "./computersystem";
import { dbconnection } from "./dbconnection";
import { Electronic } from "./electronic";

var db = new dbconnection().getDBConnector();

export class Desktop extends ComputerSystem {
    private dimensions: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string,
                price: number, processor: string, ram: number, cpus: number,
                hardDrive: number, os: string, dimensions: string) {
        let electronicType = "Desktop";
        super(id, weight, modelNumber, brand, price, electronicType, processor, ram, cpus, hardDrive, os);
        this.dimensions = dimensions;
    }

    /*************************
    * Accessors and Mutators *
     *************************/
    public getDimensions(): string { return this.dimensions; }

    public setDimensions(dimensions: string) { this.dimensions = dimensions; }

    /**************************************************************
    * Method to persist an object of type Desktop to the database *
     **************************************************************/
    public save(): boolean {
        let queryValues = ["'"+this.id+"'", this.weight, "'"+this.modelNumber+"'",
                           "'"+this.brand+"'", this.price, "'"+this.processor+"'",
                           this.ram, this.cpus, this.hardDrive,
                           "'"+this.os+"'", "'"+this.dimensions+"'"];
        db.none("INSERT INTO desktops VALUES (" + queryValues.join(',') + ")")
            .then(function() {
                console.log("Desktop added to db");})
            .catch(function (err) {
                console.log("Error adding Desktop to the db: " + err);
                return false;
            });
        return true;
    }

    /*********************************************************************************************
    * Method to retrieve a persisted object in the database corresponding to the passed id value *
     *********************************************************************************************/
    public static async find(id: string): Promise<Electronic> {
        return db.one("SELECT * FROM desktops WHERE id='" + id + "';")
            .then(function(row) {
                return new Desktop(row.id, row.weight, row.modelNumber,
                                   row.brand, row.price, row.processor,
                                   row.ram, row.cpus, row.hardDrive,
                                   row.os, row.dimensions)
            }).catch(function (err) {
                console.log("No matching object found: " + err);
                return null;
            });
    }

    /*******************************************************
     * Method to return all desktops saved in the database
     *******************************************************/
    public static async findAll(): Promise<Electronic[]>{
        return db.many('SELECT * FROM desktops;')
            .then(function(rows) {
                let desktops: Electronic[] = new Array<Electronic>();
                for(let i=0; i < rows.length; i++) {
                    desktops.push(new Desktop(rows[i].id, rows[i].weight, rows[i].modelNumber,
                                              rows[i].brand, rows[i].price, rows[i].processor,
                                              rows[i].ram, rows[i].cpus, rows[i].hardDrive,
                                              rows[i].os, rows[i].dimensions));
                }
                return desktops;
            }).catch(function (err) {
                console.log("There was an error retrieving all desktops: " + err);
                return null;
            });
    }


    /*******************************************************
     * Method to update the current object in the database
     *******************************************************/
    public async modify(): Promise<boolean> {
        return db.none("UPDATE desktops SET weight=" + this.getWeight()
                       + ", modelNumber='" + this.getModelNumber()
                       + "', brand='" + this.getBrand()
                       + "', price=" + this.getPrice()
                       + ", processor='" + this.processor
                       + "', ram=" + this.ram
                       + ", cpus=" + this.cpus
                       + ", hardDrive=" + this.hardDrive
                       + ", os='" + this.os
                       + ", dimensions='" + this.getDimensions()
                       + "' WHERE id = '"+ this.getId() + "';")
            .then(function () {
                console.log("Tablet was modified.");
                return true;
            })
            .catch(function (err) {
                console.log("Could not update desktop: " + err);
                return false;
            });
    }

    /********************************************************
     * Method to remove the current object from the database
     ********************************************************/    
    public async delete(): Promise<boolean> {
        return db.none("DELETE FROM monitors WHERE id ='"+ this.id + "';")
            .then(function () {
                console.log("Desktop object [id: " + this.id + "] was deleted.");
                return true;
            }).catch(function (err) {
                console.log("No matching object found for delete: " + err);
                return false;
            });
    }
}