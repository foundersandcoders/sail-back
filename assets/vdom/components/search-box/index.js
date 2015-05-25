"use strict";


var view  = require("./view");


module.exports = function (utils, state) {

	var that = {};

	that.render = function () {

		return view(that.getData, utils.moment);
	};

	that.getData = function () {

	    var selectStatus = document.querySelector("#member-status");

	    try {
			var query = {
				id:       document.querySelector("#search-field-id").value,
				email1:   '"' + document.querySelector("#search-field-email").value + '"',
				lastName: document.querySelector("#search-field-lastName").value + "*",
				status:   selectStatus.options[selectStatus.selectedIndex].value
			};
		} catch (e) {
			console.log("Error with query serach param: ", e);
		}

		utils.request(_createOptions(utils.clean.object(query)), function (e, h, b) {

			var members = JSON.parse(b);

			if(checkQuery(query, JSON.parse(b))) {
				window.location = "/members/" + members[0].id
			} else {

				members.forEach(function (member, i) {

					return getPayments(member, utils.request, function (mostRecent) {

						if (mostRecent) {
							member.lastSubscription = mostRecent;
						}

						if (i >= members.length - 1) {
							state.members.set(members);
						}
					});
				});
			}
		});
	};

	return that;
};

function getPayments (member, request, cb) {

	var opts = {
		method: "GET",
		url: "/api/payments?memberId=" + member.id
	};

	request(opts, function (error, header, body) {

		var payments = JSON.parse(body);
		if (payments.length > 0) {
			var mostRecent = payments.reduce(function (a, b) {

				return (b.collection === "payments" && new Date(a.date).getTime() < new Date(b.date).getTime()) ? b : a;
			});
		}
		return cb(mostRecent);
	});
}

function checkQuery (query, members) {

	query.email1 = query.email1.replace(/"/g, '');

	return (
		(query.id || query.email1)
		&& members.length === 1
		&& (query.id === members[0].id || query.email1 === members[0].email1)
	);
}

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