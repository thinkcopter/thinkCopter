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

  $('#recover').click(function(){
    console.log('in recover');
    socket.emit('recover');
  });

});

