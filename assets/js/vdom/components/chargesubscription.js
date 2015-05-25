"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils, state) {

	var that = {};

	that.render = function () {

		return module.exports.view(that.postData);
	};

	that.postData = function (type) {

		return function () {

			var payload = {
				date: 		 utils.moment(),
				memberId:    document.querySelector("#member-id").textContent,
       			collection:  "charges"
			};

			var value = document.querySelector("#member-controls-subscription-amount").value;

			payload.total       = (type === "charge") ? value          : String(0 - Number(value));
			payload.description = (type === "charge") ? "Subscription" : "Subscription refund";

			utils.request({
				method: "POST",
				url: "/api/charges",
				json: payload
			}, function (e, h, b) {

				var payments = state.payments();
				payments.unshift(b);
				state.payments.set(payments);
			});
		}
	};

	return that;
};


module.exports.view = function (fn) {

	return h("div.container-1", [
		h("div.title-ctrl", [
			h("p", "Pay subscription"),
		]),
		h("div.body-ctrl", [
			h("div.gbp", [
				h("input.input-three#member-controls-subscription-amount", {
					placeholder: "Amount"
				})
			]),
		]),
		h("div.container-2", [
			h("button.button-two.left#member-controls-subscription-pay", {
				onclick: fn("charge")
			}, "Pay"),
			h("button.button-two.right#member-controls-subscription-refund", {
				onclick: fn("refund")
			}, "Refund")
		])
	])
};