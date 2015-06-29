;(function () {
	"use strict";

	var nuclear = require("nuclear.js");
	var utils2  = require("./utils.js");

	var utils = module.exports.utils = {
		is:            require("torf"),
		clean:         require("d-bap"),
		lazy:          require("lazy.js"),
		diff:          require('virtual-dom/diff'),
		patch:         require('virtual-dom/patch'),
		createElement: require('virtual-dom/create-element'),
		request:       require("./services/request.js").request,
		upload:        require("upload-element"),
		moment:        require("moment"),
		observ:        require("observ"),
		observS:       require("observ-struct"),
		observA:       require("observ-array"),
		h:             require("virtual-dom/h"),
		$$:            require("./services/jQuery.like.js"),
		createOpts:    require("./services/request").createOpts,
		parseCsv:      require("./services/parsecsv.js").parse,
		replaceNice:   require("./helpers").replaceNice,
		lastSub:       require("./helpers").lastSub,
		vDomHelpers:   require("./services/vDom"),
		mocks:         require("./services/mockData.js"),
		orderPayments: require("./helpers").orderPayments,
		balanceDue:    require("./helpers").balanceDue,
	};

	try{
		var searchAdmin = require("./pages/adminhome.js");
		var appendNode  = document.getElementById("search-component");
		nuclear.app(appendNode, searchAdmin(), searchAdmin.render);
	} catch (e){
		console.log("Search component: ", e);
	}

	try {
		if (window.location.pathname.split("/")[1] === "members") {
			var Admin = require("./pages/Admin.js");

			getMemberById(function (error, header, body) {

				getEventsInfo(function (errorEvents, headerEvents, bodyEvents) {

					var member   = JSON.parse(body);
					var payments = utils.balanceDue(member.payments);
					var bookings = member.events_booked;
					var events   = JSON.parse(bodyEvents);

					var object   = {
						member:   member,
						payments: payments,
						bookings: bookings,
						events:   events
					};

					nuclear.app(document.querySelector("#member-component"), Admin(object), Admin.render);
				});
			});
		}
	} catch (e) {
		console.log("Member component: ", e);
	}

	try {
		require("./pages/maintenance.js")(utils);
	} catch (e) {
		console.log("Maintenance component: ", e);
	}

	try {
		var Signup = require("./pages/signup.js");
		nuclear.app(document.querySelector("#signup-component"), Signup(), Signup.render);
	} catch (e){
		console.log("Signup component: ", e);
	}

	try {
		var Account = require("./pages/Account.js");
	} catch (e) {
		console.log("Account component: ", e);
	}

	try {
		require("./pages/signin.js")(utils);
	} catch (e){
		console.log("Signin component: ", e);
	}

	try {
		if(window.location.pathname.split("/")[1] === "account") {
			getMemberInfo(function (error, header, body) {
				var member = JSON.parse(body);
				nuclear.app(document.querySelector('#account-component'), Account(member), Account.render);
			});
		}
	} catch (e) {
		console.log("Account component: ", e);
	}

	try {
		var Home = require("./pages/home.js");
		if(window.location.pathname.split("/")[1] === "") {
			getMemberInfo(function (error, header, body) {
				var member = JSON.parse(body);
				nuclear.app(document.querySelector('#home-component'), Home(member), Home.render);
			});
		}
	} catch (e) {
		console.log("Home component: ", e);
	}


	try {
		var Events = require("./pages/Events.js");
		if(window.location.pathname.split("/")[1] === "events") {

			getEventsInfo(function (error, header, body) {

				getMemberInfo(function (errorMember, headerMember, bodyMember) {

					var events     = JSON.parse(body);
					var memberInfo = JSON.parse(bodyMember);

					var object = {
						events: events,
						memberInfo: memberInfo
					};

					nuclear.app(document.querySelector('#events-component'), Events(object), Events.render);
				});
			});
		}
	} catch (e) {
		console.log("Events component: ", e);
	}

	try {
		var MyEvents = require("./pages/AccountEvent.js");
		if(window.location.pathname === "/events/booked") {
			getMemberInfo(function (errMember, headerMember, bodyMember) {

				getEventMember(function (errEvents, headerEvents, bodyEvents) {

					var eventsInfo = JSON.parse(bodyEvents);
					var memberInfo = JSON.parse(bodyMember);

					var object = {
						events: eventsInfo,
						member: memberInfo
					};

					nuclear.app(document.querySelector('#my-events-component'), MyEvents(object), MyEvents.render);
				});
			});
		}
	} catch (e) {
		console.log("Error myEvents: ", e);
	}

	function getMemberById (callback) {

		utils.request({
			method: "GET",
			uri: "/api/members/" + location.pathname.split("/")[2] + "?populate=[payments,membership_type,deletion_reason,events_booked]"
		}, callback)
	}
	function getMemberInfo (callback) {

		nuclear.request({
			method: "GET",
			url: "/api/account"
		}, callback);
	}
	function getEventsInfo (callback) {

		nuclear.request({
			method: "GET",
			url: "/api/current_events"
		}, callback);
	}
	function getSingleEventInfo (callback) {

		nuclear.request({
			method: "GET",
			url: "/api/event_info/" + window.location.pathname.split("/")[2]
		}, callback);
	}
	function getEventMember (callback) {

		nuclear.request({
			method: "GET",
			url: "/api/my_events"
		}, callback);
	}
}());