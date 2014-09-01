var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var arDrone = require('ar-drone');
//var droneIP = '184.78.238.165';
//var droneIP = '73.162.173.191';
var dronestream = require("dronestream");
var myDrone = null;
app.use(express.static(__dirname + '/public'));

console.log(arDrone);
//var myDrone = arDrone.createClient(droneIP);
//console.log(myDrone);

//myDrone.disableEmergency();
//myDrone._udpNavdatasStream._ip = droneIP;
//myDrone._udpControl._ip = droneIP;

var launched = 0;

var port = 80;
var server = http.Server(app);
server.listen(port, function (){
  console.log('server is running on ' + port);
});

var stream = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/public/index.html").pipe(res);
});
//dronestream.listen(server, { ip: droneIP });

//dronestream.listen(server);
server.listen();

var stop = function () {
  myDrone.stop();
}
var launch = function () {
  myDrone.takeoff();
  launched = 1;
}
var land = function () {
  myDrone.stop();
  myDrone.land();
  launched = 0;
}
var rotate = function () {
  myDrone.counterClockwise(1);
  myDrone.after(1000, function () {
    this.stop();
  });
}
var right = function() {
  myDrone.right(.1);
  myDrone.after(100, function(){
     this.stop();
  });
}
var left = function() {
  myDrone.left(.1);
  myDrone.after(100, function(){
     this.stop();
  });
}

var forward = function() {
  myDrone.front(.1);
  myDrone.after(100, function(){
     this.stop();
  });
}

var back = function(){
  myDrone.back(.1);
  myDrone.after(100,function(){
     this.stop();
  });
}

var flip = function () {
  myDrone.animate('flipLeft', 1000);
  myDrone.after(1000, function () {
    this.stop();
    this.land();
  });
}

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('user connected');
  socket.emit('connected', {});
  
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  
  socket.on('connect-drone', function(data){
    console.log('data from server: '+data);
    if(data === 'oakland'){
        droneIP = '73.162.173.191';
    } else if(data === 'seattle'){
        droneIP ='184.78.238.165' ;
    }
    // dronestream.listen(server);
     console.log('droneIP: '+droneIP);
     dronestream.listen(server, { ip: droneIP });
     myDrone = arDrone.createClient(droneIP);
     myDrone.disableEmergency();
     myDrone._udpNavdatasStream._ip = droneIP;
     myDrone._udpControl._ip = droneIP;
     console.log('in connect-drone');
     socket.emit(console.log('connect-drone command received'));
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
   socket.broadcast.emit('brainData', brainData);

   console.log(brainData);
   var att = brainData.attention;

       if (brainData.poorSignalValue === 0){
          if(launched === 0 && att >= 50){
             launch();
             launched=1;
              console.log('launching');
          } else if (launched === 1){
                  if ( att <  50 ){
                      land();
                      launched=0;
                      myDrone.currentState = "land";
                      console.log("Landing");
                   }
         }
      } else {
         land();
         myDrone.currentState = "land";
         };

  });

  socket.on('launch', function() {
    launch();
    launched = 1;
  });

  socket.on('land', function() {
    land();
    launched = 0;
  });

  socket.on('recover', function() {
    myDrone.disableEmergency();
  });

  socket.on('rotate', function () {
    rotate();
  });
  socket.on('stop', function () {
    stop();
  });
  socket.on('right', function(){
    right();
  });
  socket.on('left', function(){
    left();
  });
  socket.on('forward',function(){
    forward();
  });
  socket.on('back',function(){
    back();
  });


  });
