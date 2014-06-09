var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8080);

var server = http.createServer(app)
server.listen(app.get('port'), function (){
  console.log('server is running on ' + app.get('port'));
});
