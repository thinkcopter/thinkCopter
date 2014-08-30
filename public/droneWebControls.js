var io = require('socket.io-client');
var $ = require('jquery');
var socket = io.connect("http://thinkcopter.com");
$(document).ready(function(){
 
  $('#panic').click(function(){
    console.log('in panic!');
    socket.emit('land');
  }); 
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

  $('#rotate').click(function(){
    console.log('in rotate');
    socket.emit('rotate');
  });

  $('#stop').click(function(){
    console.log('in stop');
    socket.emit('stop');
    });
 
  $('#right').click(function(){
    console.log('in right');
    socket.emit('right');
    });

  $('#left').click(function(){
    console.log('in left');
    socket.emit('left');
    });

  $('#forward').click(function(){
    console.log('in forward');
    socket.emit('forward');
    });

  $('#back').click(function(){
    console.log('in back');
    socket.emit('back');
    });
 
});

