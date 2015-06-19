"use strict";

var test    = require("tape");
var request = require("supertest");
var Sails   = require("sails");
var helpers = require("./helpers.js");

var sails;

test("Start server: ", function (t) {

	Sails.lift({
		log: {
			level: 'error'
		},
		models: {
			connection: 'test',
			migrate: 'drop'
		}
	}, function (err, serverStarted) {

		if(err) {
			throw err;
			t.end();
		} else {
			sails = serverStarted;
			t.ok(serverStarted, "..server started");
			t.end();
		}
	});
});

test("Create member from upload", function (t) {

	var memberMock = {
		id: "123",
		primary_email: "hello@world.com"
	};

	Members
	.create(memberMock)
	.exec(function (error, item) {
		if(error) {
			console.log(error);
			t.end();
		} else {
			t.ok(item, "member created");
			t.end();
		}
	});
});

test("Forgot password with ok member", function (t) {

	request(sails.hooks.http.app)
	.post("/forgotPassword")
	.send({email: "hello@world.com"})
	.end(function (err, res) {

		t.ok(res.body.emailSent, "email sent");
		t.end();
	});
});

test("Forgot password with non existing member", function (t) {

	request(sails.hooks.http.app)
	.post("/forgotPassword")
	.send({email: "non@existing.com"})
	.end(function (err, res) {

		t.equals(res.statusCode, 400, "bad request response");
		t.end();
	});
});

test("Low server: ", function (t) {

	t.ok("ok", "exit!")
	t.end();
	process.exit(0);
});