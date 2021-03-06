import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import * as corser from "corser";
var cors = require('cors');
import * as bcrypt from "bcrypt";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { Electronic } from "./Models/electronic";
import { Monitor } from "./Models/monitor";
import { User } from "./Models/user";
import { Cart } from "./Models/cart";
import { Admin } from "./Models/admin";
import { Catalog } from "./catalog";
import { Client } from "./Models/client";
import { UserManagement } from "./usermanagement";
import { PurchaseManagement } from "./purchasemanagement";
import { SystemMonitor } from "./Models/systemmonitor";
import * as uuid from "uuid";
import { AdvicePool, beforeMethod } from 'kaop-ts';
import { RoutingAdvice } from "./Aspects/routingadvice";
import {Inventory} from "./Models/inventory";
import {UnitOfWork} from "./unitofwork";
var swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger.yaml');

/**
 * The web portal.
 *
 * @class WebPortal
 */
export class WebPortal {

    public app: express.Application;
    protected catalog: Catalog;
    protected usermanagement: UserManagement;
    protected purchasemanagement: PurchaseManagement;
    protected systemmonitor: SystemMonitor;
    protected unitofwork: UnitOfWork;

    /**
     * Bootstrap the application.
     *
     * @class WebPortal
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): WebPortal {
        return new WebPortal();
    }

    /**
     * Constructor.
     *
     * @class WebPortal
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();
        this.catalog = Catalog.getInstance();
        this.usermanagement = UserManagement.getInstance();
        this.purchasemanagement = PurchaseManagement.getInstance();
        this.systemmonitor = SystemMonitor.getInstance();
        this.unitofwork = UnitOfWork.getInstance();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    /**
     * Create REST API routes
      *
     * @class WebPortal
     * @method api
     */
    public api() {
        let router: express.Router;
        router = express.Router();
        //home page
        let routingCatalog = this.catalog;
        let routingUsers = this.usermanagement;
        let routingPurchases = this.purchasemanagement;
        let routingSystem = this.systemmonitor;

        router.get('/', function (req, res) {
            res.send('backend home page')
        });

        router.post("/api/users/login", this.login);
        router.post("/api/users/logout", this.logout);
        router.post("/api/users/", this.registerUser);
        router.get("/api/users/", this.getAllClients);
        router.delete("/api/users/", this.deleteClient);

        router.get("/api/products/", this.searchCatalog);
        router.get("/api/products/brands/", this.getBrands);
        router.post("/api/products/", this.addProduct);

        router.get("/api/products/:id", this.getProductById);
        router.delete("/api/products/:id", this.deleteProduct);
        router.put("/api/products/:id", this.modifyProduct);

        router.get("/api/inventories/product/:id", this.viewInventory);
        router.post("/api/inventories/product/:id", this.addInventory);
        router.delete("/api/inventories/product/:id", this.removeInventory);

        router.get("/api/carts/", this.getCart);
        router.post("/api/carts/", this.checkout);
        router.delete("/api/cart", this.cancelTransaction);
      
        router.get("/api/carts/inventory/", this.viewCartInventory);
        router.post("/api/carts/inventory/:id", this.addItemToCart);
        router.delete("/api/carts/inventory/:id", this.removeFromCart);
       
        router.get("/api/records/", this.viewPurchases);
        router.delete("/api/records/inventory/:id", this.returnInventory);

        //use router middleware
        this.app.use(router);
    }

    public login(req, res) {
        let routingUsers = UserManagement.getInstance();
        let body = req.body as any;
        var email = body.email || "";
        var password = body.password || "";
        var clearTokens = body.clearTokens || "";

        // If password is correct, create an authentication token for the user
        try {
          let user = routingUsers.getUserByEmail(email);
          try{
            if(clearTokens)
              throw 'delete other tokens';
            if(user.token === ''){
              throw 'no token';
            }
            jwt.verify(user.token, 'tasmanianDevil');
          }catch (e){
            bcrypt.compare(req.body.password.replace(/ /g, ''), user.password.replace(/ /g, '')).then(function (auth) {
              if (auth) {
                  var payload = { id: user.id };
                  var token = jwt.sign(payload, 'tasmanianDevil', { expiresIn: 60*60*24*365 });
                  routingUsers.getUserByEmail(email).token = token;
                  if (user instanceof Client) {
                      PurchaseManagement.getInstance().startTransaction(user.getId());
                      res.json({ message: "Client", data: token });
                  } else {
                      res.json({ message: "Admin", data: token });
                  }
                  SystemMonitor.getInstance().logRequest(user.getId(), "User: " + user.getFName() + " " + user.getLName() + " has logged in", token);
              } else {
                  res.status(401).json({ message: "Invalid login credentials." });
              }
            })
            return;
          }
          res.status(401).json({ message: "User already logged in." });
        } catch(err) {
            console.log(err);
            res.status(401).json({ message: err.message });
        }
    }

