import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { Electronic } from "./electronic"
import { Monitor } from "./monitor"
import {Catalog} from "./catalog";
/**
 * The web portal.
 *
 * @class WebPortal
 */
export class WebPortal {

  public app: express.Application;
  protected catalog: Catalog;

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
    this.catalog = new Catalog();

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

	router.get('/', function (req, res) {
		res.send('20 dollars is 20 dollars backend home page')
	});
	router.post("/api/users/logon", function (req, res) {
		res.send({data: token})
	});
	router.post("/api/users/logoff", function (req, res) {
		res.send({data: true})
	});
	router.get("/api/products/", function (req, res) {
		res.send({data: monitors})
	});
	router.post("/api/products/",function (req, res) {
		res.send({data: monitor})
	});
	
	router.get("/api/products/:id",function (req, res) {
		let electronic: Electronic;
		electronic = this.catalog.getProduct(req.params.id);
		res.send({data: electronic});
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

    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
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
  public routes() {
    //empty for now
  }
}