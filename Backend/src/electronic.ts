export abstract class Electronic {
    protected id: number;
	protected weight: number ;
	protected modelNumber: string;
	protected brand: string;
	protected price: number;
    constructor(id: number, weight: number, modelNumber: string, brand: string, price: number) {
		this.id = id;
		this.weight = weight;
		this.modelNumber = modelNumber;
		this.brand = brand;
		this.price = price;
    }
    abstract save():boolean;
}