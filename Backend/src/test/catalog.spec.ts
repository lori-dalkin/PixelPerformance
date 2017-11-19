import { Catalog } from '../catalog';
import { WebPortal } from '../webportal';
import { expect } from 'chai';
import 'mocha';
let catalog = Catalog.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

