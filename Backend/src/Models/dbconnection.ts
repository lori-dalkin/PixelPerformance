var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/DBpixelperformance';
const dbc = pgp(connectionString);
export class dbconnection{
	public db;
	constructor(){
		this.db = dbc;
	}
	getDBConnector(): any{
		return this.db;
	}
}
