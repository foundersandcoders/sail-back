/**
 *	UPLOAD
 *
**/


"use strict";


var test       = require("tape");
var balanceDue = require("./../../assets/js/vdom/services/balanceDue.js");
var mocks      = require("./helpers");

test("Create balance due field", function (t) {

	var data = balanceDue(mocks.arrPayments);

	t.equals(data[data.length - 1].balanceDue, "-160", "right balance due");

	t.end();
});