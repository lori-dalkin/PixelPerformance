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
                	super(id, weight, modelNumber, brand, price, "Tablet", processor, ram, cpus, hardDrive, os);
                	this.displaySize = displaySize;
                	this.dimensions = dimensions;
                	this.battery = battery;
                	this.camera = camera;
                }

    /****************************************************************
     * Accessors and Mutators
     ****************************************************************/
    public getDisplaySize(): number { return this.displaySize;  }
    public getDimensions(): string { return this.dimensions; }
    public getBattery(): number { return this.battery; }
    public getCamera(): boolean { return this.camera; }

    public setDisplaySize( dispSize: number) { this.displaySize = dispSize; }
    public setDimensions(dims: string) { this.dimensions = dims; }
    public setBattery(bat: number){this.battery = bat;}
    public setCamera(cam: boolean) { this.camera = cam; }

     /****************************************************************
    * Method to persist an object of type Tablet to the database
     ****************************************************************/
    public async save(): boolean {
        db.none("'INSERT INTO tablets VALUES ('"+ this.getId() +"','"+ this.getWeight() +"','"+this.getModelNumber()+"','"+this.getBrand()+"','"+this.getPrice()+"','"+this.processor+"','" + this.ram + "','"+this.cpus+"','"+this.hardDrive+"','"+this.os+"','"+this.getDisplaySize()+"','"+this.getDimensions()+"','"+this.getBattery()+"','"+this.getCamera()+"')'")
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
        db.none("'SELECT * FROM tablets WHERE id ='" + id +"';'")
            .then(function(row){
                tablet = new Tablet(row.id,row.weight,row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.dimensions, row.battery, row.camera)
            }).catch(function (err) {
            console.log("No matching object found");
            return null;
        });
        return tablet;
    }

    public async modify(): Promise<boolean> {
        db.none("'UPDATE tablets SET id='" + this.getId() + "',weight='" + this.getWeight() + "',modelNumber='" +
            this.getModelNumber() + "',brand='" + this.getBrand() + "',price='" + this.getPrice() +
            "',processor='" + this.processor + "',ram='" + this.ram + "',cpus='" + this.cpus +
            "',hardDrive='" + this.hardDrive + "',os='" + this.os + "',displaySize='" + this.getDisplaySize() +
            "',dimensions='" + this.getDimensions() + "',battery='" + this.getBattery() + "',camera='" + this.getBattery()).
            then(function () {
                return true;
        }).catch(function (err) {
            console.log("Could not update tablet: " + err);
            return false;
        });
        return true;
    }

    public async delete(): Promise<boolean> {
        db.none("DELETE FROM tablets WHERE id ='"+ this.getId() + "';")
            .then(function () {
                return true;
            }).catch(function (err) {
            console.log("No matching object found for delete: "+ err);
            return false;
        });
        return true;
    }
}