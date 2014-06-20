var express = require('express');
var app = express();
var http = require('http');

app.use(express.static(__dirname + '/public'));

var port = 80;
var server = http.Server(app)
server.listen(port, function (){
  console.log('server is running on ' + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('user connected');
  socket.emit('connected', {});

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('brainData', function(data) {
    console.log(data);
  });

});
