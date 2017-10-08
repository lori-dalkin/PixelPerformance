"use strict";
exports.__esModule = true;
var promise = require('bluebird');
var options = {
    // Initialization Options
    promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/DBpixelperformance';
var dbc = pgp(connectionString);
var dbconnection = /** @class */ (function () {
    function dbconnection() {
        this.db = dbc;
    }
    dbconnection.prototype.getDBConnector = function () {
        return this.db;
    };
    return dbconnection;
}());
exports.dbconnection = dbconnection;
