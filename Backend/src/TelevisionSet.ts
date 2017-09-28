
	
import { dbconnection } from "./dbconnection";
import { Electronic } from "./electronic";

var db = new dbconnection().getDBConnector();

export  class TelevisionSet extends Electronic{
    dimensions: string;
    type: string;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, dimensions: string , type : string) {
        super(id, weight, modelNumber, brand, price);
        this.dimensions = dimensions;
        this.type = type;
    }


	//Save Television Set onto database
    save(): boolean {
        db.none('INSERT INTO TelevisionSet VALUES (' + this.id + ',' + this.weight + ',' + this.modelNumber + ',' + this.brand + ',' + this.price + ',' + this.dimensions + ',' + this.type + ')')
            .then(function () {
                console.log("Television added to db");
            })
            .catch(function (err) {
                console.log("Error adding Desktop to the db");
                return false;
            });
        return true;
    }


	//Retrieve a set based on a unique ID
    public static find(id: string): Electronic {
        let televisionSet: TelevisionSet;
        db.one('SELECT * FROM TelevisionSet WHERE id =' + id + ';')
            .then(function (row) {
                televisionSet = new TelevisionSet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.dimensions, row.type)
            }).catch(function (err) {
                console.log("No matching object found");
            });
        return televisionSet;
    }
}
}