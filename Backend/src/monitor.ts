import { Electronic } from "./electronic"
import { dbconnection } from "./dbconnection"
var db = new dbconnection().getDBConnector();
export class Monitor extends Electronic {
	size: number;
    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, size: number) {
		super(id, weight, modelNumber, brand, price,"Monitor");
		this.size = size;
    }

    public getSize(): number {return this.size;}

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
	 
	public static find(id:string): Electronic{
		let monitor:Monitor;
		db.one('SELECT * FROM monitors WHERE id =' + id +';')
			.then(function(row){
				monitor = new Monitor(row.id,row.weight,row.modelNumber, row.brand, row.price, row.size)
			}).catch(function (err) {
				console.log("No matching object found");
			});
		return monitor
	}
}