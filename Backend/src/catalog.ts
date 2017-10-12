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
		return Desktop.findAll().then((data) => {
            for(let i=0; i < data.length; i++) {
                this.electronics.push(data[i]);
            }
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

    /**************************************************************************************************
     * Function to delete an instance of a product's inventory via it's id
     * Deletes the first instance of the product found in the inventory array regardless of it's serial number
     **************************************************************************************************/
    public async deleteInventory(electronicID: string): Promise<boolean> {
        console.log(this.inventories);

        for (let iterator = 0; iterator < this.inventories.length; iterator++) {
            console.log(this.inventories.length);
            if (this.inventories[iterator].getinventoryType().getId() == electronicID) {
                console.log("Deletion was successful");
                let success = await this.inventories[iterator].delete();
                if (success){
                    console.log("Inventory " + this.inventories[iterator].getserialNumber() + " has been deleted");
                    this.inventories.splice(iterator, 1);
                    return Promise.resolve(true);
                }
                else{
                    console.log("Could not delete inventory for " + electronicID);
                    return Promise.resolve(false);
                }

            }
        }
        console.log("There was no inventory for item " + electronicID + " to delete");
        return Promise.resolve(false);
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
        var desired: Electronic[] = [];
        console.log("desired eletronic type:" + type);
        if(type == null){
            desired = this.electronics;
        }
        else{
            for (var i = 0; i < this.electronics.length; i++)
            {
                if(this.electronics[i].getElectronicType() == type)
                    desired.push(this.electronics[i]);
            }
        }
        //100 items per page
        var startProduct = (page-1) * 100;
        return desired.slice(startProduct,startProduct+100); //includes the first num, not the second. If not in bounds, should return empty array. To be dealt with in frontend
    }
    public getAllInventories( electronicId:string): Inventory[] {
        var desired: Inventory[] = [];
        for(let i=0;i<this.inventories.length;i++){
            if(electronicId == this.inventories[i].getinventoryType().getId()){
                desired.push(this.inventories[i]);
            }
        }
        return desired;
    }
    
    /********************************************************
	* Function to add a new product
	 ********************************************************/
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
    
    /********************************************************
	* Function to delete an existing product
	 ********************************************************/
    public async deleteProduct(productId:string): Promise<boolean> {
        for(var i = 0; i < this.electronics.length; i++)
        {
            if(productId == this.electronics[i].getId())
            {
                let success = await this.electronics[i].delete();
                if(success)
                {
                    this.electronics.splice(i,i);
                    return Promise.resolve(true);
                }
                else
                    return Promise.resolve(false);
            }
        }
        return Promise.resolve(false); //Product to be deleted could not be found.
    }

    public async modifyProduct(electronicID: string, data): Promise<boolean> {
        console.log(data);
        let modSuccess: boolean = true;
        for(let index = 0; index < this.electronics.length; index++) {
            if (this.electronics[index].getId() == electronicID) {
                let elec: Electronic = this.electronics[index];

                console.log(elec);
                //set general electronic fields
                elec.setWeight(data.weight);
                elec.setBrand(data.brand);
                elec.setPrice(data.price);
                elec.setModelNumber(data.modelnumber);

                if (elec.getElectronicType() == "Television") {
                    console.log("Item is a television");
                    var tv: TelevisionSet = <TelevisionSet> elec;
                    tv.setDimensions(data.dimensions);
                    modSuccess = await tv.modify();
                }
                else if (elec.getElectronicType() == "Monitor") {
                    console.log("Item is a monitor");
                    var monitor: Monitor = <Monitor> elec;
                    monitor.setSize(data.size);
                    modSuccess = await monitor.modify();
                }
                else if (elec.getElectronicType() == "Desktop") {
                    console.log("Item is a desktop");
                    var desktop: Desktop = <Desktop> elec;
                    desktop.setProcessor(data.processor);
                    desktop.setRam(parseInt(data.ram));
                    desktop.setCpu(parseInt(data.cpus));
                    desktop.setHardDrive(data.hardDrive);
                    desktop.setOs(data.os);
                    desktop.setDimensions(data.dimensions);
                    modSuccess = await desktop.modify();
                }
                else if (elec.getElectronicType() == "Laptop") {
                    console.log("Item is a laptop");
                    let laptop: Laptop = <Laptop> elec;
                    laptop.setProcessor(data.processor);
                    laptop.setRam(parseInt(data.ram));
                    laptop.setCpu(parseInt(data.cpus));
                    laptop.setHardDrive(parseInt(data.hardDrive));
                    laptop.setOs(data.os);
                    laptop.setDisplaySize(parseInt(data.displaySize));
                    laptop.setBattery(parseInt(data.battery));
                    laptop.setCamera(data.camera == 'true');
                    laptop.setTouchscreen(data.touchscreen == 'true');
                    modSuccess = await laptop.modify();
                }
                else if (elec.getElectronicType() == "Tablet") {
                    console.log("Item is a tablet");
                    var tablet: Tablet = <Tablet> elec;
                    tablet.setDimensions(data.dimensions);
                    tablet.setBattery(parseInt(data.battery));
                    tablet.setDisplaySize(parseInt(data.displaySize));
                    tablet.setCamera(data.camera == 'true');
                    modSuccess = await tablet.modify();
                }
                else {
                    modSuccess = false;
                }

                if (modSuccess)
                    console.log("Modification completed successfully");
                else console.log("Error: unable to modify object in the database");
                return Promise.resolve(modSuccess);
            }
        }
        console.log("Object doesn't exist in the database");
        return Promise.resolve(false);
    }
}

