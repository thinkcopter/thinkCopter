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

  $('#clockwise').click(function(){
    console.log('in clockwise');
    socket.emit('clockwise');
  });

  $('#counterClockwise').click(function(){
    console.log('in counterClockwise');
    socket.emit('counterClockwise');
  });

  $('#recover').click(function(){
    console.log('in recover');
    socket.emit('recover');
  });

    });

