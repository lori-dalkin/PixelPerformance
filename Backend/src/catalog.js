"use strict";
exports.__esModule = true;
var monitor_1 = require("./monitor");
var dbconnection_1 = require("./dbconnection");
var desktop_1 = require("./desktop");
var tablet_1 = require("./tablet");
var TelevisionSet_1 = require("./TelevisionSet");
var db = new dbconnection_1.dbconnection().getDBConnector();
var Catalog = /** @class */ (function () {
    function Catalog() {
        this.electronics = [];
        this.loadMonitors();
        this.loadDesktops();
        this.loadTablets();
        this.loadTelevisions();
    }
    Catalog.prototype.loadMonitors = function () {
        var monitor;
        var monitors = this.electronics;
        db.many('SELECT * FROM monitors')
            .then(function (rows) {
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                monitor = new monitor_1.Monitor(row.id, row.weight, row.modelNumber, row.brand, row.price, row.size);
                monitors.push(monitor);
            }
        })["catch"](function (err) {
            console.log("No monitors found" + err);
        });
    };
    Catalog.prototype.loadDesktops = function () {
        var desktop;
        var desktops = this.electronics;
        db.many('SELECT * FROM desktops')
            .then(function (rows) {
            for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                var row = rows_2[_i];
                desktop = new desktop_1.Desktop(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.dimensions);
                desktops.push(desktop);
            }
        })["catch"](function (err) {
            console.log("No desktops found" + err);
        });
    };
    Catalog.prototype.loadTablets = function () {
        var tablet;
        var tablets = this.electronics;
        db.many('SELECT * FROM tablets')
            .then(function (rows) {
            for (var _i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
                var row = rows_3[_i];
                tablet = new tablet_1.Tablet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.processor, row.ram, row.cpus, row.hardDrive, row.os, row.displaySize, row.dimensions, row.battery, row.camera);
                tablets.push(tablet);
            }
        })["catch"](function (err) {
            console.log("No tablets found" + err);
        });
    };
    Catalog.prototype.loadTelevisions = function () {
        var tv;
        var tvs = this.electronics;
        db.many('SELECT * FROM tablets')
            .then(function (rows) {
            for (var _i = 0, rows_4 = rows; _i < rows_4.length; _i++) {
                var row = rows_4[_i];
                tv = new TelevisionSet_1.TelevisionSet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.dimensions, row.type);
                tvs.push(tv);
            }
        })["catch"](function (err) {
            console.log("No tablets found" + err);
        });
    };
    Catalog.prototype.getProduct = function (productId) {
        var elecIterator = this.electronics;
        for (var iter = 0; iter < this.electronics.length; iter++) {
            if (productId == elecIterator[iter].getId())
                return elecIterator[iter];
        }
        return null;
    };
    Catalog.prototype.getProductPage = function (page, type) {
        var monitor = new monitor_1.Monitor('1', 1, "modelNumber", "brand", 1, 1);
        return new Array(monitor, monitor, monitor);
    };
    Catalog.prototype.addProduct = function (type) {
        return true;
    };
    return Catalog;
}());
exports.Catalog = Catalog;
