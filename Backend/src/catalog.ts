import { Electronic } from "./electronic"
import { Monitor } from "./monitor"
import { dbconnection } from "./dbconnection"

export class Catalog {
	
	public getProducts(productId:string): Electronic {
		
		return 	new Monitor('1', 1, "modelNumber", "brand", 1, 1);
	}
	public getProductPage(page:number, type:string): Electronic[] {
		
		let monitor = new Monitor('1', 1, "modelNumber", "brand", 1, 1);
		return new Array(monitor, monitor, monitor);
	}
	public addProduct(type:string, ): boolean {
		return true;
	}
}