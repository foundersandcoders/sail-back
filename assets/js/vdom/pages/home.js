"use strict";


var nuclear = require("../nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = Home;


var route;


function Home (member) {

	member          = member || {payments: []};
	member.payments = member.payments || [];

	var state = nuclear.observS({
		route:    nuclear.observ(""),
		member:   nuclear.observS(member),
		payments: nuclear.observ(member.payments),
		channels: {
			redirectTo: redirectTo
		}
	});

	route = nuclear.router(state);

	return state;
}


function redirectTo (state, path) {

	window.location = path;
}


Home.render = function (state) {

	return (
		h("div.main-container", [
			h("div.container-small", [
				h("div.inner-section-divider-medium"),
				h("button.btn-primary#vieworsignup", {
					onclick: function () {
						if (state.member().id) {
							return state.channels.redirectTo.call(this, state, "account");
						} else {
							return state.channels.redirectTo.call(this, state, "signup");
						}
					}
				}, (state.member().id !== undefined ? "View account" : "Sign up")),
				renderMember(state),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: state.channels.redirectTo.bind(this, state, "/events")
				}, "Browse events"),
			])
		])
	);
};

function renderMember (state) {

	if(state.member().id === undefined) {
		return "";
	}

	return ([
		h("div.inner-section-divider-small"),
		h("button#make-payment.btn-primary#testytestytest", {
			onclick: state.channels.redirectTo.bind(this, state, "account")
		}, "Make donation"),
		h("div.inner-section-divider-small"),
		h("button#make-payment.btn-primary#testytestytest", {
			onclick: state.channels.redirectTo.bind(this, state, "account")
		}, "Make a payment")
	]);
}