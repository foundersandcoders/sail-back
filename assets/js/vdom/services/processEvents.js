"use strict";


var dateConverter = require("./dateConverter.js");


module.exports = processEvents;


function processEvents (events) {

	return dateConverter(events);
}