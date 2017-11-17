
export class UnitOfWork {

    private static _instance: UnitOfWork = null;
    private newProducts: any[];
    private dirtyProducts: any[];
    private deletedProducts: any[];

    constructor(){
        this.newProducts = [];
        this.deletedProducts = [];
        this.dirtyProducts = [];
    }

    /*********************************************************
     * Method to return Singleton Catalog instance            *
     *********************************************************/
    public static getInstance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    public getNewProducts(): any[] { return this.newProducts;}
    public getDirtyProducts(): any[] { return this.dirtyProducts;}
    public getDeletedProducts(): any[] { return this.deletedProducts;}

    public setNewProducts(newprod: any[]) { this.newProducts = newprod;}
    public setDirtyProducts(dirty: any[]) { this.dirtyProducts = dirty;}
    public setDeletedProducts(deleted: any[]) { this.deletedProducts = deleted;}

    public registerNew(newProd: any): void {
        this.newProducts.push(newProd);
    }

    public registerDirty(dirty: any): void {
        this.dirtyProducts.push(dirty);
    }

    public registerDeleted(deleted: any): void {
        this.deletedProducts.push(deleted);
    }

    protected saveNewProducts(): void {
        for(let i=0; i<this.newProducts.length; i++){
            this.newProducts[i].save();
        }
        this.newProducts = [];
    }

    protected deleteUnusedProducts(): void {
        for(let i=0; i<this.deletedProducts.length; i++){
            this.deletedProducts[i].delete();
        }
        this.deletedProducts = [];
    }

    protected updateDirtyProducts(): void {
        for (let i=0; i<this.dirtyProducts.length; i++){
            this.dirtyProducts[i].modify();
        }
        this.dirtyProducts = [];
    }

    public commit(): void {
        console.log("New products:\n" + this.newProducts);
        this.saveNewProducts();
        this.deleteUnusedProducts();
        this.updateDirtyProducts();
        console.log("Unit of work done working");
    }
}