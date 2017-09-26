import { Electronic } from "./electronic"

export class Monitor extends Electronic {
	size: number;
    constructor(id: number, weight: number, modelNumber: string, brand: string, price: number, size: number) {
		super(id, weight, modelNumber, brand, price);
		this.size = size;
    }
     save():boolean {
		 return true;
	 }
}