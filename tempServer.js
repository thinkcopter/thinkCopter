var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
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

var userObject = {
  attention : 0,
  currentState : "land",
  drone : {},
  setAttention : function(att){
/*    console.log("Attention is ", att);
    if ( att > 50 && userObject.currentState == "land"){
      userObject.drone.takeoff();
      userObject.currentState = "hover";
      console.log("Start");
    }
    else if (att < 50 && userObject.currentState == "hover"){
      userObject.drone.stop();
      userObject.drone.land();
      userObject.currentState = "land";
      console.log("Stop");
    }
  },*/

    if (att < 30 && userObject.currentState == "hover"){
      userObject.drone.stop();
      userObject.drone.land();
      userObject.currentState = "land";
      console.log("Stop Edit");
    } else if ( att > 30 && userObject.currentState == "land"){
      userObject.drone.takeoff();
      userObject.currentState = "hover";
      console.log("Start Edit");
    }
  },
  init : function(){
    console.log("Initializing Droooooooone");
    userObject.drone = arDrone.createClient('192.168.1.1');
  },
  badSignal : function(){
    if (userObject.currentState == "hover"){
      userObject.drone.stop();
      userObject.drone.land();
    }
  }

};
//droneConnect();

controller();
function controller(){

  userObject.init();

    //console.log(data);

    if( brainData.attention > 30){
      console.log("Setting attention?");
      userObject.setAttention(brainData.attention);
    }

    if (typeof data.poorSignalLevel === "number" && data.poorSignalLevel !== 0){
      console.log("Poor signal level : ", data.poorSignalLevel);
      if (data.poorSignalLevel == 200){
        userObject.badSignal();
      }
    } else {
      userObject.setAttention(brainData.attention);
    }

};

function droneConnect(){
  console.log("entering drone connect");
  var arDrone = require('ar-drone');
  console.log("drone loaded, connecting to client");
  var client = arDrone.createClient('192.168.1.1');
  console.log("Client connected");

  client.takeoff();
  console.log("Takeoff");

  client.after(300, function() {
    console.log("Landing");
      this.stop();
      this.land();
    });

}

});
