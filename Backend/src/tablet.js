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
var Tablet = /** @class */ (function (_super) {
    __extends(Tablet, _super);
    function Tablet(id, weight, modelNumber, brand, price, processor, ram, cpus, hardDrive, os, displaySize, dimensions, battery, camera) {
        var _this = _super.call(this, id, weight, modelNumber, brand, price, "Tablet", processor, ram, cpus, hardDrive, os) || this;
        _this.displaySize = displaySize;
        _this.dimensions = dimensions;
        _this.battery = battery;
        _this.camera = camera;
        return _this;
    }
    /****************************************************************
   * Method to persist an object of type Tablet to the database
    ****************************************************************/
    Tablet.prototype.save = function () {
        db.none('INSERT INTO tablets VALUES (' + this.id + ',' + this.weight + ',' + this.modelNumber + ',' + this.brand + ',' + this.price + ',' + this.processor + ',' + this.ram + ',' + this.cpus + ',' + this.hardDrive + ',' + this.os + ',' + this.displaySize + ',' + this.dimensions + ',' + this.battery + ',' + this.camera + ')')
            .then(function () {
            console.log("Tablet added to db");
        })["catch"](function (err) {
            console.log("Error adding Tablet to the db");
            return false;
        });
        return true;
    };
    /*********************************************************************************************
   * Method to retrieve a persisted object in the database corresponding to the passed id value
    ********************************************************************************************/
    Tablet.find = function (id) {
        var tablet;
        db.none('SELECT * FROM tablets WHERE id =' + id + ';')
            .then(function (row) {
            tablet = new Tablet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.dimensions, row.battery, row.camera);
        })["catch"](function (err) {
            console.log("No matching object found");
            return null;
        });
        return tablet;
    };
    return Tablet;
}(computersystem_1.ComputerSystem));
exports.Tablet = Tablet;
