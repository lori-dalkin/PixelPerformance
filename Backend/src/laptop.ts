import { ComputerSystem } from "./computersystem";
import { dbconnection } from "./dbconnection";
import { Electronic } from "./electronic";

var db = new dbconnection().getDBConnector();

export class Laptop extends ComputerSystem {
	displaySize: number;
	battery: number;
	camera: boolean;
	touchscreen: boolean;

	constructor(id: string, weight: number, modelNumber: string, brand: string,
				price: number, processor: string, ram: number, cpus: number,
				hardDrive: number, os: string, displaySize: number,
				battery: number, camera: boolean, touchscreen: boolean) {
		super(id, weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os);
		this.displaySize = displaySize;
		this.battery = battery;
		this.camera = camera;
		this.touchscreen = touchscreen;
	}

	/**************************************************************
	 * Method to persist an object of type Laptop to the database *
	 **************************************************************/
	save(): boolean {
		let queryParameters = [this.id, this.weight, this.modelNumber,
							   this.brand, this.price, this.processor,
							   this.ram, this.cpus, this.hardDrive,
							   this.os, this.displaySize, this.battery,
							   this.camera, this.touchscreen];
		let queryText = 'INSERT INTO laptops VALUES (' + queryParameters.join(',') + ')';

		db.none(queryText)
			.then(function() {
				console.log("Laptop added to db");
			})
			.catch(function(err) {
				console.log("Error adding Laptop to the db");
				return false;
			});
		return true;
	}

	/***************************************************************************************
	 * Method to retrieve a persisted object from the database corresponding to a given id *
	 ***************************************************************************************/
	public static find(id: string): Electronic {
		let laptop: Laptop;
		db.none('SELECT * FROM laptops WHERE id =' + id + ';')
			.then(function(row){
				laptop = new Laptop(row.id,row.weight,row.modelNumber,row.brand,row.price,row.processor,row.ram,row.cpus,row.hardDrive,row.os,row.displaySize,row.battery,row.camera,row.touchscreen);
			})
			.catch(function(err) {
				console.log("No matching object found");
			})
		return laptop;
	}
}
