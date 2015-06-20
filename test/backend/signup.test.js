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

test("Create hooks", function (t) {

	helpers(function (error, items) {

		t.ok(items, "mock entries created");
		t.end();
	});
});

test("Signup member: ", function (t) {

	var memberMock = {
		primary_email: "some@email.com",
		membership_type: "annual-corporate",
		password: "secret"
	};

	request(sails.hooks.http.app)
	.post("/signup")
	.send(memberMock)
	.end(function (err, res) {

		t.equals(res.statusCode, 302, "signup with just an email");
		t.end();
	});
});


test("Signup member should create a subscription charge", function (t) {

	var memberMock2 = {
		primary_email: "someone@email.com",
		membership_type: "annual-corporate",
		password: "secret"
	};

	request(sails.hooks.http.app)
	.post("/signup")
	.send(memberMock2)
	.end(function (err, res) {

		t.equals(res.statusCode, 302, "redirect");

		Members
		.findOne({primary_email: memberMock2.primary_email})
		.populateAll()
		.exec(function (error, item) {

			if(error) {
				console.log("ERROR", error);
				t.end();
			} else {
				t.ok(item.payments[0], "charge created");
				t.equals(item.payments[0].amount, 150, "right amount");
				t.equals(item.payments[0].category, "subscription", "right category");
				t.ok(item, "member created");
				t.end();
			}
		});
	});
});

test("If no email is send", function (t) {

	var noEmail = {
		membership_type: "annual-corporate",
		password: "secret"
	};

	request(sails.hooks.http.app)
	.post("/signup")
	.send(noEmail)
	.end(function (err, res) {

		t.equals(res.statusCode, 400, "status code 400");
		t.end();
	});
});

test("If email is already taken", function (t) {

	var emailTaken = {
		primary_email: "someone@email.com",
		membership_type: "annual-corporate",
		password: "secret"
	};

	request(sails.hooks.http.app)
	.post("/signup")
	.send(emailTaken)
	.end(function (err, res) {

		t.equals(res.statusCode, 400, "status code 400");
		t.end();
	});
});

test("Low server: ", function (t) {

	t.ok("ok", "exit!")
	t.end();
	process.exit(0);
});