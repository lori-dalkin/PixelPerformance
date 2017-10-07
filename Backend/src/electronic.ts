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
    public getElectronicType(): string { return this.electronicType; }

    public setId(id: string): void { this.id = id; }
    public setWeight(weight: number): void { this.weight = weight; }
    public setModelNumber(modelNum: string): void { this.modelNumber = modelNum; }
    public setBrand(brand: string): void { this.brand = brand; }
    public setPrice(price: number): void { this.price = price; }
    public setElectronicType(elecType: string): void { this.electronicType = elecType; }

    abstract save(): Promise<boolean>;

    // abstract modify(): Promise<boolean>;
    //
    // abstract delete(): Promise<boolean>;

}