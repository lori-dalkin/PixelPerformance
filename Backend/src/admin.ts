import { dbconnection } from "./dbconnection";
import { User } from "./user";

var db =   new dbconnection().getDBConnector();

export class Admin extends User {
    constructor(id: string, fname: string, lname: string, email: string, password: string) {
        super(id, fname, lname, email, password);
    }

    
    public static find(id:string): User{
    let admin: User;
    db.one('SELECT * FROM admins WHERE id =' + id + ';')
        .then(function (row) {
            admin = new Admin(row.id, row.fname, row.lname, row.email, row.password)
        }).catch(function (err) {
            console.log("No matching object found");
            return null;
        });
    return admin;
}


    public static findByEmail(email: string): User
    {
        return new Admin("id", "fname", "lname", "email", "password");
        /*let admin: User;
        db.one('SELECT * FROM clients WHERE email ='+ email + ';')
            .then(function (row) {
                admin = new Admin(row.id, row.fname, row.lname, row.email, row.password)
            }).catch(function (err) {
                console.log("No matching object found");
                console.log(err);
                return null;
            });
        return admin;*/
    }

}