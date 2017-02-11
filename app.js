var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser');
server.listen(process.env.PORT || 3000);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
global.MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/valentine_app';
var Gift = require('./gift');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/gift', function(req, res){
  var gift_details = {
    name: req.body.name,
    lat: req.body.lat,
    lng: req.body.lng,
    pic: req.body.pic
  };

  Gift.create(gift_details)
      .then(function(result){
	refreshGifts();
	var message = "Successfully created your gift";
	res.redirect('/?message=' + message);
      })
      .catch(function(error){
	var message = "Failed to create gift: " + error;
	console.error(message);
	res.redirect('/?message=' + message);
      });
});

io.on('connection', function (socket) {
  refreshGifts();
});


var refreshGifts = function(){
  Gift.all()
      .then(function(gifts_array){
	io.sockets.emit('gifts', gifts_array);
      })
      .catch(function(error){
	console.error(error);
      });
};
