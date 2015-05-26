"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.getData, utils.moment, utils);
	};

	that.getData = function () {

	    var selectStatus = document.querySelector("#member-status");

	    try {
			var query = {
				id:            document.querySelector("#search-field-id").value,
				primary_email: '"' + document.querySelector("#search-field-email").value + '"',
				last_name:     document.querySelector("#search-field-lastName").value + "*",
				status:        selectStatus.options[selectStatus.selectedIndex].value
			};
		} catch (e) {
			console.log("Error with query serach param: ", e);
		}

		utils.request({method: "GET", url: "/api/members?populate=[payments]"}, function (e, h, b) {

			var members = JSON.parse(b);

			// if only one member matches the query jump immediatly in view it
			if(members.length === 1) {
				window.location = "/members/" + members[0].id
			} else {
				state.members.set(members);
			}
		});
	};

	return that;
};

function _createQuery(query) {

	var field, storeString = [];
	for (field in query) {
		if(query.hasOwnProperty(field)){
			storeString.push(field + "=" + query[field]);
		}
	}

	return "?" + storeString.join("&");
}

function _createOptions (query) {

	return {
		method: "GET",
		url: "/api/members" + _createQuery(query)
	}
}