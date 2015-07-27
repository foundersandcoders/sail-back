"use strict";

var test    = require('tape');
var request = require('supertest');
var server  = require('../_bootstrap/startServer.js');

var sails;
var Cookies;
var MEMBER;

test('"Payments" connection: ', function (t) {

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

test("Sign up and get cookies", function (t) {

	var memberMock = {
		primary_email:   "payment@email.com",
		membership_type: "annual-corporate",
		password:        "secret"
	};

	request(sails.hooks.http.app)
	.post("/signup")
	.send(memberMock)
	.end(function (err, res) {

		Cookies = res.headers['set-cookie'].pop().split(';')[0];

		Members
		.findOne({primary_email: memberMock.primary_email})
		.exec(function (error, item) {

			MEMBER = item;


			t.notOk(error, 'no error');
			t.ok(item, 'got member');
			t.end();
		});
	});
});

test("Get account info with cookies", function (t) {

	var req = request(sails.hooks.http.app).get("/api/account");

	// console.log('NEW MEMBER', Cookies);

	req.cookies = Cookies;

	req.end(function (err, res) {

		t.equals(res.statusCode, 200, "got access");
		t.equals(res.body.primary_email, "payment@email.com", "got account info");
		t.end();
	});
});

test("Close to request without a valid session", function (t) {

	var req = request(sails.hooks.http.app).get("/api/account");

	req.end(function (err, res) {

		t.equals(res.statusCode, 404, "got 404");
		t.end();
	});
});

test("Make a payment", function (t) {

	var token;

	t.test("get client token", function (st) {

		var req = request(sails.hooks.http.app).get("/client_token");
		req.cookies = Cookies;
		req.end(function (err, res) {

			t.equals(res.statusCode, 200, "status ok");
			t.ok(res.body.token, "got token");

			token = res.body.token;

			st.end();
		});
	});

	t.test("make payment", function (st) {

		var fakePayment = {
			amount: 20,
			payment_method_nonce: "fake-valid-nonce",
			category: 'payment',
			member: MEMBER.id
		};

		var req     = request(sails.hooks.http.app).post("/paypal_payment");
		req.cookies = Cookies;

		req
		.send(fakePayment)
		.end(function (error, res) {

			st.equals(res.statusCode, 302, "status code 302");

			Members
			.findOne({primary_email: "payment@email.com"})
			.populateAll()
			.exec(function (err, item) {

				// console.log('User populated: ', item);

				var lastPayment = item.payments[item.payments.length - 1];
				t.equals(lastPayment.category, 'payment', "right category");
				t.equals(lastPayment.amount, fakePayment.amount, "right amount");
				st.end();
			});
		});
	});
});