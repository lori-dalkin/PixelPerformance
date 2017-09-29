export abstract class Electronic {
    protected id: string;
	protected weight: number ;
	protected modelNumber: string;
	protected brand: string;
	protected price: number;
	protected electronicType: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, electronicType: string) {

		this.id = id;
		this.weight = weight;
		this.modelNumber = modelNumber;
		this.brand = brand;
		this.price = price;
		this.electronicType = electronicType;
    }

    public getId(): string{ return this.id;}
    public getWeight(): number { return this.weight;}
    public getModelNumber(): string { return this.modelNumber;}
    public getBrand(): string { return this.brand;}
    public getPrice(): number { return this.price;}

    abstract save():boolean;


}