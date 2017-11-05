import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";
import {Inventory} from "./Models/inventory";
import {afterMethod, beforeInstance, beforeMethod} from 'kaop-ts'
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
		let dataPromises = new Array<Promise<Cart[]>>();

		dataPromises.push(Cart.findAllRecords());
		dataPromises[0].then((data) => {
			for (let i = 0; i<data.length; i++){
				this.purchaseRecords.push(data[i]);
			}
		});
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
    @beforeMethod(function(meta){
        assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
        assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
        // The client must be logged in.
        // The client must have previous purchases recorded in the system.

    })
    @afterMethod(function(meta) {
        assert(meta.result != null);
        // The return is recorded to the client’s account.
        //     The returned items are put back into the system.
        //     The returned items are available for purchase in the system.

    })
    public returnInventory(userId: string, serialNumber: string): boolean{
		let allPurchases = this.purchaseRecords;
		let availableInventory = this.catalog;
        let soldInventories: { [key: string]: Inventory[]} = {};
        let returningInv: Inventory;
        let modifiedCartId: string;
        let returnSuccess: boolean = true;

        //for each purchase record belonging to this user,
		//collect all inventories that were sold
		for(let i=0; i< allPurchases.length; i++){
			if (allPurchases[i].getUserId() == userId){
                soldInventories[allPurchases[i].getId()] = allPurchases[i].getInventory();
			}
		}

		//Find the inventory to return
		for(let cartId in soldInventories){
			for (let i=0; i< soldInventories[cartId].length; i++){
				if (soldInventories[cartId][i].getserialNumber() == serialNumber){
					returningInv = soldInventories[cartId][i];
					modifiedCartId = cartId;
				}
			}
		}

		//set the cart and lockedUntil variables to null
		returningInv.setCart(null);
		returningInv.setLockedUntil(null);

		//Modify the cart to remove the inventory from its records
		for (let i=0; i<allPurchases.length; i++){
			if (allPurchases[i].getId() == modifiedCartId){
				returnSuccess = await allPurchases[i].removeInventoryRecord(serialNumber);
			}
		}

		if(returnSuccess) {
            availableInventory.returnInventory(returningInv);
            return returnSuccess;
        }
		else{
			console.log("Error processing return: could not remove purchase record for inventory with serial number: " + serialNumber)
			return false;
		}

    }

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

	// removeFromCart(userId: string, serialNumber: string): bool
}
