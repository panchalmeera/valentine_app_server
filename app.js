var http = require('http');
var express = require('express');
var app = express();
var socket_server = http.createServer(app);
var io = require('socket.io')(socket_server);
socket_server.listen(8080);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
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
	res.send(result);
      })
      .catch(function(error){
	res.send(error);
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

app.listen(3000);
