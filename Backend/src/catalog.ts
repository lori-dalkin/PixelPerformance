import { Electronic } from "./electronic"
import { Monitor } from "./monitor"
import { dbconnection } from "./dbconnection"
import {Desktop} from "./desktop";

var db = new dbconnection().getDBConnector();
export class Catalog {

	electronics: Electronic[];

	constructor(){
		this.electronics = [];
		this.loadMonitors();
		this.loadDesktops();
	}

	private loadMonitors(): void {
		let monitor:Monitor
        db.many('SELECT * FROM monitors')
            .then(function(rows){
            	for(let row of rows){
                	monitor = new Monitor(row.id,row.weight,row.modelNumber, row.brand, row.price, row.size);
                	this.electronics.push(monitor);
				}
            }).catch(function (err) {
            console.log("No monitors found");
        });
	}

	private loadDesktops(): void {
        let desktop:Desktop
        db.many('SELECT * FROM desktops')
            .then(function(rows){
                for(let row of rows){
                    desktop = new Desktop(row.id,row.weight,row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.dimensions)
                    this.electronics.push(desktop);
                }
            }).catch(function (err) {
            console.log("No desktops found");
        });
	}

	public getProduct(productId:string): Electronic {
		for(var iter = 0; iter < this.electronics.length; iter++){
			if(productId == this.electronics[iter].getId())
				return this.electronics[iter];
		}
		return null;
	}

	public getProductPage(page:number, type:string): Electronic[] {
		
		let monitor = new Monitor('1', 1, "modelNumber", "brand", 1, 1);
		return new Array(monitor, monitor, monitor);
	}
	public addProduct(type:string, ): boolean {
		return true;
	}
}