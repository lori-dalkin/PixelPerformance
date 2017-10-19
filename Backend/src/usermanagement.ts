import * as uuid from "uuid";
import { User } from "./Models/user"
import { Client } from "./Models/client"
import { Admin } from "./Models/admin"
import { dbconnection } from "./Models/dbconnection"

var db = new dbconnection().getDBConnector();

export class UserManagement {

	users: User[];

	constructor(){
		this.users = [];
		//Load all entities from the database
		this.loadClient();
		this.loadAdmin();

	}

	/*********************************************************
	* Load functions for all persisted users in the database
	 *********************************************************/
	 private async loadClient() {
        let clients: User[] = await Client.findAll();
        for(var i = 0; i< clients.length; i++)
        {
            this.users.push(clients[i]);
        }
	}

	private async loadAdmin() {
        let admins: User[] = await Admin.findAll();
        for(var i = 0; i< admins.length; i++)
        {
            this.users.push(admins[i]);
        }
	}

    /****************************************************
    * Function to retrieve a single user by id
     ****************************************************/
	public getUserById(userId:string): User {
        for(var i = 0; i<this.users.length; i++)
        {
            if(this.users[i].getId() == userId)
                return this.users[i];
        }
        return null;
    }
    
    /****************************************************
     * Function to retrieve a single user by email
    ****************************************************/
    public getUserByEmail(email:string): User {
        for(var i = 0; i<this.users.length; i++)
        {
            if(this.users[i].getEmail() == email)
               return this.users[i];
        }
        return null;
    }
}
