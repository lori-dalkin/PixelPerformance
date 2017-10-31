import { Catalog } from "./catalog";
import { Cart } from "./cart";

export class PurchaseManagement {

	private static _instance: PurchaseManagement;
	catalog: Catalog;
	activeCarts: Cart[];
	purchaseRecords: Cart[];

	private constructor() {
		this.catalog = new Catalog();
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

	// viewCart(userId: string): Inventory []

	// addToCart(userId: string, serialNumber: string): bool

	// getCart(userId: string): Cart

	// viewPurchases(userId: string): Inventory []

	// returnInventory(userId: string, serialNumber: string): bool

	// checkout(userId: string): void

	// removeFromCart(userId: string, serialNumber: string): bool
}
