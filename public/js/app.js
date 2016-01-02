var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server');
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message: ' + message.text);
	$('.messages').append('<p>'+ message.text +' <small class="float-right">'+ momentTimestamp.local().format('h:mma') +'</small></p>');
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