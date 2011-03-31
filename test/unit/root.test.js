var app = require('../../app');
var assert = require('assert');
var should = require('should');
var jsdom = require('jsdom');

module.exports = {
	
	'GET /': function(beforeExit) {
	assert.response(app,
		{ url: '/users' },
		{ status: 200 },
		function(res) {
			console.log(res.body);
			//assert.equal('Express testing by KAB', h1);
		});
	}	
}

