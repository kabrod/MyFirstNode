var messages = require('express-messages');


// CONFIGURATION

exports.configApp = function(express, app) {

	// Config
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	// Mount hook
	app.mounted(function(other) {
		console.log('I\'ve been mounted!');
	});

	// Middleware
	app.configure(function() {
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'ROSENBORG!' }));
		app.use(express.compiler({
			src: __dirname + '/public/css',
			enable: ['sass']
		}));
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});

	app.configure('development', function() {
		app.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});

	// Flash message helper provided by express-messages
	app.dynamicHelpers({
		messages: messages,
		base: function() {
			return '/' == app.route ? '' : app.route;
		}
	});

	return app;
};

