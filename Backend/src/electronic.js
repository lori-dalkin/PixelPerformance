"use strict";
exports.__esModule = true;
var Electronic = /** @class */ (function () {
    function Electronic(id, weight, modelNumber, brand, price, electronicType) {
        this.id = id;
        this.weight = weight;
        this.modelNumber = modelNumber;
        this.brand = brand;
        this.price = price;
        this.electronicType = electronicType;
    }
    Electronic.prototype.getId = function () { return this.id; };
    Electronic.prototype.getWeight = function () { return this.weight; };
    Electronic.prototype.getModelNumber = function () { return this.modelNumber; };
    Electronic.prototype.getBrand = function () { return this.brand; };
    Electronic.prototype.getPrice = function () { return this.price; };
    return Electronic;
}());
exports.Electronic = Electronic;