  public getProductById(req, res) {
    try{
      let electronic: Electronic;
      electronic = Catalog.getInstance().getProduct(req.params.id);
      res.send({data: electronic});
    }catch (e) {
      console.log(e);
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public deleteProduct(req, res) {
    try{
      Catalog.getInstance().deleteProduct(req.params.id).then((success)=>{
          UnitOfWork.getInstance().commit();
          res.send({data: success});
      });
    }catch (e) {
      console.log(e);
      res.status = 500;
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public modifyProduct(req, res) {
    try{
      Catalog.getInstance().modifyProduct(req.params.id, req.body).then((success) => {
          UnitOfWork.getInstance().commit();
          res.send({data:success});
      });
    }catch (e) {
      console.log(e);
      res.status = 500;
      res.send({data: false, error: { message: e.message} });
    }
  }
    
  public viewInventory(req, res) {
    try{
      let inventories = Catalog.getInstance().getAllInventories(req.params.id);
      res.send( {count: inventories.length, inventories: inventories});
    }catch (e) {
      console.log(e);
      res.status = 500;
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public addInventory(req, res) {
    try {
      Catalog.getInstance().addInventory(req.params.id);
      UnitOfWork.getInstance().commit();
      res.send({ data:true});
    }catch (e) {
      console.log(e);
      res.status = 500;
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireLoggedIn)
  public logout(req, res) {
    UserManagement.getInstance().getUserById(req.user.id).token = '';
    res.send({ data: true });
  }

    public registerUser(req, res) {
      try{
        let userSuccess = UserManagement.getInstance().addClient(req.body);
        UnitOfWork.getInstance().commit();
        res.send({data: userSuccess});
      }catch (e) {
        console.log(e);
        res.status = 500;
        res.send({data: false, error: e});
      }

    }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public getAllClients(req, res){
    try{
      let clients: Client[] = UserManagement.getInstance().getAllClients();
      let result = [];

      // need to do this to filter out the password
      clients.forEach((client) => {
        result.push({ 
          id: client.getId(),
          fname: client.getFName(), 
          lname: client.getLName(),
          email: client.getEmail(),
          address: client.getAddress(),
          phone: client.getPhone()
        })
      });

      res.send(result);

    }catch(e){
      console.log(e);
      res.status = 500;
      res.send([]);
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public deleteClient(req, res){
    try{
      
      PurchaseManagement.getInstance().cancelTransaction(req.user.id);
      res.send(UserManagement.getInstance().deleteClient(req.user.id));

    }catch(e){
      console.log(e);
      res.status = 500;
      res.send({error:'false'});
    }
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public removeInventory(req, res) {
    try{
      Catalog.getInstance().deleteInventory(req.params.id).then((success)=>{
          UnitOfWork.getInstance().commit();
          res.send({data: success});
    });
    }catch (e) {
      console.log(e);
      res.status = 500;
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public getCart(req, res) {
    try{
      let cart  = PurchaseManagement.getInstance().getCart(req.user.id)
      res.send({data: cart});
    }catch (e) {
      console.log(e);
      res.status = 500;
      res.send({data: false, error: e});
    }
  }
      


    public searchCatalog(req, res) {
      try{
        let electronics = Catalog.getInstance().getProductPage(parseInt(req.query.page), req.query.type, parseInt(req.query.numOfItems),
                                                               parseInt(req.query.priceLow),parseInt(req.query.priceHigh), req.query.brand,
                                                               parseInt(req.query.maxSize), parseInt(req.query.maxWeight), req.query.priceSort);
        res.send(electronics);
      }catch (e) {
        console.log(e);
        res.status = 500;
        res.send({data: false, error: e});
      }
    }

    public getBrands(req, res) {
      try{
        let brands = Catalog.getInstance().getAllBrands();
        console.log(brands);
        res.send(Array.from(brands));
      }catch (e) {
        console.log(e);
        res.status = 500;
        res.send({data: false, error: e});
      }
    }

    @beforeMethod(RoutingAdvice.requireAdmin)
    public addProduct(req, res) {
        try {
            Catalog.getInstance().addProduct(req.body);
            UnitOfWork.getInstance().commit();
            res.send({ data: true });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: { message: e.message } });
        }
    }

    @beforeMethod(RoutingAdvice.requireClient)
    public viewCartInventory(req, res) {
        try {
            let inventories = PurchaseManagement.getInstance().viewCart(req.user.id)
            res.send({ data: inventories });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: null, error: e });
        }
    }


    @beforeMethod(RoutingAdvice.requireClient)
    public addItemToCart(req, res) {
        try {
            PurchaseManagement.getInstance().addItemToCart(req.user.id, req.params.id)
            res.send({ data: true });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: e });
        }
    }


    @beforeMethod(RoutingAdvice.requireClient)
    public cancelTransaction(req, res) {
        try {
            PurchaseManagement.getInstance().cancelTransaction(req.user.id);
            res.send({ data: true });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: e });
        }
    }

    @beforeMethod(RoutingAdvice.requireClient)
    public removeFromCart(req, res) {
        console.log("deleting...");
        try {
            PurchaseManagement.getInstance().removeFromCart(req.user.id, req.params.id);
            res.send({ data: true });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: e });
        }
    }

    @beforeMethod(RoutingAdvice.requireClient)
    public checkout(req, res) {
        try {
            PurchaseManagement.getInstance().checkout(req.user.id);
            UnitOfWork.getInstance().commit();
            res.send({ data: true });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: e });
        }
    }

    @beforeMethod(RoutingAdvice.requireClient)
    public viewPurchases(req, res) {
        try {
            let purchases: Inventory[] = [];
            purchases = PurchaseManagement.getInstance().viewPurchases(req.user.id);
            res.send({ data: purchases });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: e });
        }
    }
    @beforeMethod(RoutingAdvice.requireClient)
    public returnInventory(req, res) {
        try {
            let returnSuccess = PurchaseManagement.getInstance().returnInventory(req.user.id, req.params.id);
            UnitOfWork.getInstance().commit();
            res.send({ data: true });
        }
        catch (e) {
          console.log(e);
          res.status = 500;
          res.send({ data: false, error: e });
        }
    }

    /**
     * Configure application
     *
     * @class WebPortal
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //use logger middlware
        this.app.use(logger("dev"));

        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //use override middlware
        this.app.use(methodOverride());

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        // ## CORS middleware
        var corsOptions = { allowedHeaders: ['Content-Type', 'Authorization'] };
        this.app.use(cors(corsOptions));
        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());

    }

    /**
     * Create router
     *
     * @class WebPortal
     * @method api
     */
    public async routes() {
        //empty for now
    }
}