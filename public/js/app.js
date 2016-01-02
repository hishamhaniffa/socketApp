var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server');
});

socket.on('message', function(message){
	console.log('New message: ' + message.text);
	$('.messages').append('<p>'+ message.text +'</p>');
});

var $form = $('#message-form');

$form.on('submit',function(evt){
	evt.preventDefault();

	var message = $form.find('[name=message]');

	socket.emit('message', {
		text: message.val()
	});

	message.val('');
});