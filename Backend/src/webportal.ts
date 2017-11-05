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
            res.json({message: "ok", data: token});
            let logCall : SystemMonitor;
            logCall.logRequest(user.getId(), "User: " + user.getFName() + " " + user.getLName() + " has logged in", token);
          } else {
            res.status(401).json({message: "Invalid login credentials."});
          }
        })
      } else {
        res.status(401).json({message: "no such user found"});
      }

    });

    router.post("/api/users/logout", function (req, res) {
      res.send({data: true});
    });

    router.post("/api/users/", function (req, res) {
      res.send({data: routingUsers.addClient(req.body)});
    });

    router.get("/api/products/", passport.authenticate('jwt', { session: false }), function (req, res) {
      let electronics = routingCatalog.getProductPage(parseInt(req.query.page), req.query.type, parseInt(req.query.numOfItems));
      res.send(electronics);
    });
    router.post("/api/products/", passport.authenticate('jwt', { session: false }), function (req, res) {
      res.send({data:routingCatalog.addProduct(req.body)});
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
      routingCatalog.addInventory(req.params.id).then((success)=>{
        res.send({ data:success});
      })
    });

    router.get("/api/inventories/product/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      let inventories = routingCatalog.getAllInventories(req.params.id);
      res.send({data: inventories });
    });
    
    router.delete("/api/inventories/product/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      routingCatalog.deleteInventory(req.params.id).then((success)=>{
        res.send({data: success});
      });
    });

    router.put("/api/products/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      routingCatalog.modifyProduct(req.params.id, req.body).then((success) => {
          res.send({data:success});
      });
    });

    
    router.delete("/api/carts/inventory/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
      try{
        PurchaseManagement.getInstance().removeFromCart(req.user.id,req.params.id)
        res.send({data: true});
      }
      catch(e){
        res.send({data: false, error: e});
      }

    });
    //use router middleware
    this.app.use(router);
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
      let user = routingUsers.getUserById(jwt_payload.id);
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