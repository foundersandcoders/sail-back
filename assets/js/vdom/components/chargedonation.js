"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils, state) {

	var that = {};

	that.render = function () {

		return module.exports.view(that.postData);
	};

	that.postData = function (query) {

		try {
			var payload = {
				date: 		 utils.moment(),
				memberId:    document.querySelector("#member-id").textContent,
				description: "Donation",
				total:       document.querySelector("#member-controls-donation-amount").value,
				notes:       document.querySelector("#member-controls-donation-notes").value,
				collection:  "charges"
			};
		} catch (e) {
			console.log("Error post donation: ", e);
		}

		utils.request({
			method: "POST",
			url: "/api/charges",
			json: payload
		}, function (e, h, b) {

			var payments = state.payments();
			payments.unshift(b);
			state.payments.set(payments);
		});
	};

	return that;
};

module.exports.view = function (fn) {

	return h("div.container-1", [
		h("p", "Add donation"),
		h("div.gbp", [
			h("input.input-three#member-controls-donation-amount", {
				placeholder: "Amount"
			})
		]),
		h("input.input-four#member-controls-donation-notes", {
			placeholder: "Optional note"
		}),
		h("button.button-two.right.full-width.margin-top-10#member-controls-donation-pay", {
			onclick: fn
		}, "Add")
	]);
};