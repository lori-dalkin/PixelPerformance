export abstract class User {
    public id: string;
	protected fname: string;
	protected lname: string;
	public email: string;
	public password: string;
    constructor(id: string, fname: string, lname: string, email: string, password: string) {
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
    }
}