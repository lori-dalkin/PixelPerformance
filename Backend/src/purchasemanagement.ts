import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";
import { Inventory } from "./Models/inventory";
import { beforeMethod } from 'kaop-ts'
import { afterMethod } from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');


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

	// viewCart(userId: string): Inventory []

	// addToCart(userId: string, serialNumber: string): bool

	// getCart(userId: string): Cart

	// viewPurchases(userId: string): Inventory []

	// returnInventory(userId: string, serialNumber: string): bool

	// checkout(userId: string): void
	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
	})
	@afterMethod(function(meta) { 
		assert(meta.result != null); 
	})
	public removeFromCart(userId: string, serialNumber: string):Inventory{
		let cart:Cart;
		for(let cart of this.activeCarts){
			if(cart.getUserId() == userId){
				let inventory= cart.getInventory()
				for( let i=0;i<inventory.length;i++){
					if(inventory[i].getserialNumber() == serialNumber){
						inventory[i].setCart(null);
						inventory[i].setLockedUntil(null);
						return inventory.splice(i, 1)[0];
						
					}
				}
			}
		}
		return null;
	}

	
}
