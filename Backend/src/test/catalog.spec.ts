import { Catalog } from '../catalog';
import { WebPortal } from '../webportal';
import { dbconnection } from "../Models/dbconnection";
import { Monitor } from '../Models/monitor';
import { Desktop } from '../Models/desktop';
import {Tablet} from "../Models/tablet";
import {Laptop} from "../Models/laptop";
import { Electronic } from '../Models/electronic';
import { expect } from 'chai';
import 'mocha';
import * as uuid from "uuid";

var db = new dbconnection().getDBConnector();
let catalog = Catalog.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

describe('Getting Products from Catalog', () => {
  
      it('return should be all of the electronics in the catalog', () => {
  
          
          let undef:any;
          //get all electronics
          const electronics = catalog.getProductPage(undef,undef,undef,undef,undef,undef,undef,undef,);

          //compare products returned from products in catalog
          for(var i=0; i<electronics.totalProducts; i++) {
            expect(catalog.electronics[i]).to.deep.equal(electronics.products[i]);
          }

          //compare size of products in catalog with getProducts call
          expect(catalog.electronics.length).to.equal(electronics.totalProducts);

          //verify electronic properties
          verifyElectronicProperties(electronics.products);
  
      })
  });

  describe('Adding Products to Catalog', () => {
    
        it('add product in the catalog', () => {
    
            
            let undef:any;
            //get inital electronics length
            let numElecStart:number = catalog.electronics.length;
            //create electronics to add in catalog
            let mId:string = uuid.v1();
            let dId:string = uuid.v1();
            let lId:string = uuid.v1();
            let tId:string = uuid.v1();
            let monitor = new Monitor(mId, 1, "modelNumber99", "brand", 1, 1);
            let desktop = new Desktop(dId, 1, "modelNumber98", "brand", 1,"Intel",1,1,1,"Mac","13.5");
            let laptop = new Laptop(lId, 1, "modelNumber97", "brand", 1,"Intel",1,1,1,"Mac",13,1400,true,true);
            let tablet = new Tablet(tId, 1, "modelNumber96", "brand", 1,"Intel",1,1,1,"Mac",13,"13.5",1400,true);
            let electronics: Electronic[] = [];
            electronics.push(monitor);
            electronics.push(desktop);
            electronics.push(laptop);
            electronics.push(tablet);
            //get all electronics
  
            //test add product
            expect(catalog.addProduct(monitor)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 1);
            expect(catalog.addProduct(desktop)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 2);
            expect(catalog.addProduct(laptop)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 3);
            expect(catalog.addProduct(tablet)).equal(true);
            expect(catalog.electronics.length).equal(numElecStart + 4);

            verifyElectronicProperties(electronics);

            //clean database from tests
            catalog.deleteProduct(mId);
            catalog.deleteProduct(dId);
            catalog.deleteProduct(lId);
            catalog.deleteProduct(tId);
        })
    });

    function verifyElectronicProperties(electronics:Electronic[])
    {
      for(let elec of electronics)
      {
        expect(elec).to.have.property('id');
        expect(elec).to.have.property('weight');
        expect(elec).to.have.property('modelNumber');
        expect(elec).to.have.property('brand');
        expect(elec).to.have.property('price');
        expect(elec).to.have.property('electronicType');
        if(elec.getElectronicType() === 'Monitor')
          expect(elec).to.have.property('size');
        else if(elec.getElectronicType() === 'Desktop')
        {
          expect(elec).to.have.property('processor');
          expect(elec).to.have.property('ram');
          expect(elec).to.have.property('cpus');
          expect(elec).to.have.property('hardDrive');  
          expect(elec).to.have.property('os');
          expect(elec).to.have.property('dimensions');
        }
        else if(elec.getElectronicType() === 'Laptop')
        {
          expect(elec).to.have.property('processor');
          expect(elec).to.have.property('ram');
          expect(elec).to.have.property('cpus');
          expect(elec).to.have.property('hardDrive');  
          expect(elec).to.have.property('os');
          expect(elec).to.have.property('displaySize');
          expect(elec).to.have.property('battery');
          expect(elec).to.have.property('camera');
          expect(elec).to.have.property('touchscreen');
        }
        else if(elec.getElectronicType() === 'Tablet')
        {
          expect(elec).to.have.property('processor');
          expect(elec).to.have.property('ram');
          expect(elec).to.have.property('cpus');
          expect(elec).to.have.property('hardDrive');  
          expect(elec).to.have.property('os');
          expect(elec).to.have.property('displaySize');
          expect(elec).to.have.property('dimensions');
          expect(elec).to.have.property('battery');
          expect(elec).to.have.property('camera');
        }
      }
    }