"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var dbconnection_1 = require("./dbconnection");
var user_1 = require("./user");
var db = new dbconnection_1.dbconnection().getDBConnector();
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(id, fname, lname, email, password) {
        return _super.call(this, id, fname, lname, email, password) || this;
    }
    Admin.find = function (id) {
        var admin;
        db.one('SELECT * FROM admins WHERE id =' + id + ';')
            .then(function (row) {
            admin = new Admin(row.id, row.fname, row.lname, row.email, row.password);
        })["catch"](function (err) {
            console.log("No matching object found");
            return null;
        });
        return admin;
    };
    Admin.findByEmail = function (email) {
        return new Admin("id", "fname", "lname", "email", "password");
        /*let admin: User;
        db.one('SELECT * FROM clients WHERE email ='+ email + ';')
            .then(function (row) {
                admin = new Admin(row.id, row.fname, row.lname, row.email, row.password)
            }).catch(function (err) {
                console.log("No matching object found");
                console.log(err);
                return null;
            });
        return admin;*/
    };
    return Admin;
}(user_1.User));
exports.Admin = Admin;
