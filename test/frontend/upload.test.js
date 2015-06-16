/**
 *	UPLOAD
 *
**/


"use strict";


var test           = require("tape");


var frontEndParser = require("./../../assets/js/vdom/services/parsecsv.js");
var backEndParser  = require("./../../api/services/Upload.js")();


test("Upload parser:", function (t) {

	var mockPayments = "03/01/12;6085;5;0;0;5;0;8 - Standing Order;61201;;";

	var fileObj = {type: "payments", result: mockPayments};

	frontEndParser.parse(fileObj, function (err, array) {

		var first = array[0];

		t.equals(first.member,       "6085",  "right member");
		t.equals(first.subscription, 5,       "right subscription amount");
		t.equals(first.donation,     0,       "right donation amount");
		t.equals(first.events,       0,       "right events amount");
		t.equals(first.amount,       5,       "right total amount");
		t.equals(first.deleted,      false,   "right deleted status");
		t.end();
	});
});

test("Database entries:", function (t) {

	var mockPayments = "03/01/12;6085;5;0;0;5;0;8 - Standing Order;61201;;";

	var fileObj = {type: "payments", result: mockPayments};

	frontEndParser.parse(fileObj, function (err, array) {

		var databaseEntries = backEndParser._generatePayments(array);

		t.equals(databaseEntries.length, 2, "right number of charges and payments created");
		t.end();
	});
});

test("Database entries with multiple charges:", function (t) {

	var mockPayments = "03/01/12;6085;5;5;5;15;0;8 - Standing Order;61201;;\n03/01/12;6085;5;5;5;15;0;8 - Standing Order;61201;;"

	var fileObj = {type: "payments", result: mockPayments};

	frontEndParser.parse(fileObj, function (err, array) {

		var databaseEntries = backEndParser._generatePayments(array);

		t.equals(databaseEntries.length, 8, "right number of charges and payments created");
		t.end();
	});
});