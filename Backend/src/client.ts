import { dbconnection } from "./dbconnection";
import { User } from "./user";

var db =   new dbconnection().getDBConnector();

export class Client extends User {

	protected address: string;
	protected phone: string;

    constructor(id: string, fname: string, lname: string, email: string, password: string, address: string, phone: string) {
        super(id, fname, lname, email, password);
        this.address = address;
        this.phone = phone;
    }

    public static find(id:string): User
    {
        let client: User;
        db.one('SELECT * FROM clients WHERE id =' + id + ';')
            .then(function (row) {
                client = new Client(row.id, row.fname, row.lname, row.email, row.password, row.address, row.phone)
            }).catch(function (err) {
                console.log("No matching object found");
            });
        return client;
    }

}