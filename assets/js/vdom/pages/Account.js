"use strict";


var nuclear = require("../nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = Account;


function Account (member) {

	member = member || {payments: []};

	var state = nuclear.observS({
		member:   nuclear.observS(member),
		payments: nuclear.observ(member.payments)
	});

	return state;
}


	// state.member.set();

	// getMemberInfo(function (error, header, body) {

	// 	var member = JSON.parse(body);

	// 	state.member.set(member);
	// 	state.payments.set(member.payments);
	// 	return state;
	// })


function getMemberInfo (callback) {

	nuclear.request({
		method: "GET",
		url: "/api/account"
	}, callback);
}

Account.render = function (state) {

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.container-small", [
				h("div.inner-section-divider-small"),
				renderPayments(state),
				h("div.inner-section-divider-medium"),
				doWeOweMoney(state),
				h("div.inner-section-divider-medium"),
				h("div.input-label-container", [
					h("h3", "Subscription")
				]),
				expireAnnualSubscription(state),
				h("div.inner-section-divider-medium"),
				h("div.input-label-container", [
					h("h3", "Donation")
				]),
				h("div.block", [
					h("input.align-one", {
						type: "text",
						placeholder: "Amount"
					}, "Yes please"),
					h("button.btn-primary.align-two", {
						onclick: function () {

							state.panel.set("paymentMethod");
						}
					}, "Add")
				])
			])
		])
	);
};

function renderPayments (state) {

	return (
		h("div.table-payments", [
			h("div.header", [
				h("div.item", [
					h("p.meta", "Date")
				]),
				h("div.item", [
					h("p.meta", "Description")
				]),
				h("div.item", [
					h("p.meta", "Charge")
				])
			]),
			h("div.body", [
				renderRows(state)
			])
		])
	);
}

function renderRows (state) {

	return state.member().payments.map(function (elm, index) {

		return (
			h("div.row", [
				h("div.item", [
					h("p.micro", "12 Mar 16")
				]),
				h("div.item", [
					h("p.micro", "Subscription")
				]),
				h("div.item", [
					h("p.micro", "£ 20")
				])
			])
		);
	});
}

function expireAnnualSubscription (state) {

	return (
		h("div", [
			h("div.input-label-container", [
				h("h4", "Your annual subscription is due on 12-12-2012 pay it now?")
			]),
			h("div.block", [
				h("button.btn-primary.align-one", {
					onclick: function () {

						state.panel.set("paymentMethod");
					}
				}, "Yes please"),
				h("button.btn-primary.align-two", {
					onclick: function () {

						state.panel.set("paymentMethod");
					}
				},"No thanks")
			])
		])
	);
}

function doWeOweMoney (state) {

	return (
		h("div", [
			h("button.btn-primary", {
				onclick: function () {

					state.panel.set("weDoOweMoney");
				}
			},"Refund options")
		])
	);
}