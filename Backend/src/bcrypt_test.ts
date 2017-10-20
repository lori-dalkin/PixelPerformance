// test bcrypt
var bcrypt = require('bcrypt');

bcrypt.hash('1', 10, function(err, hash) {
  if (hash) {
  	console.log(hash);
  } else {
  	console.log(err);
  }
});