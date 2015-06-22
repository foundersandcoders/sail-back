;(function () {
	"use strict";

	var nuclear = require("./nuclear.js");
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
		require("./pages/member.page.js")(utils);
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
				var events = JSON.parse(body);
				nuclear.app(document.querySelector('#events-component'), Events(events), Events.render);
			});
		}
	} catch (e) {
		console.log("Events component: ", e);
	}


	try {
		var EventInfo = require("./pages/EventInfo.js");
		if(window.location.pathname.split("/")[1] === "event_info") {
			getSingleEventInfo(function (error, header, body) {
				var eventInfo = JSON.parse(body);
				nuclear.app(document.querySelector('#event-info-component'), EventInfo(eventInfo), EventInfo.render);
			});
		}
	} catch (e) {
		console.log("Event info component: ", e);
	}

	// 
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
}());