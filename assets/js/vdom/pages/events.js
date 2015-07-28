"use strict";

var nuclear = require("nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");

module.exports = {
	// Events:    Events,
	home:      homeEvents,
	eventInfo: showDetails,
	booking:   renderBooking
};

// var route;

// function Events (initialState) {

// 	initialState   = initialState            || {};
// 	var memberInfo = initialState.memberInfo || {};
// 	var events     = initialState.events     || {};

// 	var state = nuclear.observS({
// 		route:      nuclear.observ(""),
// 		events:     nuclear.observA(events),
// 		memberInfo: nuclear.observS(memberInfo),
// 		guest:      nuclear.observ(""),
// 		member:     nuclear.observ(""),
// 		total:      nuclear.observ(""),
// 		channels: {
// 			createCharge: createCharge
// 		}
// 	});

// 	route = nuclear.router(state);

// 	return state;
// }

function totalPrice (state, eventInfo) {

	var pricePerMember = eventInfo.price_per_member;
	var pricePerGuest  = eventInfo.price_per_guest;
	var totalMember    = pricePerMember * +state.booking.memberNum;
	var totalGuest     = pricePerGuest  * +state.booking.guestNum;
	var total          = totalMember    + +totalGuest;

	console.log('TOTAL: ', total, eventInfo.price_per_member, state.booking.memberNum);

	return total;
}

// Events.render = function (state) {

// 	return (
// 		h("div", [
// 			route("/",                  homeEvents),
// 			route("/event/:id",         showDetails),
// 			route("/event/:id/booking", renderBooking)
// 		])
// 	);
// };

function homeEvents (state) {

	// console.log('EVENTS');

	return (
		h("div.main-container", [
			h("div.section-label", [
				h("h1", "Events")
			]),
			h("div.container-small", [
				renderEventList(state)
			])
		])
	);
}

function renderEventList (state) {

	var events = utils.processEvents(state.events());

	return events.map(function (elm) {

		return ([
			h("div.inner-section-divider-medium"),
			h("div.event", [
				h("divinput-label-container.parent-float", [
					h("h3.left", elm.title)
				]),
				h("div.image", {
					style: {
						"background-image": "url(" + elm.photo_url  + ")"
					}
				}),
				h("p.description", elm.short_description),
				h("div.single-event-info", [
					h("div.item", [
						h("p", elm.date)
					]),
					h("div.status", [
						h("p", elm.reference)
					])
				]),
				h("button.button-two.full-width.positive", {
					onclick: state.channels.redirectTo.bind(this, state, "/event/" + elm.id)
				}, "View details")
			])
		]);
	});
}

function showDetails (state, params) {

	var eventInfo = state.events()[state.events().map(function (elm) { return elm.id.toString()}).indexOf(params.params)];

	eventInfo = utils.processEvents([eventInfo])[0];

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
				h("p.description", eventInfo.title),
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
				bookOrSignUp(state, eventInfo)
			])
		])
	);
}

function bookOrSignUp (state, eventInfo) {

	if(state.member().id) {
		return (
			h("button.button-two.full-width.positive", {
				onclick: state.channels.redirectTo.bind(this, state, "/event/" + eventInfo.id + "/booking")
			}, "Book a place")
		);
	} else {
		return (
			h("button.button-two.full-width.positive", {
				onclick: state.channels.redirectTo.bind(this, state, "/signup")
			}, "Signup to book")
		);
	}
}

function renderBooking (state, params) {

	var eventInfo = state.events()[state.events().map(function (elm) { return elm.id.toString() }).indexOf(params.params)];

	eventInfo = utils.processEvents([eventInfo])[0];

	return (
		h("div.main-container", [
			h("div.section-label", [
				h("h1", eventInfo.title)
			]),
			h("div.container-small", [
				h("div.inner-section-divider-small"),
				h("div.input-label-container.parent-float", [
					h("h3.left.special", "Member numbers"),
					h("select#member-number.select-signup.float-right", {
						onchange: function () {
							var ciao = this.value;
							console.log('TRIGGER 1', '5', ciao);
							return state.booking.memberNum.set(this.value);
						}
					}, renderOptionNumber(10, state.booking.memberNum()))
				]),
				h("div.inner-section-divider-small"),
				h("div.input-label-container.parent-float", [
					h("h3.left.special", "Guest numbers"),
					h("select#guest-number.select-signup.float-right", {
						onchange: function () {
							console.log('TRIGGER 2', '5');
							return state.booking.guestNum.set(this.value);
						}
					}, renderOptionNumber(eventInfo.max_number_of_guests, state.booking.guestNum()))
				]),
				h("div.inner-section-divider-small"),
				h("textarea#members-names.name-events", {
					placeholder: "Please insert member and guest names",
					onchange: function () {

					}
				}),
				h("div.inner-section-divider-small"),
				h("div.input-label-container.parent-float", [
					h("h3.left.special", "Total"),
					h("h3.right.special", ("£ " + String(totalPrice(state(), eventInfo))))
				]),
				h("div.line"),
				h("div.inner-section-divider-medium"),
				h("button.button-two.full-width.positive", {
					onclick: state.channels.createCharge.bind(null, state, totalPrice(state(), eventInfo), eventInfo)
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