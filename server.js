var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

http.listen(PORT,function(){
	console.log('Server started at port: ' + PORT + '!');
});