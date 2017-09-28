import {ComputerSystem} from "./computersystem";
import {dbconnection} from "./dbconnection";
import {Electronic} from "./electronic";

var db = new dbconnection().getDBConnector();

export class Desktop extends ComputerSystem{
    dimensions: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, processor: string, ram: number,
                cpus: number, hardDrive: number, os: string, dimensions: string) {
        super(id, weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os);
        this.dimensions = dimensions;
    }

    /****************************************************************
    * Method to persist an object of type Desktop to the database
     ****************************************************************/
    save():boolean{
        db.none('INSERT INTO desktops VALUES ('+this.id +','+this.weight+','+this.modelNumber+','+this.brand+','+this.price+','+this.processor+',' + this.ram + ','+this.cpus+','+this.hardDrive+','+this.os+','+this.dimensions+')')
            .then(function(){
                console.log("Desktop added to db");})
            .catch(function (err) {
                console.log("Error adding Desktop to the db");
                return false;
            });
        return true;
    }

    /*********************************************************************************************
    * Method to retrieve a persisted object in the database corresponding to the passed id value
     ********************************************************************************************/
    public static find(id:string): Electronic{
        let desktop:Desktop;
        db.none('SELECT * FROM desktops WHERE id =' + id +';')
            .then(function(row){
                desktop = new Desktop(row.id,row.weight,row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.dimensions)
            }).catch(function (err) {
            console.log("No matching object found");
        });
        return desktop;
    }
}