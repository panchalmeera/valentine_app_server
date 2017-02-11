var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 

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
    return new Promise(function(resolve, reject){
      MongoClient.connect(MONGO_URI, function (err, db) {
	if (err) reject(err);

	db.collection('gifts').update({_id: ObjectID(id)}, {$inc: {upvotes: 1}}, function (err, result) {
	  if (err) reject(err);

	  console.log(result);
	  resolve(result);
	});
      });
    }); //end promise    
  }
  
};


module.exports = Gift;
