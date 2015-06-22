"use strict";


var nuclear = require("../nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = Events;


var route;


function Events (initialState) {

	initialState = initialState || {};

	var state = nuclear.observS({
		route:  nuclear.observ(""),
		events: nuclear.observA(initialState)
	});

	route = nuclear.router(state);

	return state;
}


Events.render = function (state) {

	return (
		h("div", [
			route("/",         homeEvents)
		])
	);
};

function homeEvents (state) {

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
						"background-image": "url('" + elm.photo_url  + "')"
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
					onclick: function () {
						window.location = "/event_info/" + elm.id;
					}
				}, "Book a place")
			])
		]);
	});
}