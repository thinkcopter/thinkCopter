var io = require('socket.io-client');
var $ = require('jquery');
var socket = io.connect("http://thinkcopter.com");
$(document).ready(function(){

  $('#launch').click(function() {
    console.log('in launch');
    socket.emit('launch');
  });

  $('#land').click(function(){
    console.log('in land');
    socket.emit('land');
  });

  $('#rotate').click(function(){
    console.log('in rotate');
    socket.emit('rotate');
  });

  $('#recover').click(function(){
    console.log('in recover');
    socket.emit('recover');
  });

  $('#stop').click(function(){
    console.log('in stop');
    socket.emit('stop');
    });

  socket.on('gaugeUpdate', function(data){
  console.log('gaugeUpdate: attention is now ' + data);
  });

});

