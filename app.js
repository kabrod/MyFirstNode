// MODULE DEPENDENCIES

var express = require('express');
var messages = require('express-messages');
var app = module.exports = express.createServer();


// CONFIG

var config = require('./config');
app = config.configApp(express, app);


// ROUTES

require('./routes/root').mount(app, '/');
require('./routes/userList').mount(app, '/users');
require('./routes/post').mount(app);


// ONLY LISTEN ON $ node[mon] server.js

if (! module.parent) {
	app.listen(8888);
	console.log("Express server listening on port %d", app.address().port);
}
