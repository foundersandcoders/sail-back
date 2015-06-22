"use strict";


var lazy   = require("lazy.js");
var moment = require("moment");

module.exports = converter;


function converter (payments) {

	return lazy(payments).map(function (elm) {

		elm.date = moment(new Date(elm.date)).format("DD MMM YY");
		return elm;
	}).toArray();
}