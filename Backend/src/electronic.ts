export abstract class Electronic {
    protected id: string;
	protected weight: number ;
	protected modelNumber: string;
	protected brand: string;
	protected price: number;
    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number) {
		this.id = id;
		this.weight = weight;
		this.modelNumber = modelNumber;
		this.brand = brand;
		this.price = price;
    }
    abstract save():boolean;
}