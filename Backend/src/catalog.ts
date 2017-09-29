import { Electronic } from "./electronic"
import { Monitor } from "./monitor"
import { dbconnection } from "./dbconnection"
import {Desktop} from "./desktop";
import {Tablet} from "./tablet";
import {TelevisionSet} from "./TelevisionSet";

var db = new dbconnection().getDBConnector();
export class Catalog {

	electronics: Electronic[];

	constructor(){
		this.electronics = [];
		this.loadMonitors();
		this.loadDesktops();
		this.loadTablets();
		this.loadTelevisions();
	}

	private loadMonitors(): void {
		let monitor:Monitor
		let monitors = this.electronics;
        db.many('SELECT * FROM monitors')
            .then(function(rows){
            	for(let row of rows){
                	monitor = new Monitor(row.id, row.weight, row.modelNumber, row.brand, row.price, row.size);
                	monitors.push(monitor);
				}
            }).catch(function (err) {
            console.log("No monitors found"+ err);
		});
	}

	private loadDesktops(): void {
		let desktop:Desktop;
		let desktops = this.electronics;
        db.many('SELECT * FROM desktops')
            .then(function(rows){
                for(let row of rows){
                    desktop = new Desktop(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.dimensions)
					desktops.push(desktop);
					console.log(desktops);
                }
            }).catch(function (err) {
            console.log("No desktops found"+ err);
		});
	}

    private loadTablets(): void {
        let tablet:Tablet;
        let tablets = this.electronics;
        db.many('SELECT * FROM tablets')
            .then(function(rows){
                for(let row of rows){
                    tablet = new Tablet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.dimensions, row.battery, row.camera)
                    tablets.push(tablet);
                    console.log(tablet);
                }
            }).catch(function (err) {
            console.log("No tablets found"+ err);
        });
    }

    private loadTelevisions(): void {
        let tv:TelevisionSet;
        let tvs = this.electronics;
        db.many('SELECT * FROM tablets')
            .then(function(rows){
                for(let row of rows){
                    tv = new TelevisionSet(row.id,row.weight,row.modelNumber, row.brand, row.price, row.dimensions, row.type);
                    tvs.push(tv);
                    console.log(tv);
                }
            }).catch(function (err) {
            console.log("No tablets found"+ err);
        });
    }

	public getProduct(productId:string): Electronic {
		let elecIterator = this.electronics;
		for(var iter = 0; iter < this.electronics.length; iter++){
			if(productId == elecIterator[iter].getId())
				return elecIterator[iter];
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