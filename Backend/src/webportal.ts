import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import * as corser from "corser";
var cors = require('cors');
import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import * as bcrypt from "bcrypt";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { Electronic } from "./Models/electronic";
import { Monitor } from "./Models/monitor";
import { User } from "./Models/user";
import { Cart} from "./Models/cart";
import { Admin } from "./Models/admin";
import { Catalog } from "./catalog";
import { Client } from "./Models/client";
import { UserManagement } from "./usermanagement";
import { PurchaseManagement } from "./purchasemanagement";
import { SystemMonitor } from "./Models/systemmonitor";
import * as uuid from "uuid";
import { AdvicePool, beforeMethod } from 'kaop-ts';
import { RoutingAdvice } from "./routingadvice";
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
    // some dummy data
    let monitor = new Monitor('1', 1, "modelNumber", "brand", 1, 1);
    let monitors = new Array(monitor, monitor, monitor);
    let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    //home page
    let routingCatalog = this.catalog;
    let routingUsers = this.usermanagement;
    let routingPurchases = this.purchasemanagement;
    let routingSystem = this.systemmonitor;

    router.get('/', function (req, res) {
      res.send('20 dollars is 20 dollars backend home page')
    });


    router.post("/api/users/login", function (req, res) {
      let body = req.body as any;
      if(body.email && body.password){
        var email = body.email;
        var password = body.password;
      }
      
      // If password is correct, create an authentication token for the user
      let user = routingUsers.getUserByEmail(email);
      console.log(user);
      if (user) {
        bcrypt.compare(req.body.password.replace(/ /g, ''), user.password.replace(/ /g, '')).then(function(auth) {
          if (auth) {
            var payload = {id: user.id};
            var token = jwt.sign(payload, 'tasmanianDevil');
            if(user instanceof Client){
              res.json({message: "Client" , data: token});
            }else{
              res.json({message: "Admin", data: token});
            }
            SystemMonitor.getInstance().logRequest(user.getId(), "User: " + user.getFName() + " " + user.getLName() + " has logged in", token);
          } else {
            res.status(401).json({message: "Invalid login credentials."});
          }
        })
      } else {
        res.status(401).json({message: "no such user found"});
      }

    router.post("/api/users/login", this.login);
    router.post("/api/users/logout", this.logout);
    router.post("/api/users/", this.postUser);


    router.get("/api/products/", this.getProducts);
    router.post("/api/products/", this.postProduct);
    
    router.get("/api/products/:id", this.getProductById);
    router.delete("/api/products/:id", this.deleteProductById);
    router.put("/api/products/:id", this.modifyProductById);

    router.get("/api/inventories/product/:id", this.getInventoriesById);
    router.post("/api/inventories/product/:id", this.postInventoryById);
    router.delete("/api/inventories/product/:id", this.deleteInventoryById);

    router.get("/api/carts/", this.getCart);
    router.get("/api/carts/inventory/", this.getCartInventory);
    router.post("/api/carts/inventory/:id", this.postCartInventoryById);
    router.post("/api/carts/startTransaction/:id", this.postCartsStartTransactionById);
    router.post("/api/carts/saveCart/:id", this.postCartsSaveCartById);
    router.delete("/api/cart", this.deleteCart);  
    router.delete("/api/carts/inventory/:id", this.deleteCartInventoryById);
    router.post("/api/carts/checkout", this.postCartCheckout);
      
    router.get("/api/records/viewPurchase/:id", this.viewPurchases)


    router.get("/api/products/", passport.authenticate('jwt', { session: false }), function (req, res) {
      let electronics = routingCatalog.getProductPage(parseInt(req.query.page), req.query.type, parseInt(req.query.numOfItems));
      res.send(electronics);
    });
    router.post("/api/products/", passport.authenticate('jwt', { session: false }), function (req, res) {
      try {
        routingCatalog.addProduct(req.body)
        res.send({data:true});
      }
      catch (e) {
        res.send({data: false, error: e});
      }
    });
    
    router.get("/api/products/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      let electronic: Electronic;
      electronic = routingCatalog.getProduct(req.params.id);
      res.send({data: electronic});
    });
    
    router.delete("/api/products/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      routingCatalog.deleteProduct(req.params.id).then((success)=>{
        res.send({data: success});
      });
    });

    router.post("/api/inventories/product/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      try {
        routingCatalog.addInventory(req.params.id)
        res.send({ data:true});
      }
      catch (e) {
        res.send({data: false, error: e});
      }
    });

    router.delete("/api/records/inventory/:id", this.deleteRecordsInventoryById);

    //use router middleware
    this.app.use(router);
  }


  public login(req, res) {
    let routingUsers = UserManagement.getInstance();
    let body = req.body as any;
    if(body.email && body.password){
      var email = body.email;
      var password = body.password;
    }
    
    // If password is correct, create an authentication token for the user
    let user = routingUsers.getUserByEmail(email);
    console.log(user);
    if (user) {
      bcrypt.compare(req.body.password.replace(/ /g, ''), user.password.replace(/ /g, '')).then(function(auth) {
        if (auth) {
          var payload = {id: user.id};
          var token = jwt.sign(payload, 'tasmanianDevil');
          if(user instanceof Client){
            res.json({message: "Client" , data: token});
          }else{
            res.json({message: "Admin", data: token});
          }
          SystemMonitor.getInstance().logRequest(user.getId(), "User: " + user.getFName() + " " + user.getLName() + " has logged in", token);
        } else {
          res.status(401).json({message: "Invalid login credentials."});
        }
      })
    } else {
      res.status(401).json({message: "no such user found"});
    }
  }

  public logout(req, res) {
    res.send({data: true});
  }

  public postUser(req, res) {
    res.send({data: UserManagement.getInstance().addClient(req.body)});
  }

  @beforeMethod(RoutingAdvice.requireLoggedIn)
  public getProducts(req, res) {
    let electronics = Catalog.getInstance().getProductPage(parseInt(req.query.page), req.query.type, parseInt(req.query.numOfItems));
    res.send(electronics);
  }


    router.delete("/api/carts/inventory/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      try{
        PurchaseManagement.getInstance().removeFromCart(req.user.id,req.params.id);
        res.send({data: true});
      }
      catch(e){
        res.send({data: false, error: e});
      }


  @beforeMethod(RoutingAdvice.requireAdmin)
  public postProduct(req, res) {
    try {
      Catalog.getInstance().addProduct(req.body)
      res.send({data:true});
    }
    catch (e) {
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireLoggedIn)
  public getProductById(req, res) {
    let electronic: Electronic;
    electronic = Catalog.getInstance().getProduct(req.params.id);
    res.send({data: electronic});
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public deleteProductById(req, res) {
    Catalog.getInstance().deleteProduct(req.params.id).then((success)=>{
      res.send({data: success});

    });
  }

    router.delete("/api/records/inventory/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      try{
          let returnSuccess = PurchaseManagement.getInstance().returnInventory(req.user.id,req.params.id);
          res.send({data: true});
      }
      catch(e){
        res.send({data: false, error: e});
      }
    });

    router.post("/api/carts/checkout", passport.authenticate('jwt', { session: false }), function (req, res) {
      try{
        PurchaseManagement.getInstance().checkout(req.user.id)
        res.send({data: true});
      }
      catch(e){
        res.send({data: false, error: e});
      }
    });


    router.get("/api/carts/", passport.authenticate('jwt', { session: false }), function (req, res) {
      try{
        let cart  = PurchaseManagement.getInstance().getCart(req.user.id)
        res.send({data: cart});
      }
      catch(e){
        res.send({data: null, error: e});
      }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public modifyProductById(req, res) {
    Catalog.getInstance().modifyProduct(req.params.id, req.body).then((success) => {
        res.send({data:success});
    });
  }

  @beforeMethod(RoutingAdvice.requireLoggedIn)
  public getInventoriesById(req, res) {
    let inventories = Catalog.getInstance().getAllInventories(req.params.id);
    res.send({data: inventories });
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public postInventoryById(req, res) {
    try {
      Catalog.getInstance().addInventory(req.params.id)
      res.send({ data:true});
    }
    catch (e) {
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireAdmin)
  public deleteInventoryById(req, res) {
    Catalog.getInstance().deleteInventory(req.params.id).then((success)=>{
      res.send({data: success});

    });
  }


    router.get("/api/carts/inventory/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
        try {
            let inventories = PurchaseManagement.getInstance().viewCart(req.user.id)
            res.send({ data: inventories });
        }
        catch (e) {
            res.send({ data: null, error: e });

        }
    });
      
  @beforeMethod(RoutingAdvice.requireClient)
  public getCart(req, res) {
    try{
      let cart  = PurchaseManagement.getInstance().getCart(req.user.id)
      res.send({data: cart});
    }
    catch(e){
      res.send({data: null, error: e});
    }
  }


  @beforeMethod(RoutingAdvice.requireClient)
  public getCartInventory(req, res) {
    try{
      let inventories = PurchaseManagement.getInstance().viewCart(req.user.id)
      res.send({data: inventories});
    }
    catch(e){
      res.send({data: null, error: e});
    }
  }


  @beforeMethod(RoutingAdvice.requireClient)
  public postCartInventoryById(req, res) {
    try{
      PurchaseManagement.getInstance().addItemToCart(req.user.id,req.params.id)
      res.send({data: true});
    }
    catch(e){
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public postCartsStartTransactionById(req, res) {
    try {
      let transac = PurchaseManagement.getInstance().startTransaction(req.user.id)
      res.send({ data: transac });
    }
    catch (e) {
      res.send({ data: null, error: e });
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public postCartsSaveCartById(req, res) {
    try {
      let cart = PurchaseManagement.getInstance().getCart(req.user.id).saveCart();
      res.send({ data: cart });
    }
    catch (e) {
      res.send({ data: null, error: e });
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public deleteCart(req, res) {
    try{
      PurchaseManagement.getInstance().cancelTransaction(req.user);
      res.send({data:true});
    }
    catch(e){
      res.send({data: false, error: e});
    }
  }

      
  @beforeMethod(RoutingAdvice.requireClient)
  public deleteCartInventoryById(req, res) {
    console.log("deleting...");
    try{
      PurchaseManagement.getInstance().removeFromCart(req.user.id,req.params.id);
      res.send({data: true});
    }
    catch(e){
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public postCartCheckout(req, res) {
    try{
      PurchaseManagement.getInstance().checkout(req.user.id)
      res.send({data: true});
    }
    catch(e){
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public deleteRecordsInventoryById(req, res) {
    try{
        let returnSuccess = PurchaseManagement.getInstance().returnInventory(req.user.id,req.params.id);
        res.send({data: true});
    }
    catch(e){
      res.send({data: false, error: e});
    }
  }

  @beforeMethod(RoutingAdvice.requireClient)
  public viewPurchases(req,res){
   try {
            let inventories = PurchaseManagement.getInstance().viewPurchases(req.user.id);
             res.send({data: inventories});
      }
      catch(e){
        res.send({data: null, error: e});
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
    var corsOptions = { allowedHeaders: ['Content-Type', 'Authorization']}; 
    this.app.use(cors(corsOptions));
    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });  
    
    //error handling
    this.app.use(errorHandler());


    let routingUsers = this.usermanagement;

    let ExtractJwt = passportJWT.ExtractJwt;
    let JwtStrategy = passportJWT.Strategy;
    var jwtOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey:'tasmanianDevil', passReqToCallback: true }
    
    var strategy = new JwtStrategy(jwtOptions, function(req, jwt_payload, next) {
      let user;
      try{
        user = routingUsers.getUserById(jwt_payload.id);
      }catch(e){
        console.log(e);
        user = null;
      }
      let route = req.method.toLowerCase() + req.path;

      if (user && user.checkPrivilege(route)) {
        console.log(user);
        console.log("authorized to access [" + route + "]");
        next(null, user);
      } else {
        console.log(user);
        console.log("unauthorized to access [" + route + "]");
        next(null, false);
      }
    });
    
    passport.use(strategy);
    

  
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
