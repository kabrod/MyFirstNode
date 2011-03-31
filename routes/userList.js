
//require('../models/db');

// USER LIST - users.jade

exports.mount = function(app, mountPath) {

	var mongoose = require('mongoose');

	var users = [
		{name: 'bob', email: 'bob@gag.no'},
		{name: 'sue', email: 'sue@gag.no'},
		{name: 'al', email: 'al@gag.no'}
	]

	app.get(mountPath, function(req, res) {
		res.render('user/users', {
			title: 'Users',
			users: users
		});
	});
}
