import * as uuid from "uuid";
import { Electronic } from "./Models/electronic"
import { Monitor } from "./Models/monitor"
import { dbconnection } from "./Models/dbconnection"
import { Desktop } from "./Models/desktop";
import { Tablet } from "./Models/tablet";
import { Laptop } from "./Models/laptop";
import { Inventory  } from "./Models/inventory";
import { ElectronicFactory } from "./ElectronicFactory";

// Dependencies for contracts
import { afterMethod, beforeInstance, beforeMethod } from 'kaop-ts';
import validator = require('validator');
import assert = require('assert');
import {UnitOfWork} from "./unitofwork";

var db = new dbconnection().getDBConnector();
export class Catalog {
    private static _instance:Catalog = null;
    inventories: Inventory[];
	electronics: Electronic[];
	electronicFactory: ElectronicFactory;
	unitOfWork: UnitOfWork;

	private constructor(){
		this.electronics = [];
        this.inventories = [];
        this.electronicFactory = new ElectronicFactory();
        this.unitOfWork = UnitOfWork.getInstance();

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
     * Function to delete an instance of a product's inventory via its id
     * Deletes the first instance of the product found in the inventory array regardless of it's serial number
     **************************************************************************************************/
    @beforeMethod(function(meta) {
        assert(validator.isUUID(meta.args[0]), "electronicID needs to be a uuid");
        assert(Catalog.getInstance().inventoryExists(meta.args[0]), "electronicID must refer to an Electronic for which inventory exists");
    })
    @afterMethod(function(meta) {
        let canDelete = Catalog.getInstance().numMatchingInventories(meta.args[0]);
        meta.result.then( () => {
            let leftToDelete: number = Catalog.getInstance().numMatchingInventories(meta.args[0]);
            assert(leftToDelete == canDelete - 1, "electronicID must be associated with deletable Inventory");
        });
    })
    public async deleteInventory(electronicID: string): Promise<boolean> {
        for (let iterator = 0; iterator < this.inventories.length; iterator++) {
            if (this.inventories[iterator].getinventoryType().getId() == electronicID) {
                console.log("Inventory " + this.inventories[iterator].getserialNumber() + " has been deleted");
                let invtodelete = this.inventories[iterator];
                this.inventories.splice(iterator, 1);
                this.unitOfWork.registerDeleted(invtodelete);
                return Promise.resolve(true);
            }
        }
        console.log("There was no inventory for item " + electronicID + " to delete");
        return Promise.resolve(false);
    }

    /****************************************************
    * Function to retrieve a single product via its id
     ****************************************************/
    @beforeMethod(function(meta){
        assert(validator.isUUID(meta.args[0]), "productId needs to be a uuid");
        assert(Catalog.getInstance().productExists(meta.args[0]), "productId must refer to an existing Electronic");
    })
    @afterMethod(function(meta) { 
        assert(meta.result != null, "Product within electronics not found."); 
    })
    public getProduct(productId: string): Electronic {
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
	@beforeMethod(function(meta) {
        let catalog = Catalog.getInstance();
        console.log(meta.args[0]);
        assert(meta.args[0] > 0 || meta.args[0] == null || isNaN(meta.args[0]), "page must be greater than 0");
        assert(meta.args[2] > 0 || meta.args[2] == null || isNaN(meta.args[2]), "numOfItems must be greater than 0");
        assert(meta.args[2] % 1 === 0 || meta.args[2] == null ||isNaN( meta.args[2]), "numOfItems must be a whole number");
        assert(catalog.validElectronicType(meta.args[1]) || meta.args[1] == null || isNaN(meta.args[1]), "type must be null or a valid subtype of Electronic");
    })
    @afterMethod(function(meta) {
        assert(meta.result != null, "Unable to create valid responseData for getProductPage call");
    })
    public getProductPage(page:number, type:string, numOfItems:number, 
                            priceLow:number, priceHigh:number, brand:string,
                            maxSize:number, maxWeight:number) {
        //set defaults in case of undefined
        priceLow = isNaN(priceLow) ? 0 : priceLow;
        priceHigh = isNaN(priceHigh) ? 1000000 : priceHigh; //default arbitrarly high
        maxWeight = isNaN(maxWeight) ? 100000 : maxWeight; //default arbitrarly high
        maxSize = isNaN(maxSize) ? 100000 : maxSize; //default arbitrarly high
        numOfItems = isNaN(numOfItems) ? 25 : numOfItems;
        page = isNaN(page) ? null : page;
        /*For testing. Remove after UI is integrated.
        console.log("**** Product Filtering ****")
        console.log("Price range:" +priceLow + " to " + priceHigh);
        console.log("Brand:" +brand);
        console.log("Max weight:" + maxWeight);
        console.log("Type:" + type);
        console.log("Size: " + maxSize);
        console.log("#items: " +numOfItems);
        console.log("Page:" + page);
        console.log("***************************")
        */
        var desiredType: Electronic[] = [];
        var desiredProducts: Electronic[] = [];
        if(type == null || type == undefined){
            desiredType = this.electronics;
        }
        else{
            for (var i = 0; i < this.electronics.length; i++) {
                if(this.electronics[i].getElectronicType() == type){
                    if(type == "Desktop")
                        desiredType.push(this.electronics[i]);
                    else {
                        let eSize;
                        switch(type){
                            case "Monitor":
                                eSize = (this.electronics[i] as Monitor).getSize();
                                break;
                            case "Laptop":
                                eSize = (this.electronics[i] as Laptop).getDisplaySize();
                                break;
                            case "Tablet":
                                eSize = (this.electronics[i] as Tablet).getDisplaySize();
                                break;
                            default:
                                eSize = 1000000;
                        }
                        if(eSize < maxSize)
                            desiredType.push(this.electronics[i]);
                    }
                }     
            }
        }
        //Now that you array filled with desired type, filter down from other params
        for(let e of desiredType)
        {
            if(e.getPrice() > priceLow && e.getPrice() < priceHigh && e.getWeight() < maxWeight)
            {
                if(brand == undefined)
                    desiredProducts.push(e);
                else if(e.getBrand() == brand){
                    desiredProducts.push(e);
                }
            }  
        }

        let totalProducts= desiredProducts.length;
        if(page != null)
        {
            var startProduct = (page-1) * numOfItems;
            desiredProducts = desiredProducts.slice(startProduct,startProduct+numOfItems); //includes the first num, not the second. If not in bounds, should return empty array. To be dealt with in frontend    
        }
        return new responseData(desiredProducts,totalProducts);
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
            if(electronicId == this.inventories[i].getinventoryType().getId() && !this.inventories[i].isLocked()){
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
        //console.log(typeof meta.args[0].getWeight() == "number");
        assert(validator.isUUID(meta.args[0].getId()), "ProductId needs to be a uuid");
        Catalog.getInstance().validatePositiveNumber(meta.args[0].getWeight(), "Weight");
        assert(typeof meta.args[0].getModelNumber() == "string", "Model Number needs to be a string");
        assert(typeof meta.args[0].getBrand() == "string", "Brand needs to be a string");
        Catalog.getInstance().validatePositiveNumber(meta.args[0].getPrice(), "Price");
        assert(!Catalog.getInstance().modelNumberExists(meta.args[0].getModelNumber()),"Model Number already exists");
        let eType:string = meta.args[0].getElectronicType();
        assert(typeof eType == "string", "Electronic Type needs to be a string");
        switch(eType)
        {
            case "Monitor":
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getSize(), "Size");
                break;
            case "Desktop":
                assert(typeof meta.args[0].getProcessor() == "string", "Processor needs to be a string");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getRam(), "Ram");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getCpus(), "Number of CPU's");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getHardDrive(), "Hard Drive");
                assert(typeof meta.args[0].getOs() == "string", "Operating System needs to be a string");
                assert(typeof meta.args[0].getProcessor() == "string", "Processor needs to be a string");
                break;
            case "Laptop":
                assert(typeof meta.args[0].getProcessor() == "string", "Processor needs to be a string");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getRam(), "Ram");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getCpus(), "Number of CPU's");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getHardDrive(), "Hard Drive");
                assert(typeof meta.args[0].getOs() == "string", "Operating System needs to be a string");
                assert(typeof meta.args[0].getProcessor() == "string", "Processor needs to be a string");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getDisplaySize(), "Display Size");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getBattery(), "Battery");
                assert(typeof meta.args[0].getCamera() == "boolean", "Camera needs to be a boolean");
                assert(typeof meta.args[0].getTouchscreen() == "boolean", "Touchscreen needs to be a boolean");
                break;
            case "Tablet":
                assert(typeof meta.args[0].getProcessor() == "string", "Processor needs to be a string");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getRam(), "Ram");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getCpus(), "Number of CPU's");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getHardDrive(), "Hard Drive");
                assert(typeof meta.args[0].getOs() == "string", "Operating System needs to be a string");
                assert(typeof meta.args[0].getProcessor() == "string", "Processor needs to be a string");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getDisplaySize(), "Display Size");
                assert(typeof meta.args[0].getDimensions() == "string", "Dimensions needs to be a string");
                Catalog.getInstance().validatePositiveNumber(meta.args[0].getBattery(), "Battery");
                assert(typeof meta.args[0].getCamera() == "boolean", "Camera needs to be a boolean");
                break;
            default:
                assert(false,"Electronic Type not valid");
                break; 
        }
	})
	@afterMethod(function(meta) {
        //compare most recent object with object sent to function
        assert(meta.args[0].modelNumber != Catalog.getInstance().electronics[Catalog.getInstance().electronics.length - 1], "Product wasn't found." )
		assert(meta.result == true, "Product wasn't added.");
	})
	public addProduct(data): boolean {
        let electronic: Electronic = this.electronicFactory.create(data);
        //electronic.save();
        this.electronics.push(electronic);
        this.unitOfWork.registerNew(electronic);
		return true;
    }

    /*******************************************************
    * Function to add a new physical product to the system
     *******************************************************/
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
        this.unitOfWork.registerNew(inventoryObj);
        Promise.resolve(true);
    }
       

    /********************************************************
	* Function to delete an existing product
	 ********************************************************/
    public async deleteProduct(productId:string): Promise<boolean> {
        let elecs: Electronic[] = this.electronics;
        for(var i = 0; i < elecs.length; i++)
        {
            if(productId == elecs[i].getId())
            {
                let electodelete = elecs[i];
                elecs.splice(i,1);
                this.unitOfWork.registerDeleted(electodelete);
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false); //Product to be deleted could not be found.
    }

    /*******************************************************************
    * Function to update data fields in existing product specifications
     *******************************************************************/
    public async modifyProduct(electronicID: string, data): Promise<boolean> {
        console.log(data);
        for(let index = 0; index < this.electronics.length; index++) {
            if (this.electronics[index].getId() == electronicID) {
                let elec: Electronic = this.electronics[index];

                elec = elec.getModifyStrategy().modifyElectronic(elec, data);
                this.unitOfWork.registerDirty(elec);

                console.log("Modification completed successfully");
                return Promise.resolve(true);
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
    public getInventoryByElectronic(electronicId:string){
        for(let inventory of this.inventories) {
            if(inventory.getinventoryType().getId() == electronicId  && !inventory.isLocked()) {
                return inventory;
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

    // Methods for contract programming
    private inventoryExists(electronicID: string): Boolean {
        for(let inventory of this.inventories) {
            console.log(inventory);
            if(inventory.getinventoryType().getId() == electronicID) {
                return true;
            }
        }
        return false;
    }

    private numMatchingInventories(electronicId: string): number {
        let numMatching = 0;
        for(let inventory of this.inventories) {
            if(inventory.getinventoryType().getId() == electronicId) {
                numMatching++;
            }
        }
        return numMatching;
    }
    private modelNumberExists(modelNum: string): Boolean {
        for(let product of this.electronics) {
            if(product.getModelNumber() === modelNum) {
                return true;
            }
        }
        return false;
    }
    private productExists(productId: string): Boolean {
        for(let product of this.electronics) {
            if(product.getId() == productId) {
                return true;
            }
        }
        return false;
    }

    private validElectronicType(type: string):Boolean {
        if(type == null || type in Electronic.ElectronicTypes)
            return true;
        else
            return false;
    }

    private maxPageNum(type:string, numItems:number = 25):Number {
        var numProducts: number = 0;
        if(type == null) {
            numProducts = this.electronics.length;
        }
        else {
            for (var i = 0; i < this.electronics.length; i++) {
                if(this.electronics[i].getElectronicType() == type)
                    numProducts++;
            }
        }
        let numPages = Math.ceil(numProducts / numItems);
        return numPages;
    }
    private validatePositiveNumber(par:any, message:string) {
        assert(typeof par == "number", message + " needs to be a number");
        assert(par > 0, message + " needs to be positive");
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