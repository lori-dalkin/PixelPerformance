import { UserManagement} from '../usermanagement';
import { WebPortal } from '../webportal';
import { dbconnection } from "../Models/dbconnection";
import { expect } from 'chai';
import { Client } from "../Models/client";
import 'mocha';

var db = new dbconnection().getDBConnector();
let userManagement = UserManagement.getInstance();

beforeEach(function (done) {
  setTimeout(function(){
    done();
  }, 500);
});

describe('Getting all clients', () => {

  it('should return a list of all clients', () => {
    
    const users = userManagement.getAllClients();
    
    db.many('SELECT * FROM clients')
    .then(function (data) {
        for(var i=0; i<data.length; i++){
            let client = new Client(data[i].id,data[i].fname,data[i].lname,
            data[i].email, data[i].password, data[i].address, data[i].phone);
            expect(users[i]).to.deep.equal(client);
        }
    });
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

