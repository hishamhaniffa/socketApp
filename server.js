var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', function(){
	console.log('New user connected');
});

http.listen(PORT,function(){
	console.log('Server started at port: ' + PORT + '!');
});