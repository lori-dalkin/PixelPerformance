import { dbconnection } from "./dbconnection";
import { Electronic } from "./electronic";
import uuid = require("uuid");
var db = new dbconnection().getDBConnector();

export class TelevisionSet extends Electronic {
    private dimensions: string;
    private type: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, dimensions: string, type: string) {
        super(id, weight, modelNumber, brand, price, "TelevisionSet");
        this.dimensions = dimensions;
        this.type = type;
    }
    
    //Mutators and Accessors
    public setDimensions(dimensions: string) { this.dimensions = dimensions; }
    public setType(type: string) { this.type = type; }

    public getDimension(): string { return this.dimensions; }
    public getType(): string { return this.type; }


    //Save Television Set onto database
    async save(): Promise<boolean> {
       return db.none("INSERT INTO televisionsets VALUES ('" + this.getId() + "'," + this.getWeight() + ",'" + this.getModelNumber() + "','" + this.getBrand() + "'," + this.getPrice() + ",'" + this.getDimension() + "','" + this.getType() + "')")
            .then(function () {
                console.log("Television added to db");
                return true;
            })
            .catch(function (err) {
                console.log("Error in adding Television to the db " + err);
                return false;
            });
    }

    //Retrieve a set based on a unique ID
    public static async find(id: string): Promise<Electronic> {
        let televisionSet: TelevisionSet;
        return db.one('SELECT * FROM televisionsets WHERE id =' + id + ';')
            .then(function (row) {
                televisionSet = new TelevisionSet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.dimensions, row.type);
                return televisionSet;
            }).catch(function (err) {
                console.log("No matching object found");
                return null;
            });
    }

    //Find all the televisions in the db;
    public static async findAll(): Promise<Electronic[]> {
        return db.many('SELECT * FROM televisionSets;')
            .then(function (rows) {
                let television: Electronic[] = new Array<Electronic>();
                for (let i = 0; i < rows.length; i++) {
                    television.push(new TelevisionSet(rows[i].id, rows[i].weight, rows[i].modelnumber, rows[i].brand, rows[i].price,
                        rows[i].dimensions, rows[i].type));
                }
                return television;
            }).catch(function (err) {
                console.log("There was an error retrieving all monitors: " + err);
                return null;
            });
    }

    //Modify data in the db with current attributes
    public async modify(): Promise<boolean> {
        return db.none("UPDATE televisionsets SET weight=" + this.getWeight() + ", modelnumber='" +
            this.getModelNumber() + "', brand='" + this.getBrand() + "', price=" + this.getPrice() +
            ", dimensions='" + this.getDimension() + "', type='" + this.getType() + "';").
            then(function () {
                console.log("televisionset was modified.");
                return true;
            }).catch(function (err) {
                console.log("Could not update televisionset: " + err);
                return false;
            });
    }

    //delete television Set
    public async delete(): Promise<boolean> {
        
        return db.none("DELETE FROM televisionSets WHERE id='" + this.getId() + "';")
            .then(function () {
                console.log("TelevisionSet deleted successfully.");
                return true;
            }).catch(function (err) {
                console.log("No matching object found for delete: " + err);
                return false;
            });
    }

}
