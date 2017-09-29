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
    abstract save():boolean;
}