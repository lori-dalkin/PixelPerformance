enum Routes
{
	getRoot = "get/",
	postLogin = "post/api/users/login",
	postLogout = "post/api/users/logout",
	getProduct = "get/api/products/",
	postProduct = "post/api/products/",
	deleteProduct = "delete/api/products/",
	getInventory = "get/api/inventories/product/",
	postInventory = "post/api/inventories/",
	deleteInventory = "delete/api/inventories/product/",
	modifyProducts = "post/modify/api/products/"
}
export abstract class User {
	public id: string;
	static Routes = Routes;
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

	public setId(id:string): void{
		this.id = id;
	}
	public getId():string{
		return this.id;
	}
	public setFName(fname:string): void{
		this.fname = fname;
	}
	public getFName():string{
		return this.fname;
	}
	public setLName(lname:string): void{
		this.lname = lname;
	}
	public getLName():string{
		return this.lname;
	}
	public setEmail(email:string): void{
		this.email = email;
	}
	public getEmail():string{
		return this.email;
	}
	public setPassword(password:string): void{
		this.password = password;
	}
	public getPassword():string{
		return this.password;
	}
	abstract checkPrivilege(route : string) : boolean;

}
