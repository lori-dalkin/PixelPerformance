import {ComputerSystem} from "./computersystem";
import {dbconnection} from "./dbconnection";
import {Electronic} from "./electronic";

var db = new dbconnection().getDBConnector();

export class Tablet extends ComputerSystem{
	displaySize: number;
	dimensions: string;
	battery: number;
	camera: boolean;
	
	constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, processor: string, ram: number,
                cpus: number, hardDrive: number, os: string, displaySize: number, dimensions: string, battery: number, camera: boolean){
                	super(id, weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os);
                	this.displaySize = displaySize;
                	this.dimensions = dimensions;
                	this.battery = battery;
                	this.camera = camera;
                }

     /****************************************************************
    * Method to persist an object of type Tablet to the database
     ****************************************************************/
    save():boolean{
        db.none('INSERT INTO tablets VALUES ('+this.id +','+this.weight+','+this.modelNumber+','+this.brand+','+this.price+','+this.processor+',' + this.ram + ','+this.cpus+','+this.hardDrive+','+this.os+','+this.displaySize+','+this.dimensions+','+this.battery+','+this.camera+')')
            .then(function(){
                console.log("Tablet added to db");})
            .catch(function (err) {
                console.log("Error adding Tablet to the db");
                return false;
            });
        return true;
    }

     /*********************************************************************************************
    * Method to retrieve a persisted object in the database corresponding to the passed id value
     ********************************************************************************************/
    public static find(id:string): Electronic{
        let tablet:Tablet;
        db.none('SELECT * FROM tablets WHERE id =' + id +';')
            .then(function(row){
                tablet = new Tablet(row.id,row.weight,row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.dimensions, row.battery, row.camera)
            }).catch(function (err) {
            console.log("No matching object found");
        });
        return tablet;
    }
}