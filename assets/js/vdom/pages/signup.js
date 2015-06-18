"use strict";


var panelViews = require("../components/signup/panels.js");




var nuclear = require("../nuclear.js");
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

function createMember (state, member) {

	utils.validate("member", member, function (error, value) {

		if(error) {
			alert("Error!");
			return;
		} else {
			utils.formPost("/signup", member, "POST");
			return;
			// utils.request({
			// 	method: "POST",
			// 	uri: "/signup",
			// 	json: member
			// }, function (error, header, body) {



			// 	// checking the id is the best way to 
			// 	// know if the body contains a member
			// 	if(!body || body.id !== undefined) {

			// 		state.panel.set("sorryError");
			// 	} else {
					
			// 		state.panel.set("checkEmail");
			// 	}
			// });
		}
	});
}

SignUp.render = function (state) {

	var h = nuclear.h;

	return (
		h("div", [
			panelViews[state.panel()](state)
		])
	);	
};