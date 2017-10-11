import * as uuid from "uuid";
import { Electronic } from "./electronic"
import { Monitor } from "./monitor"
import { dbconnection } from "./dbconnection"
import {Desktop} from "./desktop";
import {Tablet} from "./tablet";
import {TelevisionSet} from "./TelevisionSet";
import {Laptop} from "./laptop";
import {Inventory } from "./inventory";

var db = new dbconnection().getDBConnector();
export class Catalog {

    inventories: Inventory[];
	electronics: Electronic[];

	constructor(){
		this.electronics = [];
        this.inventories = [];
        //Load all entities from the database
        let dataPromises = new Array<Promise<void>>();
		dataPromises.push(this.loadMonitors());
		dataPromises.push(this.loadDesktops());
		dataPromises.push(this.loadTablets());
		dataPromises.push(this.loadTelevisions());
        dataPromises.push(this.loadLaptops());
        
        Promise.all(dataPromises).then( ()=>{
            Inventory.setElectronics(this.electronics);
            this.loadInventory();
        });
        
	}

	/*********************************************************
	* Load functions for all persisted data in the database
	 *********************************************************/
	private async loadMonitors(): Promise<void> {
        return Monitor.findAll().then((data)=>{
            for(let i=0;i<data.length;i++){
                this.electronics.push(data[i]);
            }
        });
	}

	private async loadDesktops(): Promise<void> {
		let desktop:Desktop;
		let desktops = this.electronics;
        return db.many('SELECT * FROM desktops')
            .then(function(rows){
                for(let row of rows){
                    desktop = new Desktop(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.dimensions)
					desktops.push(desktop);
                }
            }).catch(function (err) {
            console.log("No desktops found"+ err);
		});
	}

