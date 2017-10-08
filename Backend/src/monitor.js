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
var electronic_1 = require("./electronic");
var dbconnection_1 = require("./dbconnection");
var db = new dbconnection_1.dbconnection().getDBConnector();
var Monitor = /** @class */ (function (_super) {
    __extends(Monitor, _super);
    function Monitor(id, weight, modelNumber, brand, price, size) {
        var _this = _super.call(this, id, weight, modelNumber, brand, price, "Monitor") || this;
        _this.size = size;
        return _this;
    }
    Monitor.prototype.getSize = function () { return this.size; };
    Monitor.prototype.save = function () {
        db.none('INSERT INTO monitors VALUES (' + this.id + ',' + this.weight + ',' + this.modelNumber + ',' + this.brand + ',' + this.price + ',' + this.size + ')')
            .then(function () {
            console.log("monitor added to db");
        })["catch"](function (err) {
            console.log("Error adding monitor to the db");
            return false;
        });
        return true;
    };
    Monitor.find = function (id) {
        var monitor;
        db.one('SELECT * FROM monitors WHERE id =' + id + ';')
            .then(function (row) {
            monitor = new Monitor(row.id, row.weight, row.modelNumber, row.brand, row.price, row.size);
        })["catch"](function (err) {
            console.log("No matching object found");
            return null;
        });
        return monitor;
    };
    return Monitor;
}(electronic_1.Electronic));
exports.Monitor = Monitor;
