var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pin = '123456';

console.log(__dirname)

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var port = Number(process.env.PORT || 1212);

app.listen(port, function () {
    console.log("Listening on " + port);
});

// Users array

var users = [
	{
		firstName: 'Paul',
		lastName: 'Chatterton',
		username: 'pablo',
		email: 'paul@gmail.com',
		password: 'devmountain'
	},
	{
		firstName: 'Tyler',
		lastName: 'McGinnis',
		username: 'tyler',
		email: 'tyler@gmail.com',
		password: 'devmountain'
	},
];


// Available API calls

// Login a user
app.post('/loginUser', function(req, res) {
	
	// Response template
	var response = {
		success: false,
		issue: '',
		message: ''
	}

	// Loop through users array to see if username/password match
	for(var i=0; i<users.length; i++) {
		var loginUser = req.body.user
		if(users[i].username === loginUser.username) {
			if(users[i].password === loginUser.password) {
				// Username and Password match
				response.success = true;
				response.message = 'success';
				break;
			} else {
				// Username exists but issue with password
				response.issue = 'password';
				response.message = 'Password is incorrect';
				break;
			}
		} else {
			// Username doesn't exist...didn't check password
			response.issue = 'username';
			response.message = 'Username does not exist.';
			break;
		}
	}

	// Return the response back to 'Angular land'
	res.send(response);
});

// Check to see if the username already exists in the users array
app.post('/signup.verifyUsername', function(req, res) {
	var response = {
		userExist: false
	}
	for(var i=0; i<users.length; i++) {
		if(users[i].username === req.body.username) {
			response.userExist = true;
		}
	}
	res.send(response)
})

app.post('/signup.newUser', function(req, res) {
	users.push(req.body.user)
	res.send({success: true;})
})