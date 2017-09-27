import {Electronic} from "./electronic";

export abstract class ComputerSystem extends Electronic{
    processor: string;
    ram: number;
    cpus: number;
    hardDrive: number;

    constructor(id: number, weight: number, modelNumber: string, brand: string, price: number, processor: string, ram: number,
                cpus: number, hardDrive: number) {
        super(id, weight, modelNumber, brand, price);
        this.processor = processor;
        this.ram = ram;
        this.cpus = cpus;
        this.hardDrive = hardDrive;
    }
    abstract save():boolean;
}