    private async loadTablets(): Promise<void>{
        let tablet:Tablet;
        let tablets = this.electronics;
        return db.many('SELECT * FROM tablets')
            .then(function(rows){
                for(let row of rows){
                    tablet = new Tablet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.dimensions, row.battery, row.camera)
                    tablets.push(tablet);
                }
            }).catch(function (err) {
            console.log("No tablets found"+ err);
        });
    }

    private async loadTelevisions(): Promise<void> {
        let tv:TelevisionSet;
        let tvs = this.electronics;
        return db.many('SELECT * FROM tablets')
            .then(function(rows){
                for(let row of rows){
                    tv = new TelevisionSet(row.id,row.weight,row.modelNumber, row.brand, row.price, row.dimensions, row.type);
                    tvs.push(tv);
                }
            }).catch(function (err) {
            console.log("No tablets found"+ err);
        });
    }

    private async loadLaptops(): Promise<void> {
        let lp:Laptop;
        let lps = this.electronics;
        return db.many('SELECT * FROM laptops')
            .then(function(rows){
                for(let row of rows){
                    lp = new Laptop(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.battery, row.camera, row.touchscreen);
                    lps.push(lp);
                }
            }).catch(function (err) {
            console.log("No laptops found"+ err);
        });
    }

    private async loadInventory(): Promise<void> {
       return Inventory.findAll().then((data)=>{
            for(let i=0;i<data.length;i++){
                this.inventories.push(data[i]);
            }
        });
    }

    /****************************************************
    * Function to retrieve a single product via it's id
     ****************************************************/
	public getProduct(productId:string): Electronic {
		let elecIterator = this.electronics;
		for(var iter = 0; iter < this.electronics.length; iter++){
			if(productId == elecIterator[iter].getId())
				return elecIterator[iter];
		}
		return null;
	}

	/********************************************************
	* Function to retrieve a list of products based on type
	 ********************************************************/
	public getProductPage(page:number, type:string): Electronic[] {
		var desired: Electronic[];
		console.log(this.electronics);
        if(type == null){
            desired = this.electronics;
        }
        else{
            for (var i = 0; i < this.electronics.length; i++)
            {
                if(Electronic[i].electronicType == type)
                    desired.push(this.electronics[i]);
            }
        }
        //100 items per page
        var startProduct = (page-1) * 100;
        return desired.slice(startProduct,startProduct+100); //includes the first num, not the second. If not in bounds, should return empty array. To be dealt with in frontend
    }
    
	public addProduct(data): boolean {
        let electronic: Electronic;
        switch(data.electronicType)
        {
            case "TelevisionSet":
                electronic = new TelevisionSet(uuid.v1(), parseInt(data.weight), data.modelNumber, data.brand, parseFloat(data.price), data.dimensions, data.type);
                break;
            case "Monitor":
                electronic = new Monitor(uuid.v1(), parseInt(data.weight), data.modelNumber, data.brand,parseFloat(data.price), parseInt(data.size));
                break;
            case "Desktop":
                electronic = new Desktop(uuid.v1(), parseInt(data.weight), data.modelNumber, data.brand, parseFloat(data.price), data.processor, parseInt(data.ram), parseInt(data.cpus), parseInt(data.hardDrive), data.os, data.dimensions);
				console.log(electronic);
				break;
            case "Laptop":
                electronic = new Laptop(uuid.v1(), parseInt(data.weight), data.modelNumber, data.brand, parseFloat(data.price), data.processor, parseInt(data.ram),  parseInt(data.cpus),
				parseInt(data.hardDrive), data.os, parseFloat(data.displaySize), parseInt(data.battery), data.camera == 'true', data.touchscreen =='true');
                break;
            case "Tablet":
                electronic = new Tablet(uuid.v1(), parseInt(data.weight), data.modelNumber, data.brand,parseFloat(data.price), data.processor, parseInt(data.ram),
				parseInt(data.cpus), parseInt(data.hardDrive), data.os, parseFloat(data.displaySize), data.dimensions, parseInt(data.battery), data.camera=='true');
                break;
            default:
                return false;
        }
        electronic.save();
        this.electronics.push(electronic);
		return true;
	}

	public modifyProduct(data): boolean {
	    let elec = this.getProduct(data.id);

	    //set general electronic fields
	    elec.setWeight(parseInt(data.weight));
	    elec.setBrand(data.brand);
	    elec.setPrice(parseFloat(data.price));
	    elec.setModelNumber(data.modelNumber);

	    switch(elec.getElectronicType()){
            case "TelevisionSet":
                var tv: TelevisionSet = <TelevisionSet> elec;
                tv.setDimensions(data.dimensions);
                tv.modify();
                break;
            case "Monitor":
                var monitor: Monitor = <Monitor> elec;
                monitor.setSize(data.parseInt(data.size));
                monitor.modify();
                break;
            case "Desktop":
                var desktop : Desktop = <Desktop> elec;
                desktop.setProcessor(data.processor);
                desktop.setRam(parseInt(data.ram));
                desktop.setCpus(parseInt(data.cpus));
                desktop.setHardDrive(data.hardDrive);
                desktop.setOs(data.os);
                desktop.setDimensions(data.dimensions);
                desktop.modify();
                break;
            case "Laptop":
                let laptop: Laptop = <Laptop> elec;
                laptop.setProcessor(data.processor);
                laptop.setRam(parseInt(data.ram));
                laptop.setCpus(parseInt(data.cpus));
                laptop.setHardDrive(parseInt(data.hardDrive));
                laptop.setOs(data.os);
                laptop.setDisplaySize(parseInt(data.displaySize));
                laptop.setBattery(parseInt(data.battery));
                laptop.setCamera(data.camera == 'true');
                laptop.setTouchScreen(data.touchscreen == 'true');
                laptop.modify();
                break;
            case "Tablet":
                var tablet: Tablet = <Tablet> elec;
                tablet.setDimensions(data.dimensions);
                tablet.setBattery(parseInt(data.battery));
                tablet.setDisplaySize(parseInt(data.displaySize));
                tablet.setCamera(data.camera == 'true');
                tablet.modify();
                break;
            default:
                console.log("returning false");
                return false;
        }
        return true;
    }
}
