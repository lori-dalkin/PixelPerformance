import { UserManagement} from '../usermanagement';
import { WebPortal } from '../webportal';
import { dbconnection } from "../Models/dbconnection";
import { expect } from 'chai';
import { Client } from "../Models/client";
import { UnitOfWork } from '../unitofwork';
import 'mocha';

var db = new dbconnection().getDBConnector();
let userManagement = UserManagement.getInstance();
let unitOfWork = UnitOfWork.getInstance();

let testEmail = "test@test.com";

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

describe('Adding a new client', function() {

  this.timeout(5000);

  it('should add a new client', (done) => {

    let body = {
      fname: "Testfirst",
      lname: "Testlast",
      email: testEmail,
      password: "1",
      address: "1",
      phone: "1234567890"
    };

    userManagement.addClient(body);
    unitOfWork.commit();

    let workingMemoryClient = userManagement.getUserByEmail(body.email);

    setTimeout(function() {
      db.one(`SELECT * FROM clients WHERE email='${testEmail}';`)
        .then(function (row) {

          let dbClient = new Client(row.id, row.fname, row.lname, row.email, row.password.trim(/ *$/), row.address, row.phone);

          for (let client of [workingMemoryClient, dbClient]) {
            expect(client).to.have.property('id');
            expect(client).to.have.property('fname');
            expect(client).to.have.property('lname');
            expect(client).to.have.property('email');
            expect(client).to.have.property('id');
            expect(client).to.have.property('address');
            expect(client).to.have.property('phone');
          }

          expect(workingMemoryClient).to.deep.equal(dbClient);

          done();
        })
        .catch(function (err) {
          done(err);
        });
    }, 500);

  });

});

describe('Deleting a client', function() {

  this.timeout(5000);

  it('should delete a client', function(done) {

    let user = userManagement.getUserByEmail(testEmail);

    expect(userManagement.deleteClient(user.getId())).to.equal(true);

    setTimeout(function() {
      expect(userManagement.getUserById.bind(userManagement, user.getId())).to.throw();
      db.one(`SELECT count(*) FROM clients WHERE email='${testEmail}';`)
        .then(function (row) {
          expect(row.count).to.equal('0');
          done();
        })
        .catch(function (err) {
          done(err);
        })
    }, 1000);

  });

});
