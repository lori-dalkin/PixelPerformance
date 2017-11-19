import { PurchaseManagement} from '../purchasemanagement';
import { WebPortal } from '../webportal';
import { expect } from 'chai';
import 'mocha';
let purchasemanagement = PurchaseManagement.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

