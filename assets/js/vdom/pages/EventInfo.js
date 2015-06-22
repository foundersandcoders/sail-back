"use strict";


var nuclear = require("../nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = EventInfo;


var route;


function EventInfo (initialState) {

	initialState = initialState || {};

	var state = nuclear.observS({
		route:     nuclear.observ(""),
		eventInfo: nuclear.observS(initialState)
	});

	route = nuclear.router(state);

	return state;
}


EventInfo.render = function (state) {

	return (
		h("div", [
			route("/", renderEventDetails),
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
						window.location.hash = "1";
					}
				}, "Book a place")
			])
		])
	);
}