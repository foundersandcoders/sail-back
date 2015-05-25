"use strict";

var h = require("virtual-dom/h");

module.exports = function (fn) {

	return h("div.search-component", [
		h("div.search-container", [
			h("select#member-status", [
				h("option", {
					value: "active",
					selected: true
				}, "Active"),
				h("option", {
					value: "deleted"
				}, "Deleted")
			]),
			h("input.input-member#search-field-id",       {placeholder: "Membership number"}),
			h("input.input-member#search-field-email",    {placeholder: "Email address"}),
			h("input.input-member#search-field-lastName", {placeholder: "Surname"}),
			h("button.button-two.member#search-button", {
				onclick: fn
			}, "Search")
		])
	]);
};