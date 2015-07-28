"use strict";

var request = require("xhr");
var $$      = require("./jquery.like.js");

module.exports.request = request;

var createOpts = module.exports.createOpts = function (method, payload) {

	try{
		var id = $$("member-id").text();
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	if(method === "PUT"){
		return {
			method: method,
			url: "/api/members/" + id,
			json: payload
		}
	} else if (method === "GET") {
		return {
			method: method,
			url: "/api/members/" + id,
		}
	}
};
