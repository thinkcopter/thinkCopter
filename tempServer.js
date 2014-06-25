var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var arDrone = require('ar-drone');
var droneIP = '184.78.238.165';
var dronestream = require("dronestream")
app.use(express.static(__dirname + '/public'));

console.log(arDrone);
var myDrone = arDrone.createClient(droneIP);
console.log(myDrone);

myDrone.disableEmergency();
myDrone._udpNavdatasStream._ip = droneIP;
myDrone._udpControl._ip = droneIP;


var port = 80;
var server = http.Server(app)
server.listen(port, function (){
  console.log('server is running on ' + port);
});

/*var stream = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/public/index.html").pipe(res);
});

dronestream.listen(stream, { ip: droneIP });
stream.listen(5555);
*/

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('user connected');
  socket.emit('connected', {});

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

var brainData = {};
socket.on('brainData', function(data) {
   var parsed = data.split(',');
   brainData.poorSignalValue = parseInt(parsed[0]);
   brainData.attention = parseInt(parsed[1]);
   brainData.meditation = parseInt(parsed[2]);
   brainData.delta = parseInt(parsed[3]);
   brainData.theta = parseInt(parsed[4]);
   brainData.lowAlpha = parseInt(parsed[5]);
   brainData.highAlpha = parseInt(parsed[6]);
   brainData.lowBeta = parseInt(parsed[7]);
   brainData.highBeta = parseInt(parsed[8]);
   brainData.lowGamma = parseInt(parsed[9]);
   brainData.highGamma = parseInt(parsed[10]);

   console.log(brainData);
});

socket.on('launch', function(){
   launch();
});

socket.on('land', function() {
    land();
});

socket.on("recover", function(){
    myDrone.disableEmergency();
});

var launch = function () {
    myDrone.takeoff();
}
var land = function () {
    myDrone.stop();
    myDrone.land();
}

});
