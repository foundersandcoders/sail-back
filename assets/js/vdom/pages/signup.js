"use strict";


var panelViews = require("../components/signup/panels.js");
var nuclear = require("nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");


module.exports = SignUp;


function SignUp () {

	return nuclear.observS({
		member: nuclear.observS({}),
		panel:  nuclear.observ("one"),
		channels: {
			createMember: createMember
		}
	});
}

SignUp.render = function (state) {

	return (
		h("div", [
			panelViews[state.panel()](state)
		])
	);	
};