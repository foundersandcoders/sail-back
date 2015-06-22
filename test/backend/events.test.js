"use strict";

var test    = require("tape");
var request = require("supertest");
var Sails   = require("sails");
var helpers = require("./../../api/hooks/create_database_entries/createEntries.js");

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

		console.log("HELLO");

		t.ok(items, "mock entries created");
		t.end();
	});
});

test("Get current available events", function (t) {

	request(sails.hooks.http.app)
	.get("/api/current_events")
	.end(function (err, res) {

		// console.log(res.body);

		t.equals(res.statusCode, 200, "got events");
		t.end();
	});
});

test("Get single event info", function (t) {

	request(sails.hooks.http.app)
	.get("/api/event_info/2")
	.end(function (err, res) {

		// console.log(res.body);
		t.equals(res.statusCode, 200, "got event");
		t.end();
	});
});

test("Low server: ", function (t) {

	t.ok("ok", "exit!")
	t.end();
	process.exit(0);
});