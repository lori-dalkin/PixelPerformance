import { Electronic } from "./electronic"
import { dbconnection } from "./dbconnection"

var db = new dbconnection().getDBConnector();

export class Monitor extends Electronic {

	private size: number;

    constructor(id: string, weight: number, modelNumber: string, brand: string, price: number, size: number) {
		super(id, weight, modelNumber, brand, price,"Monitor");
		this.size = size;
    }

    public getSize(): number {
    	return this.size;
    }

    public setSize(size:number): void {
    	this.size = size;
    }

    public async save(): Promise<boolean> {
		return db.none("INSERT INTO monitors VALUES ('"+this.id +"',"+this.weight+",'"+this.modelNumber+"','"+this.brand+"',"+this.price+','+this.size+')')
			.then(function(){
				console.log("monitor added to db");
				return true;
			}).catch(function (err) {
				console.log("Error adding monitor to the db: " + err);
				return false;
			});
	}
	 
	public static async find(id:string){
		return db.one('SELECT * FROM monitors WHERE id =' + id +';')
			.then(function(row){
				return new Monitor(row.id,row.weight,row.modelNumber, row.brand, row.price, row.size);
			}).catch(function (err) {
				console.log("No matching object found: " + err);
				return null;
			});
	}

	public static async findAll(){
		console.log("entering find all");
		return db.many('SELECT * FROM monitors;')
			.then(function(data){
                let monitorObjects: Electronic[] = new Array<Electronic>();
                for(let i=0;i< data.length;i++){
					monitorObjects.push(new Monitor( data[i].id,data[i].weight,data[i].modelNumber, data[i].brand, data[i].price, data[i].size));
				}
                return  monitorObjects;
			}).catch(function (err){
				console.log("There was an error retrieving all monitors: " + err);
				return null;
			});
	}

	public async delete(): Promise<boolean>{
    	return db.none("DELETE FROM monitors WHERE id ='"+ this.id + "';")
	        .then(function () {
	        	console.log("monitor was deleted");
	            return true;
	        }).catch(function (err) {
	            console.log("No matching object found for delete: "+ err);
	            return false;
	        });
    }

    public async modify(): Promise<boolean>{
    	return db.none("UPDATE monitors SET weight = '" + this.getWeight() + "', modelNumber = '" + this.getModelNumber() + "', brand = '" + this.getBrand() + "', price = '" + this.getPrice() + "', size = '" + this.getSize() + "' WHERE id = '"+ this.id + "';")
    		.then(function(){
    			console.log("monitor was modified");
    			return true;
    		}).catch(function (err){
    			console.log("No matching object found for modify: " + err);
    			return false;
    		});
    }
}