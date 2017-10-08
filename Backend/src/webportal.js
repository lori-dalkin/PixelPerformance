"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var jwt = require("jsonwebtoken");
var corser = require("corser");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var monitor_1 = require("./monitor");
var admin_1 = require("./admin");
var catalog_1 = require("./catalog");
/**
 * The web portal.
 *
 * @class WebPortal
 */
var WebPortal = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class WebPortal
     * @constructor
     */
    function WebPortal() {
        //create expressjs application
        this.app = express();
        this.catalog = new catalog_1.Catalog();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class WebPortal
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    WebPortal.bootstrap = function () {
        return new WebPortal();
    };
    /**
     * Create REST API routes
      *
     * @class WebPortal
     * @method api
     */
    WebPortal.prototype.api = function () {
        var router;
        router = express.Router();
        // some dummy data
        var monitor = new monitor_1.Monitor('1', 1, "modelNumber", "brand", 1, 1);
        var monitors = new Array(monitor, monitor, monitor);
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        //home page
        var routingCatalog = this.catalog;
        router.get('/', function (req, res) {
            res.send('20 dollars is 20 dollars backend home page');
        });
        router.get("/secretDebug", function (req, res, next) {
            console.log(req.get('Authorization'));
            next();
        }, function (req, res) {
            res.json("debugging");
        });
        router.post("/api/users/logon", function (req, res) {
            console.log(req.body);
            var body = req.body;
            console.log(body);
            if (body.email && body.password) {
                var email = body.email;
                var password = body.password;
            }
            // usually this would be a database call:
            var user = admin_1.Admin.findByEmail(email);
            if (!user) {
                res.status(401).json({ message: "no such user found" });
            }
            console.log(user);
            //add hasing.
            if (user.password === req.body.password) {
                // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                var payload = { id: user.id };
                var token = jwt.sign(payload, 'tasmanianDevil');
                res.json({ message: "ok", token: token });
            }
            else {
                res.status(401).json({ message: "passwords did not match" });
            }
        });
        router.get("/secret/", passport.authenticate('jwt', { session: false }), function (req, res) {
            res.json({ message: "Success! You can not see this without a token" });
        });
        router.post("/api/users/logoff", function (req, res) {
            res.send({ data: true });
        });
        router.get("/api/products/", function (req, res) {
            res.send({ data: monitors });
        });
        router.post("/api/products/", function (req, res) {
            res.send({ data: monitor });
        });
        router.get("/api/products/:id", function (req, res) {
            var electronic;
            electronic = routingCatalog.getProduct(req.params.id);
            res.send({ data: electronic });
        });
        //use router middleware
        this.app.use(router);
    };
    /**
     * Configure application
     *
     * @class WebPortal
     * @method config
     */
    WebPortal.prototype.config = function () {
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
        // ## CORS middleware
        this.app.use(corser.create());
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        var users = [
            {
                id: 1,
                name: 'jonathanmh',
                password: '%2yx4'
            },
            {
                id: 2,
                name: 'test',
                password: 'test'
            }
        ];
        //error handling
        this.app.use(errorHandler());
        var ExtractJwt = passportJWT.ExtractJwt;
        var JwtStrategy = passportJWT.Strategy;
        var jwtOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'tasmanianDevil' };
        var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            console.log('payload received', jwt_payload);
            // usually this would be a database call:
            var user = admin_1.Admin.find(jwt_payload.id);
            if (user) {
                next(null, user);
            }
            else {
                next(null, false);
            }
        });
        passport.use(strategy);
    };
    /**
     * Create router
     *
     * @class WebPortal
     * @method api
     */
    WebPortal.prototype.routes = function () {
        //empty for now
    };
    return WebPortal;
}());
exports.WebPortal = WebPortal;
