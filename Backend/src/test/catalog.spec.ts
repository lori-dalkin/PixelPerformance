import { Catalog } from '../catalog';
import { WebPortal } from '../webportal';
import { dbconnection } from "../Models/dbconnection";
import { Monitor } from '../Models/monitor';
import { Electronic } from '../Models/electronic';
import { expect } from 'chai';
import 'mocha';


var db = new dbconnection().getDBConnector();
let catalog = Catalog.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});


describe('Getting a Product by its ID', () => {

    it('return should be an electronic with certain ID', () => {

        // get the array of electronics
        const electronics = catalog.electronics;

        // iterate throughout the array to verify the electronics field are all equal when using getProduct method
        for (let electronic of electronics) {
            expect(electronic).to.equal(catalog.getProduct(electronic.getId()));
            expect(electronic.getElectronicType()).to.equal(catalog.getProduct(electronic.getId()).getElectronicType());
            expect(electronic.getModelNumber()).to.equal(catalog.getProduct(electronic.getId()).getModelNumber());
            expect(electronic.getBrand()).to.equal(catalog.getProduct(electronic.getId()).getBrand());
            expect(electronic.getPrice()).to.equal(catalog.getProduct(electronic.getId()).getPrice());
            expect(electronic.getWeight()).to.equal(catalog.getProduct(electronic.getId()).getWeight());
        }
    })
});



describe('Modify a Product by its ID', () => {


    it('true return if product is successfully modified', () => {
        
        let electronic = catalog.electronics[0];
        electronic.setPrice(1);
      

            // check if you can modify the product ( and return true);
            var result  = catalog.modifyProduct(electronic.getId(), electronic);
            result.then(function (result) {
                expect(result).to.equal(true);
            })
        //check to see if the product in the array is changed
            expect(electronic).to.equal(catalog.electronics[0]);

     
    });
});


describe('Deleting a Product by its ID', () => {


    it('true will be returned once product is deleted', () => {


        //add a product just verify that the a new item can be deleted too
        let monitor = new Monitor(null, 1, "a", "b", 1, 1);
        catalog.addProduct(monitor);

        // get the array of electronics
        const electronics = catalog.electronics;

        let newTestMonitor = electronics[electronics.length - 1];
        let valueShouldBeTrue: boolean = true;


        //verify i can delete the new monitor added above;
        var newMonitorDeleted = catalog.deleteProduct(newTestMonitor.getId());
        newMonitorDeleted.then(function (newMonitorDeleted) {
            expect(newMonitorDeleted).to.equal(valueShouldBeTrue);
        })

        //try deleting all the other items within our electronic catalogue
        let length = catalog.electronics.length;
        for (let i = 0; i <= length - 1; i++) {
            var value = catalog.deleteProduct(catalog.electronics[0].getId());
            value.then(function (value) {
                expect(value).to.equal(valueShouldBeTrue);
            });
        }

        //verify the array is null after deleting all the electronics, just to verify that the last loop effectively called deleteProduct(electronicID)
        expect(0).to.equal(catalog.electronics.length);
    });

});

