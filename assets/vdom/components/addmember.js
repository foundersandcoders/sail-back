"use strict";


var h = require("virtual-dom/h");

module.exports.index = function (utils, state) {

	var that = {};

	that.render = function () {

		return module.exports.view();
	}
};

module.exports.view = function () {

	// return ([
	// 	h("h1", "New Member Form"),
	// 	h("div.topSectionDividor", [
	// 		h("h2", "1. Profile")
	// 	]),
	// 	h("div.innerSectionContainer", [
	// 		h("div.inner-section-divider-medium", [
	// 			h("h3", "Member id"),
	// 			h("input#add-member-id.short", {type: "text"})
	// 		])
	// 	]),
	// 	h("div.innerSectionContainer", [
	// 		h("div.inner-section-divider-medium", [
	// 			h("h3", "Full name"),
	// 			h("input#add-member-id.short", {type: "text"})
	// 		])
	// 	]),
	// 	h("div.innerSectionContainer", [
	// 		h("div.inner-section-divider-medium", [
	// 			h("input#add-member-initials.short", {})
	// 		])
	// 	])
	// ])
};