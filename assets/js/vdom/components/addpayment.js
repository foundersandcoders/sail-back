"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils, state) {

	var $$ = utils.$$;
	var that = {};

	that.render = function () {

		return module.exports.view(that.postData, utils);
	};

	that.postData = function (query) {

		try {
			var payload = {
				memberId:      $$("member-id").text(),
				type:          $$("member-controls-membership-type").valSelect(),
				date:          $$("member-controls-payment-date").value(),
				listReference: $$("member-controls-payment-reference").value(),
				total:         $$("member-controls-payment-amount").value(),
				notes:         $$("member-controls-payment-notes").value(),
        		description:   "Payment by " + $$("member-controls-membership-type").valSelect(),
        		collection:    "payments"
			};
		} catch (e) {
			console.log("addpayment post: ", e);
		}

		utils.request({
			method: "POST",
			url: "/api/payments",
			json: payload
		}, function (e, h, b) {

			var payments = state.payments();
			payments.unshift(b);
			state.payments.set(payments);
		});
	};

	return that;
};

module.exports.view = function (fn, utils) {

	var renderOptionsSelected = require("./helpers").renderOptionsSelected;
	var paymentTypes          = require("./helpers").paymentTypes;

	var inputs = [{
		placeholder: "Payment date",
		id: "payment-date"
	}, {
		placeholder: "Reference",
		id: "payment-reference"
	}, {
		placeholder: "Amount £",
		id: "payment-amount"
	}, {
		placeholder: "Notes",
		id: "payment-notes"
	}];

	return h("div.container-1", [
		h("p", "Enter payments"),
		h("select#member-controls-membership-type.mb10", renderOptionsSelected(paymentTypes, "", "Select type")),
		renderInputs(inputs)
	]);

	function renderInputs (content) {

		var inputs = content.map(function (elm) {

			var cl = (elm.placeholder === "Notes") ? "input-two" : "input-one";

			return h("input." + cl + "#member-controls-" + elm.id, {
				placeholder: elm.placeholder
			});
		});

		return inputs.concat([
			h("div", [
				h("button.button-two", "Close"),
				h("button.button-one#member-controls-payment-enter.right", {
					onclick: fn
				}, "Enter")
			])
		]);
	}
}