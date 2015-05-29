"use strict";


var is     = require("torf");
var lazy   = require("lazy.js");
var moment = require("moment");
var h      = require("virtual-dom/h");

var replaceNice = module.exports.replaceNice = function replaceNice (string) {

	return (string || "").replace("-", " ").split(" ").map(function (elm){
		return elm.charAt(0).toUpperCase() + elm.slice(1);
	}).join(" ");
};


/**
 *	Returns last payment (if exists). Checks for the category
 *	of the payment where category === "payment" and sorts by date
 *	getting the most recent one.
 *
 *	@param  {Array}  - array of payment objects
 *	@return {String} - string in the format of "DD MMM YYYY - £ xxx"
 */
var lastSub = module.exports.lastSub = function (payments) {

	if (!is.ok(payments)) {
		return "";
	} else {
		var payment = lazy(payments).filter(function (item) {
			return item.category === "payment";
		}).sortBy(function (item) {
			return item.date;
		}).last();

		return is.ok(payment) ? moment(payment.date).format("DD MMM YYYY") + " - £" + payment.amount : "";
	}
};