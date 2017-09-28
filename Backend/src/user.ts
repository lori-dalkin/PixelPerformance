export abstract class User {
    protected id: string;
	protected fname: string;
	protected lname: string;
	protected email: string;
	protected password: string;
    constructor(id: string, fname: string, lname: string, email: string, password: string) {
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
    }
}