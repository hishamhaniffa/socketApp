var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(path.join(__dirname, '/public')));

var clientInfo = {};

io.on('connection', function(socket){
	console.log('New user connected');

	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment.valueOf()
		});
	});

	socket.on('message', function(message){
		console.log('Message received :' + message.text);

		message.timestamp = moment().valueOf();
		// socket.broadcast.emit('message', message); // to everyone expect owner.
		io.to(clientInfo[socket.id].room).emit('message', message);
	});


	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});

});

http.listen(PORT,function(){
	console.log('Server started at port: ' + PORT + '!');
});