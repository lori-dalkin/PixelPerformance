import { dbconnection } from "./dbconnection";
import { User } from "./user";

var db =   new dbconnection().getDBConnector();

protected address: string;
protected phone: string;

export class Client extends User {
    constructor(id: string, fname: string, lname: string, email: string, password: string) {
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