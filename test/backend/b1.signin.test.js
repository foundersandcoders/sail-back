"use strict";

var test    = require("tape");
var request = require("supertest");
var server  = require("./startServer.js");

var sails;

test('"Sign up" connection: ', function (t) {

	server(function (err, serverStarted) {

		if(err) {
			throw err;
			t.end();
		} else {
			sails = serverStarted;
			t.ok(serverStarted, "..connection ok");
			t.end();
		}
	});
});

test('Signin member: ', function (t) {

	var memberMock = {
		username: 'some@email.com',
		password: 'secret'
	};

	request(sails.hooks.http.app)
	.post('/signin')
	.send(memberMock)
	.end(function (err, res) {

		t.equals(res.statusCode, 302, 'redirect');
		t.equals(res.text, 'Moved Temporarily. Redirecting to /', 'redirect to home page');
		t.end();
	});
});
