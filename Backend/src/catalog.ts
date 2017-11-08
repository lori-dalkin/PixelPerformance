import * as uuid from "uuid";
import { Electronic } from "./Models/electronic"
import { Monitor } from "./Models/monitor"
import { dbconnection } from "./Models/dbconnection"
import {Desktop} from "./Models/desktop";
import {Tablet} from "./Models/tablet";
import {Laptop} from "./Models/laptop";
import {Inventory } from "./Models/inventory";
import {ElectronicFactory} from "./ElectronicFactory";
import {afterMethod, beforeInstance, beforeMethod} from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');

var db = new dbconnection().getDBConnector();
export class Catalog {
    private static _instance:Catalog = null;
    inventories: Inventory[];
	electronics: Electronic[];
	electronicFactory: ElectronicFactory;

	private constructor(){
		this.electronics = [];
        this.inventories = [];
        this.electronicFactory = new ElectronicFactory();
        //Load all entities from the database
        let dataPromises = new Array<Promise<void>>();
		dataPromises.push(this.loadMonitors());
		dataPromises.push(this.loadDesktops());
		dataPromises.push(this.loadTablets());
        dataPromises.push(this.loadLaptops());
        
        Promise.all(dataPromises).then( ()=>{
            Inventory.setElectronics(this.electronics);
            this.loadInventory();
        });
        
    }
    /*********************************************************
	* Method to return Singleton Catalog instance            *
	 *********************************************************/
    public static getInstance() {
        if(!this._instance) {
            this._instance = new this();
        }
        return this._instance;
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
        return Tablet.findAll().then((data) => {
            for(let i=0; i < data.length; i++) {
                this.electronics.push(data[i]);
            }
        });
    }

  
    private async loadLaptops(): Promise<void> {
        return Laptop.findAll().then((data) => {
            for(let i=0; i < data.length; i++) {
                this.electronics.push(data[i]);
            }
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
	public getProductPage(page:number, type:string, numOfItems:number = 25) {
        var desired: Electronic[] = [];
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
        let totalProducts= desired.length;
        if(page != null)
        {
            var startProduct = (page-1) * numOfItems;
            desired = desired.slice(startProduct,startProduct+numOfItems); //includes the first num, not the second. If not in bounds, should return empty array. To be dealt with in frontend    
        }
        return new responseData(desired,totalProducts);
    }
    
    @beforeMethod(function(meta){
		assert(!validator.isEmpty(meta.args[0]), "Electronic id can't be empty");
    })
    @afterMethod(function(meta)
    {
        assert(meta.result.length > 0, "No inventory found.");
    })
    public getAllInventories( electronicId:string): Inventory[] {
        var desired: Inventory[] = [];
        for(let i=0;i<this.inventories.length;i++){
            if(this.inventories[i].getinventoryType() == null){
                continue;
            }
            if(electronicId == this.inventories[i].getinventoryType().getId()){
                desired.push(this.inventories[i]);
            }
        }
        return desired;
    }
    
    /********************************************************
	* Function to add a new product
	 ********************************************************/
    @beforeMethod(function(meta){
		assert(meta.args[0] != null,  "Product data cannot be null");
	})
	@afterMethod(function(meta) {
        //compare most recent object with object sent to function
        assert(meta.args[0].modelNumber != Catalog.getInstance().electronics[Catalog.getInstance().electronics.length - 1], "Product wasn't found." )
		assert(meta.result == true, "Product wasn't added.");
	})
	public addProduct(data): boolean {
        let electronic: Electronic = this.electronicFactory.create(data);
        electronic.save();
        this.electronics.push(electronic);
		return true;
    }

    @beforeMethod(function(meta){
        let electronic: Electronic;
        let found: boolean;
        found = false;
        for (var i = 0; i < Catalog.getInstance().electronics.length; i++) {
            if (Catalog.getInstance().electronics[i].getId() == meta.args[0]) {
                found = true;
            }
        }
        assert(meta.args[0] != null, "electronic ID cannot be null");
        assert(found, "Product not in Catalog");
	})
	@afterMethod(function(meta) {
        let electronic: Electronic;
        for (var i = 0; i < Catalog.getInstance().electronics.length; i++) {
            if (Catalog.getInstance().electronics[i].getId() == meta.args[0]) {
                electronic = Catalog.getInstance().electronics[i];
                break;
            }
        }
        assert(Catalog.getInstance().inventories.length != 0, "Inventory empty");
         //compare latest inventory type with electronic sent as argument
        assert(Catalog.getInstance().inventories[Catalog.getInstance().inventories.length - 1].getinventoryType().getId() == electronic.getId(), "Inventory not added inventory array");
	})
    public addInventory(electronidId: string): Promise<boolean> {
        console.log("adding to inventory: " + electronidId);
        let electronic: Electronic;
        for (var i = 0; i < this.electronics.length; i++) {
            if (this.electronics[i].getId() == electronidId) {
                electronic = this.electronics[i];
                console.log("inventory id belongs to a " + electronic.getElectronicType());
                break;
            }
        }
        if(electronic==null){
            return Promise.resolve(false);
        }
        let inventoryObj: Inventory = new Inventory(uuid.v1(), electronic);
        this.inventories.push(inventoryObj);
        return inventoryObj.save();
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

                elec = elec.getModifyStrategy().modifyElectronic(elec, data);
                modSuccess = await elec.modify();

                if (modSuccess)
                    console.log("Modification completed successfully");
                else console.log("Error: unable to modify object in the database");
                return Promise.resolve(modSuccess);
            }
        }
        console.log("Object doesn't exist in the database");
        return Promise.resolve(false);

    }

    public returnInventory(returned: Inventory): void {
        let allInventories = this.inventories;
        allInventories.push(returned);
    }
    public checkoutInventory(inventoryId:string) : Inventory{
        for(let i=0;i<this.inventories.length;i++){
            if( inventoryId==this.inventories[i].getserialNumber()){
                return this.inventories.splice(i,1)[0];
            }
        }
        return null;
    }
    public getInventory(inventoryId:string){
        for( let inventory of this.inventories){
            if(inventory.getserialNumber() == inventoryId){
                return inventory;
            }
        }
        return null;
    }
}



class responseData{
    public products:Electronic[];
    public totalProducts: number;
    constructor(products:Electronic[], totalProducts: number){
        console.log(this.products);
        console.log(this.totalProducts);
        this.products=products;
        this.totalProducts=totalProducts;
    }
}