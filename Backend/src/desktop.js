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
var computersystem_1 = require("./computersystem");
var dbconnection_1 = require("./dbconnection");
var db = new dbconnection_1.dbconnection().getDBConnector();
var Desktop = /** @class */ (function (_super) {
    __extends(Desktop, _super);
    function Desktop(id, weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, dimensions) {
        var _this = _super.call(this, id, weight, modelNumber, brand, price, "Desktop", processor, ram, cpus, hardDrive, os) || this;
        _this.dimensions = dimensions;
        return _this;
    }
    /***************
    * Accessors
     ***************/
    Desktop.prototype.getDimensions = function () { return this.dimensions; };
    /****************************************************************
    * Method to persist an object of type Desktop to the database
     ****************************************************************/
    Desktop.prototype.save = function () {
        db.none('INSERT INTO desktops VALUES (' + this.id + ',' + this.weight + ',' + this.modelNumber + ',' + this.brand + ',' + this.price + ',' + this.processor + ',' + this.ram + ',' + this.cpus + ',' + this.hardDrive + ',' + this.os + ',' + this.dimensions + ')')
            .then(function () {
            console.log("Desktop added to db");
        })["catch"](function (err) {
            console.log("Error adding Desktop to the db");
            return false;
        });
        return true;
    };
    /*********************************************************************************************
    * Method to retrieve a persisted object in the database corresponding to the passed id value
     ********************************************************************************************/
    Desktop.find = function (id) {
        var desktop;
        db.none('SELECT * FROM desktops WHERE id =' + id + ';')
            .then(function (row) {
            desktop = new Desktop(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.dimensions);
        })["catch"](function (err) {
            console.log("No matching object found");
            return null;
        });
        return desktop;
    };
    return Desktop;
}(computersystem_1.ComputerSystem));
exports.Desktop = Desktop;
