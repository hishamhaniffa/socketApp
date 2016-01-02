var socket = io();
var name = getParameterByName('name') || 'Anonymous';
var room = getParameterByName('room') || 'General';

socket.on('connect', function(){
	console.log('Connected to socket.io server');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message: ' + message.text);
	$('.messages').append('<p><strong>'+ message.name + '</strong><br />' + message.text +' <small class="float-right">'+ momentTimestamp.local().format('h:mma') +'</small></p>');

});

var $form = $('#message-form');

$form.on('submit',function(evt){
	evt.preventDefault();

	var message = $form.find('[name=message]');

	socket.emit('message', {
		text: message.val(),
		name: name
	});

	message.val('');
});

$('#room-title').append(' - ' + room);

// special function to parse queryParams
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
}