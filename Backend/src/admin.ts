import { dbconnection } from "./dbconnection";
import { User } from "./user";

var db =   new dbconnection().getDBConnector();

export class Admin extends User {
    constructor(id: string, fname: string, lname: string, email: string, password: string) {
        super(id, fname, lname, email, password);
    }

    
    public static async find(id:string){
    let admin: User;
    //return new Admin("id", "fname", "lname", "email", "password");
    db.one("SELECT * FROM admins WHERE id ='" + id + "';")
        .then(function (row) {
            admin = new Admin(row.id, row.fname, row.lname, row.email, row.password)
        }).catch(function (err) {
            console.log("No matching object found");
            return null;
        });
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(admin);
            }, 500);
    });
}


    public static async findByEmail(email: string)
    {
        //return new Admin("id", "fname", "lname", "email", "password");
        let admin: User;
        db.one("SELECT * FROM admins WHERE email ='"+ email + "';")
            .then(function (row) {
                console.log(row);
                admin = new Admin(row.id, row.fname, row.lname, row.email, row.password);
            }).catch(function (err) {
                console.log("No matching object found");
                console.log(err);
                return null;
            });
        return new Promise(resolve => {
                setTimeout(() => {
                  resolve(admin);
                }, 2000);
        });

    }

}