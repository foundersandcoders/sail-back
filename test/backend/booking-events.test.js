"use strict";

var test    = require("tape");
var request = require("supertest");
var server  = require("./startServer.js");
var mocks   = require("../helpers/createMocks.js");

var sails;
var Cookies;
var MEMBER;

var mockMember = mocks.member();

var mockEvent = mocks.eventItem();

test("Start server: ", function (t) {

	server(function (err, serverStarted) {

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

	Members
	.create(mockMember)
	.exec(function (error, item){

		if(error) {
			console.log("ERROR: ", error);
			return t.end();
		}

		Events
		.create(mockEvent)
		.exec(function (errorEvent, itemEvent) {

			if(errorEvent) {
				console.log("ERROR: ", errorEvent);
				return t.end();
			}

			t.ok(item, "mocks created");
			t.end();
		});
	});
});


test("Sign in and get cookies", function (t) {

	request(sails.hooks.http.app)
	.post("/signin")
	.send({username: "tester@super.bes", password: "cnvo2hh89h"})
	.end(function (err, res) {

		Cookies = res.headers['set-cookie'].pop().split(';')[0];
		t.equals(res.statusCode, 302, "redirected");
		t.end();
	});
});

test("Book an event", function (t) {

	var bookObj = {
		eventItem: mockEvent,
		member: "4",
		guest: "1",
		total: "100"
	};

	bookObj.eventItem.id = 1;

	var req = request(sails.hooks.http.app).post("/book_event");
	req.cookies = Cookies;

	req
	.set('test-mode', 'testing')
	.send(bookObj)
	.end(function (err, res) {

		if(err) {
			console.log("ERROR: ", err);
			return t.end();
		}

		t.equals(res.statusCode, 200, "status code 200");

		Members
		.findOne(9999)
		.populate("events_booked")
		.populate("payments")
		.exec(function (errMember, itemMember) {

			if(errMember) {
				console.log("ERROR: ", errMember);
				return t.end();
			}

			// console.log("MEMBER: ", itemMember);

			t.ok(itemMember.events_booked[0].id, "event booked");
			t.ok(itemMember.payments[0].id, "charge made");
			t.equals(itemMember.payments[0].description, 'Event "Dinner at Bes"');

			Events
			.findOne(1)
			.populate("booking_records")
			.exec(function (errEvent, itemEvent) {

				if(errEvent) {
					console.log("ERROR: ", errEvent);
					return t.end();
				}

				t.equals(itemEvent.booking_records.length, 2, "booking record created");
				t.end();
			});
		});
	});
});


// test("Check in 'myEvents'", function (t) {

// 	var req = request(sails.hooks.http.app).get("/api/my_events");
// 	req.cookies = Cookies;

// 	req.end(function (err, res) {

// 		if (err) {
// 			console.log("ERROR: ", err);
// 			return t.end();
// 		}

// 		t.ok(res.body[0], "event attached");
// 		t.end();
// 	});
// });

// test("Delete items: ", function t (assert) {

// 	Members.query("DROP TABLE members;", function (err1, item1) {

// 		Events.query("DROP TABLE events;", function (err2, item2) {

// 			MembershipTypes.query("DROP TABLE membershiptypes;", function (err3, item3) {

// 				PaymentTypes.query("DROP TABLE paymenttypes;", function (err4, item4) {

// 					References.query("DROP TABLE references;", function (err5, item5) {

// 						console.log(arguments);
// 						assert.end();
// 					});
// 				});
// 			});
// 		});
// 	});
// });

test("Low server: ", function (t) {

	t.ok("ok", "exit!");
	t.end();
	process.exit(0);
});