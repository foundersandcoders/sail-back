"use strict";

var test    = require("tape");
var request = require("supertest");
var Sails   = require("sails");
var helpers = require("./../../api/hooks/create_database_entries/createEntries.js");

var sails;
var Cookies;
var MEMBER;

var mockMember = {
	first_name: 'Tester',
	last_name: 'Super',
	primary_email: 'tester@super.bes',
	activation_status: 'activated',
	privileges: 'admin',
	password: "cnvo2hh89h",
	id: 9999
};

var mockEvent = {
	title: 'Dinner at Bes',
	reference: 'YH77D',
	short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
	photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
	date: new Date(),
	time: '19:00',
	location: 'London',
	host: 'Bes',
	price_per_member: 15,
	price_per_guest: 20,
	max_number_of_guests: 5,
	total_places_available: 20
};

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

		// if (err) {
		// 	console.log("ERROR: ", err);
		// 	return t.end();
		// }

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

			Events
			.findOne(1)
			.populate("booking_records")
			.exec(function (errEvent, itemEvent) {

				if(errEvent) {
					console.log("ERROR: ", errEvent);
					return t.end();
				}

				// console.log("EVENT: ", itemEvent);

				t.end();
			});
		});
	});
});


test("Check in 'myEvents'", function (t) {

	var req = request(sails.hooks.http.app).get("/api/my_events");
	req.cookies = Cookies;

	req.end(function (err, res) {

		if (err) {
			console.log("ERROR: ", err);
			return t.end();
		}

		t.ok(res.body[0], "event attached");
		t.end();
	});
});

test("Low server: ", function (t) {

	t.ok("ok", "exit!")
	t.end();
	process.exit(0);
});