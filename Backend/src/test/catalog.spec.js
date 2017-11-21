"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var catalog_1 = require("../catalog");
var dbconnection_1 = require("../Models/dbconnection");
var monitor_1 = require("../Models/monitor");
var chai_1 = require("chai");
require("mocha");
var db = new dbconnection_1.dbconnection().getDBConnector();
var catalog = catalog_1.Catalog.getInstance();
beforeEach(function (done) {
    setTimeout(function () {
        done();
    }, 500);
});
describe('Getting a Product by its ID', function () {
    it('return should be an electronic with certain ID', function () {
        // get the array of electronics
        var electronics = catalog.electronics;
        // iterate throughout the array to verify the electronics field are all equal when using getProduct method
        for (var _i = 0, electronics_1 = electronics; _i < electronics_1.length; _i++) {
            var electronic = electronics_1[_i];
            chai_1.expect(electronic).to.equal(catalog.getProduct(electronic.getId()));
            chai_1.expect(electronic.getElectronicType()).to.equal(catalog.getProduct(electronic.getId()).getElectronicType());
            chai_1.expect(electronic.getModelNumber()).to.equal(catalog.getProduct(electronic.getId()).getModelNumber());
            chai_1.expect(electronic.getBrand()).to.equal(catalog.getProduct(electronic.getId()).getBrand());
            chai_1.expect(electronic.getPrice()).to.equal(catalog.getProduct(electronic.getId()).getPrice());
            chai_1.expect(electronic.getWeight()).to.equal(catalog.getProduct(electronic.getId()).getWeight());
        }
    });
});
describe('Modify a Product by its ID', function () {
    it('true return if product is successfully modified', function () {
        var electronic = catalog.electronics[0];
        electronic.setPrice(1);
        // check if you can modify the product ( and return true);
        var result = catalog.modifyProduct(electronic.getId(), electronic);
        result.then(function (result) {
            chai_1.expect(result).to.equal(true);
        });
        //check to see if the product in the array is changed
        chai_1.expect(electronic).to.equal(catalog.electronics[0]);
    });
});
describe('Deleting a Product by its ID', function () {
    it('true will be returned once product is deleted', function () {
        //add a product just verify that the a new item can be deleted too
        var monitor = new monitor_1.Monitor(null, 1, "a", "b", 1, 1);
        catalog.addProduct(monitor);
        // get the array of electronics
        var electronics = catalog.electronics;
        var newTestMonitor = electronics[electronics.length - 1];
        var valueShouldBeTrue = true;
        //verify i can delete the new monitor added above;
        var newMonitorDeleted = catalog.deleteProduct(newTestMonitor.getId());
        newMonitorDeleted.then(function (newMonitorDeleted) {
            chai_1.expect(newMonitorDeleted).to.equal(valueShouldBeTrue);
        });
        //try deleting all the other items within our electronic catalogue
        var length = catalog.electronics.length;
        for (var i = 0; i <= length - 1; i++) {
            var value = catalog.deleteProduct(catalog.electronics[0].getId());
            value.then(function (value) {
                chai_1.expect(value).to.equal(valueShouldBeTrue);
            });
        }
        //verify the array is null after deleting all the electronics, just to verify that the last loop effectively called deleteProduct(electronicID)
        chai_1.expect(0).to.equal(catalog.electronics.length);
    });
});
//# sourceMappingURL=catalog.spec.js.map