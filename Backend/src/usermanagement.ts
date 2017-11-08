import * as uuid from "uuid";
import { User } from "./Models/user"
import { Client } from "./Models/client"
import { Admin } from "./Models/admin"
import { dbconnection } from "./Models/dbconnection"
import {afterMethod, beforeInstance, beforeMethod} from 'kaop-ts'
import  validator = require('validator');
import assert = require('assert');

var db = new dbconnection().getDBConnector();

export class UserManagement {

    private static _instance: UserManagement;
	users: User[];

	private constructor(){
		this.users = [];
		//Load all entities from the database
		this.loadClient();
		this.loadAdmin();
	}


    /**************************************************************************************
     * Getter method that returns the UserManagement instance; allows it to be a Singleton
     **************************************************************************************/
    public static getInstance() {
        if(!this._instance)
            this._instance = new this();
        return this._instance;
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
    @beforeMethod(function(meta){
		assert(validator.isUUID(meta.args[0]), "userId needs to be a uuid");
	})
	@afterMethod(function(meta) {
        assert(meta.result!= null);
    })
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
    // checkout(userId: string): void
    @beforeMethod(function(meta){
        assert(validator.isEmail(meta.args[0]), "Input parameter is not an Email");
    })
    @afterMethod(function(meta) {
        assert(meta.result != null);
    })
    public getUserByEmail(email:string): User {
        for(var i = 0; i<this.users.length; i++)
        {
            if(this.users[i].getEmail() == email)
               return this.users[i];
        }
        return null;
    }

    /***************************************
    * Function to add a new Client
     ****************************************/
    public addClient(data): boolean {
        let client: Client;
        client = new Client(uuid.v1(), data.fname, data.lname, data.email, data.password, data.address, data.phone);
        client.save();
        this.users.push(client);
        return true;
    }
}
