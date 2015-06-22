"use strict";


var nuclear = require("../nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = EventInfo;


var route;


function EventInfo (initialState) {

	initialState = initialState || {};

	var state = nuclear.observS({
		route:      nuclear.observ(""),
		eventInfo:  nuclear.observS(initialState),
		guest:      nuclear.observ(""),
		member:     nuclear.observ(""),
		total:      nuclear.observ(""),
		channels: {
			createCharge: createCharge
		}
	});

	route = nuclear.router(state);

	return state;
}

function totalPrice (state) {

	var pricePerMember = state.eventInfo().price_per_member;
	var pricePerGuest  = state.eventInfo().price_per_guest;
	var totalMember    = pricePerMember * state.member();
	var totalGuest     = pricePerGuest  * state.guest();
	var total          = totalMember    + totalGuest;

	return ("£ " + total.toString());
}

function createCharge (state, amount) {

	// var charge = {
	// 	category: "charge",
	// 	amount: amount,
	// 	description: state.eventInfo().title + " event."
	// };

	var bookRecord = {
		eventItem: state.eventInfo(),
		member:    state.member(),
		guest:     state.guest()
	};

	nuclear.request({
		method: "POST",
		url: "/book_event",
		json: bookRecord
	}, function (error, header, body) {

		if (error) {
			alert("Could not book")
		} else {
			console.log(body);
		}
	});
}

EventInfo.render = function (state) {

	return (
		h("div", [
			route("/",        renderEventDetails),
			route("/booking", renderBooking)
		])
	);
};


function renderEventDetails (state) {

	var eventInfo = utils.processEvents([state.eventInfo()])[0];

	return (
		h("div.main-container", [
			h("div.section-label", [
				h("h1", eventInfo.title)
			]),
			h("div.container-small", [
				h("div.inner-section-divider-small"),
				h("div.image", {
					style: {
						"background-image": "url('" + eventInfo.photo_url  + "')"
					}
				}),
				h("p.description", eventInfo.short_description),
				h("div.single-event-info", [
					h("div", [
						h("p", "Date: " + eventInfo.date)
					]),
					h("div", [
						h("p", "Time: " + eventInfo.time)
					]),
					h("div", [
						h("p", "Location: " + eventInfo.location)
					]),
					h("div", [
						h("p", "Host: " + eventInfo.host)
					]),
					h("div", [
						h("p", "Price per member: £" + eventInfo.price_per_member)
					]),
					h("div", [
						h("p", "Price per guest: £" + eventInfo.price_per_guest)
					]),
					h("div", [
						h("p", "Reference: " + eventInfo.reference)
					])
				]),
				h("button.button-two.full-width.positive", {
					onclick: function () {
						window.location.hash = "booking";
					}
				}, "Book a place")
			])
		])
	);
}

function renderBooking (state) {

	var eventInfo = utils.processEvents([state.eventInfo()])[0];

	return (
		h("div.main-container", [
			h("div.section-label", [
				h("h1", eventInfo.title)
			]),
			h("div.container-small", [
				h("div.inner-section-divider-small"),
				h("div.input-label-container.parent-float", [
					h("h3.left.special", "Member numbers"),
					h("select.select-signup.float-right", {
						onchange: function () {
							state.member.set(this.value);
						}
					}, renderOptionNumber(10, state.member()))
				]),
				h("div.inner-section-divider-small"),
				h("div.input-label-container.parent-float", [
					h("h3.left.special", "Guest numbers"),
					h("select.select-signup.float-right", {
						onchange: function () {
							state.guest.set(this.value);
						}
					}, renderOptionNumber(eventInfo.max_number_of_guests, state.guest()))
				]),
				h("div.inner-section-divider-small"),
				h("textarea.name-events", {
					placeholder: "Please insert member and guest names"
				}),
				h("div.inner-section-divider-small"),
				h("div.input-label-container.parent-float", [
					h("h3.left.special", "Total"),
					h("h3.right.special", totalPrice(state))
				]),
				h("div.line"),
				h("div.inner-section-divider-medium"),
				h("button.button-two.full-width.positive", {
					onclick: state.channels.createCharge.bind(this, state, totalPrice(state))
				}, "Book")
			])
		])
	);

	function renderOptionNumber (number, selected) {

		selected = selected || "";
		selected.toString();

		var store = [];

		var ii;
		for(ii = 0; ii < number; ii++) {
			var iiToString = String(ii);
			store.push({value: iiToString, description: iiToString});
		}

		return utils.vDomHelpers.renderOptionsSelected(store, selected, "0");
	}
}






















