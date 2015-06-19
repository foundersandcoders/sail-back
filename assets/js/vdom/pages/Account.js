"use strict";


var nuclear = require("../nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = Account;


var route;


function Account (member) {

	member          = member || {payments: []};
	member.payments = member.payments || [];

	var state = nuclear.observS({
		route:    nuclear.observ(""),
		member:   nuclear.observS(member),
		payments: nuclear.observ(member.payments),
		donation: nuclear.observ("")
	});

	route = nuclear.router(state);

	return state;
}

Account.render = function (state) {

	return (
		h("div.main-container", [

			route("/",        homePageAccount),
			route("/payment", paymentPage),
			route("/online",  onlinePayment)

		])
	);

	function homePageAccount (state) {

		return ([
			h("div.inner-section-divider-small"),
			h("div.container-small", [
				h("div.inner-section-divider-small"),
				renderPayments(state),
				h("div.inner-section-divider-medium"),
				refundRender(state),
				h("div.inner-section-divider-medium"),
				expireAnnualSubscription(state),
				h("div.inner-section-divider-medium"),
				renderDonation(state)
			])
		])
	}

	function paymentPage (state) {

		return (
			h("div.main-container", [
				h("div.inner-section-divider-small"),
				h("div.section-label", [
					h("h1", "Payment method")
				]),
				h("div.container-small", [

					h("div.inner-section-divider-medium"),

					h("button.btn-primary", {
						onclick: function () {
							window.location.hash = "online";
						}
					}, "Credit Card"),

					h("div.inner-section-divider-small"),

					h("button.btn-primary", {
						onclick: function () {
							window.location.hash = "online";
						}
					}, "PayPal"),

					h("div.inner-section-divider-small"),

					h("button.btn-primary", {
						onclick: function () {
							// return state.panel.set("gimmeMoney")
						}
					}, "Bank transfer"),

					h("div.inner-section-divider-small"),

					h("button.btn-primary", {
						onclick: function () {
							// return state.panel.set("gimmeMoney")
						}
					}, "Cheque")
				])
			])
		);
	}

	function onlinePayment (state) {

		return (
			h("form#checkout", {
				method: "POST",
				action: "/paypal_payment"
			}, [
				h("div#payment-form"),
				h("input", {
					disabled: true,
					value: state().balanceDue,
					name: "amount"
				}),
				h("input#braintree-pay.disabled", {
					type: "submit",
					value: "Pay",
					disabled: true
				})
			])
		);
	}
};

function renderDonation (state) {

	var donationAmount;

	return ([
		h("div.input-label-container", [
			h("h3", "Donation")
		]),
		h("div.block", [
			h("input.align-one", {
				type: "text",
				placeholder: "Amount",
				onchange: function () {
					donationAmount = this.value;
				}
			}, "Yes please"),
			h("button.btn-primary.align-two", {
				onclick: function () {

					state.donation.set(donationAmount);
					window.location.hash = "payment";
				}
			}, "Add")
		])
	]);
}

function renderPayments (state) {

	return (
		h("div.table-payments", [
			h("div.header", [
				h("div.item-one", [
					h("p.meta", "Date")
				]),
				h("div.item", [
					h("p.meta", "Description")
				]),
				h("div.item-one", [
					h("p.meta", "Charge")
				]),
				h("div.item-two", [
					h("p.meta", "Due")
				])
			]),
			h("div.body", [
				renderRows(state)
			])
		])
	);
}

function renderRows (state) {

	var payments = utils.dateConverter(utils.balanceDue(state.payments()));

	return payments.map(function (elm, index) {

		return (
			h("div.row", [
				h("div.item-one", [
					h("p.micro", elm.date)
				]),
				h("div.item", [
					h("p.micro", elm.description)
				]),
				h("div.item-one", [
					h("p.micro", String(elm.amount))
				]),
				h("div.item-two", [
					h("p.micro", String(elm.balanceDue))
				])
			])
		);
	});
}

function expireAnnualSubscription (state) {

	if(isSubscriptionDue(state())) {

		return (
			h("div", [
				h("div.input-label-container", [
					h("h3", "Subscription")
				]),
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

	function isSubscriptionDue (state) {

		return false;
	}
}

function refundRender (state) {


	if (getLastMovement(state)) {

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


	function getLastMovement (state) {

		if(
			state.payments() && 
			state.payments().length > 0 && 
			state.payments()[state.payments().length - 1] &&
			Number(state.payments()[state.payments().length - 1].balanceDue) < 0
		) {
			return true;
		} else {
			return false;
		}
	}
}