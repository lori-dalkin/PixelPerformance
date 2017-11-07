import { Catalog } from "./catalog";
import { Cart } from "./Models/cart";
import {Inventory} from "./Models/inventory";
import {afterMethod, beforeInstance, beforeMethod} from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');
import * as uuid from "uuid";


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

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) { 
		assert(meta.result != null, "Inventory within cart not found."); 
	})
	public viewCart(userId: string): Inventory []{
		return this.getCart(userId).getInventory()
	}

	// addToCart(userId: string, serialNumber: string): bool

	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) { 
		assert(meta.result != null, "There is no active cart for this user."); 
	})
	public getCart(userId: string): Cart
	{
		for(var i=0;i<this.activeCarts.length; i++)
		{
			if(this.activeCarts[i].getUserId() == userId)
				return this.activeCarts[i];
		}
	}



	// viewPurchases(userId: string): Inventory []

	// returnInventory(userId: string, serialNumber: string): bool


	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0]) != null, "no cart is assiated with the user");
		assert( meta.scope.getCart(meta.args[0]).getInventory().length>0, "an empty cart cannot be checkedout" )
	})
	@afterMethod(function(meta) { 
		var purchaseManagement = PurchaseManagement.getInstance();
		assert( purchaseManagement.findCart(meta.args[0]) == null, "cart was not removed from active carts");
		assert( purchaseManagement.findRecord(meta.args[0]) != null , "cart was not added to records");
		assert(purchaseManagement.ifInventoriesExist(purchaseManagement.findRecord(meta.args[0]).getInventory()), "inventories weren't removed from catalog")
	})
	public checkout(userId: string):void{
		let cart:Cart =  this.findCart(userId);
		for(let i=0; i< this.activeCarts.length;i++){
			if(this.activeCarts[i].getUserId() == userId){
				cart = this.activeCarts.splice(i, 1)[0]
				break;
			}
		}
		this.purchaseRecords.push(cart);
		for(let inventory of cart.getInventory()){
			this.catalog.checkoutInventory(inventory.getserialNumber());
		}
		
	}


	@beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
		assert(validator.isUUID(meta.args[1]), "serialNumber needs to be a uuid");
		assert( PurchaseManagement.getInstance().findCart(meta.args[0])!= null, "no cart was found for associated user")
	})

	@afterMethod(function(meta) { 
		assert(meta.result != null,"matching inventory could not be found"); 
	})
	public removeFromCart(userId: string, serialNumber: string):Inventory{
		let cart = this.findCart(userId);
		let inventory= cart.getInventory();
		for( let i=0;i<inventory.length;i++){
			if(inventory[i].getserialNumber() == serialNumber){
				inventory[i].setCart(null);
				inventory[i].setLockedUntil(null);
				return inventory.splice(i, 1)[0];	
			}
		}
		return null;
	}

	public findCart( userId:string){
		for(let cart of this.activeCarts){
			if( cart.getUserId() == userId){
				return cart;
			}
		}
		return null
	}

	public findRecord( userId:string){
		for(let cart of this.purchaseRecords){
			if( cart.getUserId() == userId){
				return cart;
			}
		}
		return null
	}
	
	public ifInventoriesExist( inventories: Inventory[]): boolean{
		for( let inventory of inventories ){
			if( Catalog.getInstance().getInventory(inventory.getserialNumber()) != null ){
				return true;
			}
		}
		return false;
	}

}
