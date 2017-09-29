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
/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

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
   * @class Server
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
		res.send({data: monitor})
	});

	//use router middleware
	this.app.use(router);
  }

  /**
   * Configure application
   *
   * @class Server
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

    //enable cors
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
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
   * @class Server
   * @method api
   */
  public routes() {
    //empty for now
  }
}