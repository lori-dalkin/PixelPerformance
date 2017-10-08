import { dbconnection } from "./dbconnection";
import { User } from "./user";

var db =   new dbconnection().getDBConnector();

export class Client extends User {

	private address: string;
	private phone: string;

    constructor(id: string, fname: string, lname: string, email: string, password: string, address: string, phone: string) {
        super(id, fname, lname, email, password);
        this.address = address;
        this.phone = phone;
    }

    public setAddress(address:string): void{
        this.address = address;
    }
    public getAddress():string{
        return this.address;
    }
    public setPhone(phone:string): void{
        this.phone = phone;
    }
    public getPhone():string{
        return this.phone;
    }

    public async delete(): Promise<boolean>{
    return db.none("DELETE FROM clients WHERE id ='"+ this.id + "';")
        .then(function () {
            return true;
        }).catch(function (err) {
            console.log("No matching object found for delete:"+ err);
            return false;
        });
    }

    public static find(id:string): User
    {
        let client: User;
        db.one('SELECT * FROM clients WHERE id =' + id + ';')
            .then(function (row) {
                client = new Client(row.id, row.fname, row.lname, row.email, row.password, row.address, row.phone)
            }).catch(function (err) {
                console.log("No matching object found: "+ err);
                return null;
            });
        return client;
    }

    public static async findAll(): Promise<User[]> {
        let clients: User;
        return db.many('SELECT * FROM clients')
            .then(function (data) {
               return data as User[];
            }).catch(function (err) {
                console.log("Error in getting all clients:" + err);
                return null;
            });
    } 

}