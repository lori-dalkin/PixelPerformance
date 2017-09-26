export abstract class Electronic {
    id: number;
	weight: number ;
	modelNumber: string;
	brand: string;
	price: number;
    constructor(id: number, weight: number, modelNumber: string, brand: string, price: number) {
		this.id = id;
		this.weight = weight;
		this.modelNumber = modelNumber;
		this.brand = brand;
		this.price = price;
    }
    abstract save():boolean;
}