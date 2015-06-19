"use strict";


var test              = require("tape");
var moment            = require("moment");
var isSubscriptionDue = require("./../../assets/js/vdom/services/isSubscriptionDue.js");
var helpers           = require("../helpers/createMocks.js");

test("Is subscription due: ", function (t) {

	t.test("check", function (st) {

		var state = {
			member: {
				due_date: "12/12"
			},
			payments: [
				{
					date: new Date("12/12/2012"),
					type: "subscription"
				}
			]
		};

		st.end();
	});
});