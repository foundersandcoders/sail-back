"use strict";


var nuclear = require("nuclear.js");
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
				renderSignUpOpts(state),
				renderMemberOpts(state),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: state.channels.redirectTo.bind(this, state, "/events")
				}, "Browse events")
			])
		])
	);
};

function renderSignUpOpts (state) {

	if(state.member().id !== undefined) {

		return (
			h("button.btn-primary", {
				onclick: state.channels.redirectTo.bind(this, state, "/account")
			}, "View account")
		);
	} else {
		return ([
			h("button.btn-primary", {
				onclick: state.channels.redirectTo.bind(this, state, "/signin")
			}, "Sign in"),
			h("div.inner-section-divider-small"),
			h("button.btn-primary", {
				onclick: state.channels.redirectTo.bind(this, state, "/signup")
			}, "Sign up")
		]);
	}
}

function renderMemberOpts (state) {

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
		}, "Make a payment"),
		h("div.inner-section-divider-small"),
		h("button#make-payment.btn-primary#testytestytest", {
			onclick: state.channels.redirectTo.bind(this, state, "/events/booked")
		}, "My events")
	]);
}