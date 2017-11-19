import { UserManagement} from '../userManagement';
import { WebPortal } from '../webportal';
import { expect } from 'chai';
import 'mocha';
let userManagement = UserManagement.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

describe('Getting all clients', () => {

  it('should return a list of all clients', () => {
    
    const users = userManagement.getAllClients();
    for(let user of users){
      expect(user).to.have.property('id');
      expect(user).to.have.property('fname');
      expect(user).to.have.property('lname');
      expect(user).to.have.property('email');
      expect(user).to.have.property('id');
      expect(user).to.have.property('address');
      expect(user).to.have.property('phone');
    }
  });

});

