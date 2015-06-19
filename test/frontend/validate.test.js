"use strict";


var test           = require("tape");
var validator      = require("./../../assets/js/vdom/services/validate.js");
var helpers        = require("../helpers/createMocks.js");

test("Validator member: ", function (t) {

	t.test("incomplete member", function (st) {

		var obj = {title: "Mr"};
		validator("member", obj, function (error, value) {

			st.ok(error, "pass error");
			// st.equals(error.details[0].context.key, "initials", "show missing field");
			st.end();
		});
	});
	t.test("complete member", function (st) {

		var obj = helpers.member();
		validator("member", obj, function (error, value) {

			st.notOk(error, "no error");
			st.end();
		});
	});
});