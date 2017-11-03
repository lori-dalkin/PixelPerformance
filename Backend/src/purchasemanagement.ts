import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";

export class PurchaseManagement {

	private static _instance: PurchaseManagement;
	catalog: Catalog;
	activeCarts: Cart[];
	purchaseRecords: Cart[];

	private constructor() {
		this.catalog = Catalog.getInstance();
		this.activeCarts = [];
		this.purchaseRecords = [];
	}

	public static getInstance() {
		if(!this._instance)
			this._instance = new this();
		return this._instance;
	}

	// startTransaction(userId: string): void

	// cancelTransaction(userId: String): void
	public cancelTransaction(userId: String): void{
		for (let i = 0; i < this.activeCarts.length; i++){
			if (String(this.activeCarts[i].getUserId()) == userId){
				for (let a = 0; this.activeCarts[i].getInventory().length; a++){
					let tempCart = this.activeCarts[i].getInventory();
					tempCart[a].setLockedUntil(null);
				}
				this.activeCarts.splice(i,1);
			}
		}
	}

	// viewCart(userId: string): Inventory []

	// addToCart(userId: string, serialNumber: string): bool

	// getCart(userId: string): Cart

	// viewPurchases(userId: string): Inventory []

	// returnInventory(userId: string, serialNumber: string): bool

	// checkout(userId: string): void

	// removeFromCart(userId: string, serialNumber: string): bool
}
