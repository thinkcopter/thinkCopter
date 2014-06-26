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
dronestream.listen(server, { ip: droneIP });
server.listen(port, function (){
  console.log('server is running on ' + port);
});
/*
var stream = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/public/index.html").pipe(res);
});
server.listen();
*/

var launch = function () {
  myDrone.takeoff();
}
var land = function () {
  myDrone.stop();
  myDrone.land();
}
var rotate = function () {
  myDrone.counterClockwise(1);
  myDrone.after(1000, function () {
    this.stop();
  });
}
var flip = function () {
  myDrone.animate('flipLeft', 1000);
}
var stop = function () {
  myDrone.stop();
}

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

   //emit attention to index.html
   socket.emit('gaugeUpdate', brainData.attention)

   console.log(brainData);
   var att = brainData.attention;
   var launched = 0;
if(launched=0 && att > 30){
      launch();
      launched=1;
      console.log('launching');
}
else if (launched = 1){
  if (att < 30){
      land();
      launched=0;
      myDrone.currentState = "land"
      console.log("Landing");
  } else if ( att > 30 && att < 50){
      launch();
      myDrone.currentState = "hover"
      console.log("Launching");
  } else if (att > 50 && att < 100){
    rotate();
    console.log('<<<<<<<<<<<<<<<<<<<<<<  Rotating');
  } else if (att > 80){
    flip();
    stop();
    land();
    console.log('<<<<<<<<<<<<<<  flipLeft');
  }
}
});

  socket.on('launch', function() {
   launch();
 });

  socket.on('land', function() {
    land();
  });

  socket.on("recover", function() {
    myDrone.disableEmergency();
  });

  socket.on('rotate', function () {
    rotate();
  });
  socket.on('stop', function () {
    stop();
  }

});
