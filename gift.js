var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;

var Gift = {
  create: function(details){
    return new Promise(function(resolve, reject){
      MongoClient.connect('mongodb://localhost:27017/valentine_app', function (err, db) {
	if (err) reject(err);

	db.collection('gifts').find().toArray(function (err, result) {
	  if (err) reject(err);

	  resolve(result);
	});
      });
    });
  },

  all: function(){
    return new Promise(function(resolve, reject){
      MongoClient.connect('mongodb://localhost:27017/valentine_app', function (err, db) {
	if (err) reject(err);

	db.collection('gifts').find().toArray(function (err, result) {
	  if (err) reject(err);

	  resolve(result);
	});
      });
    }); //end promise
  },

  upvote: function(id){
  }
  
};


module.exports = Gift;
