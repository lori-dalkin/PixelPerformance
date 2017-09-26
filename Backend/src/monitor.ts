import { Electronic } from "./electronic"
import { dbconnection } from "./dbconnection"
var db = new dbconnection().getDBConnector();
export class Monitor extends Electronic {
	size: number;
    constructor(id: number, weight: number, modelNumber: string, brand: string, price: number, size: number) {
		super(id, weight, modelNumber, brand, price);
		this.size = size;
    }
     save():boolean {
		db.none('INSERT INTO monitors VALUES ('+this.id +','+this.weight+','+this.modelNumber+','+this.brand+','+this.price+','+this.size+')')
			.then(function(){
				console.log("monitor added to db");})
			.catch(function (err) {
				console.log("Error adding monitor to the db");
				return false;
			});
		return true;
	 }
}