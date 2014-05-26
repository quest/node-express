var express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser');
    // path = require('path');

var app = express();

app.use(bodyParser());

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

// HOME
app.get('/', function(request, response) {
	response
    .render('index', {
        title: 'Hello World',
        subtitle: 'My new World!'
    });
});


// GET
//app.get('/profile/:userName', function(request, response) {
//    var name = request.params.userName;
//    response.send('Perfil de ' + name + '.');
//});


// POST
app.post('/profiles', function(request, response) { 
    var username = request.body.username;
    response.send('Perfil: ' + username + '');
});


// Regular expressions
app.get(/\/profile\/(\d*)\/?(edit)?/, function (request, response) {
    var message = 'Profile #' + request.params[0];
    
    if (request.params[1] === 'edit') {
        message = 'Editing ' + message;
    } 
    else {
        message = 'Showing ' + message;
    }
 
    response.send(message);
});


http
	.createServer(app)
	.listen(app.get('port'), function() {
  		console.log('Express escuchando el puerto ' + app.get('port'));
	});