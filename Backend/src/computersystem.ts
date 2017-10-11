import {Electronic} from "./electronic";

export abstract class ComputerSystem extends Electronic{
    processor: string;
    ram: number;
    cpus: number;
    hardDrive: number;
    os: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, electronicType: string, processor: string, ram: number,cpus: number, hardDrive: number, os: string) 
    {
        super(id, weight, modelNumber, brand, price, electronicType);
        this.processor = processor;
        this.ram = ram;
        this.cpus = cpus;
        this.hardDrive = hardDrive;
        this.os = os;
    }

    //mutators and accessors
    public getProcessor(): string { return this.processor; }
    public getRam(): number { return this.ram; }
    public getCpu(): number { return this.cpus; }
    public getHardDrive(): number { return this.hardDrive; }
    public getOs(): string {return this.os;}

    public setProcessor(processor: string) { this.processor = processor; }
    public setRam(ram: number) { this.ram = ram; }
    public setCpu(cpus: number) { this.cpus = cpus;}
    public setHardDrive(hardDrive: number) { this.hardDrive = hardDrive; }
    public setOs(os: string) { this.os = os; }

  
}