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

    protected getId(): string{ return this.id;}
    protected getWeight(): number { return this.weight;}
    protected getModelNumber(): string { return this.modelNumber;}
    protected getBrand(): string { return this.brand;}
    protected getPrice(): number { return this.price;}
    protected getElectronicType(): string { return this.electronicType; }

	protected setId(id: string): void { this.id = id; }
	protected setWeight(weight: number): void { this.weight = weight; }
	protected setModelNumber(modelNum: string): void { this.modelNumber = modelNum; }
	protected setBrand(brand: string): void { this.brand = brand; }
	protected setPrice(price: number): void { this.price = price; }
	protected setElectronicType(elecType: string): void { this.electronicType = elecType; }

    abstract save():boolean;

    abstract modify(): boolean;

    abstract delete(): boolean;

}