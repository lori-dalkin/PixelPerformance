import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";
import {Inventory} from "./Models/inventory";

export class PurchaseManagement {

	private static _instance: PurchaseManagement;
	catalog: Catalog;
	activeCarts: Cart[];
	purchaseRecords: Cart[];

	//Private instance variable for helping to load previously purchased inventories into carts
	private purchasedInventories: { [key: string]: Inventory[]};

	private constructor() {
		this.catalog = Catalog.getInstance();
		this.activeCarts = [];
		this.purchaseRecords = [];
		this.purchasedInventories = {};
        let dataPromises = [];

        dataPromises.push(this.findAllRecords());

        Promise.all(dataPromises).then( ()=>{
        	console.log(this.purchaseRecords);
		});
	}

	public static getInstance() {
		if(!this._instance)
			this._instance = new this();
		return this._instance;
	}

	private async loadPurchasedCarts(): Promise<void> {
		return Cart.findAllPurchased().then((data)=>{
            let savedCarts: Cart[] = this.purchaseRecords;
            for(let i=0;i<data.length;i++){
                savedCarts.push(data[i]);
            }
		});
	}

	private async loadPurchasedInventories(): Promise<void> {
		return Inventory.findAllPurchased().then((data)=>{
            let savedInventories: { [key: string]: Inventory[]} = this.purchasedInventories;
            for(let cartId in data){
                savedInventories[cartId] = data[cartId];
            }
        });
	}

	/********************************************************
	* Function to load all carts with previous purchases
	 *********************************************************/
	private async findAllRecords(): Promise<void> {
		let savedInventories: { [key: string]: Inventory[]} = this.purchasedInventories;
		let savedCarts: Cart[] = this.purchaseRecords;
        let dataPromises = new Array<Promise<void>>();

		//find all previously purchased inventories
		dataPromises.push(this.loadPurchasedInventories());

		//find all previously purchased carts
		dataPromises.push(this.loadPurchasedCarts());

        return Promise.all(dataPromises).then( ()=>{
            for(let i=0; i<savedCarts.length; i++){
                savedCarts[i].setInventory(savedInventories[savedCarts[i].getId()]);
            }
        });
	}

	// startTransaction(userId: string): void

	// cancelTransaction(userId: String): void

	// viewCart(userId: string): Inventory []

	// addToCart(userId: string, serialNumber: string): bool

	// getCart(userId: string): Cart

	// viewPurchases(userId: string): Inventory []

	// returnInventory(userId: string, serialNumber: string): bool

	// checkout(userId: string): void

	// removeFromCart(userId: string, serialNumber: string): bool
}
