var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;

var Gift = {
  create: function(details){
    details["upvotes"] = 0;
    return new Promise(function(resolve, reject){
      MongoClient.connect(MONGO_URI, function (err, db) {
	if (err) reject(err);

	db.collection('gifts').insertOne(details, function(err, result){
	  if (err) reject(err);

	  resolve(result);
	});
      });
    });
  },

  all: function(){
    return new Promise(function(resolve, reject){
      MongoClient.connect(MONGO_URI, function (err, db) {
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
