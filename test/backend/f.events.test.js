"use strict";

var test    = require("tape");
var request = require("supertest");
var server  = require("./startServer.js");

var sails;

test('"Events" connection: ', function (t) {

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