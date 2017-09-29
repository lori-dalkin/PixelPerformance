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
Object.defineProperty(exports, "__esModule", { value: true });
var dbconnection_1 = require("./dbconnection");
var electronic_1 = require("./electronic");
var db = new dbconnection_1.dbconnection().getDBConnector();
var TelevisionSet = (function (_super) {
    __extends(TelevisionSet, _super);
    function TelevisionSet(id, weight, modelNumber, brand, price, dimensions, type) {
        var _this = _super.call(this, id, weight, modelNumber, brand, price) || this;
        _this.dimensions = dimensions;
        _this.type = type;
        return _this;
    }
    //Save Television Set onto database
    TelevisionSet.prototype.save = function () {
        db.none('INSERT INTO TelevisionSet VALUES (' + this.id + ',' + this.weight + ',' + this.modelNumber + ',' + this.brand + ',' + this.price + ',' + this.dimensions + ',' + this.type + ')')
            .then(function () {
            console.log("Television added to db");
        })
            .catch(function (err) {
            console.log("Error adding Desktop to the db");
            return false;
        });
        return true;
    };
    //Retrieve a set based on a unique ID
    TelevisionSet.find = function (id) {
        var televisionSet;
        db.one('SELECT * FROM TelevisionSet WHERE id =' + id + ';')
            .then(function (row) {
            televisionSet = new TelevisionSet(row.id, row.weight, row.modelNumber, row.brand, row.price, row.dimensions, row.type);
        }).catch(function (err) {
            console.log("No matching object found");
        });
        return televisionSet;
    };
    return TelevisionSet;
}(electronic_1.Electronic));
exports.TelevisionSet = TelevisionSet;
//# sourceMappingURL=TelevisionSet.js.map