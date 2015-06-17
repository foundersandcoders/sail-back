"use strict";


var nuclear = require("../nuclear.js");
var utils   = require("../utils.js");

module.exports = App;

function App () {

	var state = nuclear.observS({
		members: nuclear.observ([]),
		showResult: nuclear.observ(false),
		channels: {
			query: query
		}
	});

	return state;
}


/**
 *	Query function. Takes the state and an object params.
 *	As a result updates the state with the member result search.
 *	
 *	@param {Object} - observable state
 *	@param {Object} - query object
 */
function query (state, params) {

	var activation_status;

	Object.keys(params).forEach(function (elm) {
		if(!params[elm].contains) {
			delete params[elm];
		}

		if(elm === "activation_status") {
			activation_status = params[elm].contains;
			delete params[elm];
		}
	});

	params["activation_status"] = activation_status;

	nuclear.request({
		method: "GET",
		url: "/api/members?where=" + JSON.stringify(params) + "&populate=[payments]"
	}, function (error, header, body) {

		if(error) {

			return;
		}

		var members = JSON.parse(body);

		// if only one member matches the query jump immediatly in view member
		if(members.length === 1) {
			window.location = "/members/" + members[0].id
		} else {
			state.showResult.set(true);
			state.members.set(members);
		}
	});
}

App.render = function (state) {

	var h = nuclear.h;

	return (
		h("div#search-component", [
			searchBox(state),
			h("div#search-result", [
				(state.showResult() ? searchResults(state) : ""),
			])
		])
	);

	function searchBox (state) {

		var data = {
			id: {
				contains: ""
			},
			last_name: {
				contains: ""
			},
			primary_email: {
				contains: ""
			},
			activation_status: {
				contains: "activated"
			}
		};

		return (
			h("div.search-component", [
				h("div.search-container", [
					h("select#member-status", {
						onchange: function () {
							data.activation_status.contains = this.value;
						}
					},[
						h("option", {
							value: "activated",
							selected: true
						}, "Active"),
						h("option", {
							value: "deactivated"
						}, "Deleted")
					]),
					h("input.input-member#search-field-id", {
						placeholder: "Number",
						onchange: function () {

							data.id.contains = this.value;
						}
					}),
					h("input.input-member#search-field-email", {
						placeholder: "Email address",
						onchange: function () {

							data.primary_email.contains = this.value;
						}
					}),
					h("input.input-member#search-field-lastName", {
						placeholder: "Surname",
						onchange: function () {

							data.last_name.contains = this.value;
						}
					}),
					h("button.button-two.member#search-button", {
						onclick: function () {

							state.channels.query.call(this, state, data);
						}
					}, "Search")
				])
			])
		);
	}

	function searchResults (state) {

		return (
			h("div.search-table-section-member", [
				h("div.search-table-section-member-header", [
					h("div.col-1", [
						h("p", "ID")
					]),
					h("div.col-2", [
						h("p", "Name")
					]),
					h("div.col-3", [
						h("p", "Title")
					]),
					h("div.col-4", [
						h("p", "Initials")
					]),
					h("div.col-5", [
						h("p", "Subscription")
					]),
					h("div.col-6", [
						h("p", "Payment")
					])
				]),
				h("div.search-table-section-member-rows", [
					decide(state.members())
				])
			])
		);

		function decide (data) {

			if(data.length > 0) {
				return renderRows(data);
			}else{
				return noResults();
			}
		}

		function renderRows (data) {

			return data.map(function (result){

				return (
					h("a", {href: "/members/" + result.id}, [
						h("div.row", [
							h("div.col-1", [
								h("p#member-id", result.id)
							]),
							h("div.col-2", [
								h("p", result.last_name + " " + result.first_name)
							]),
							h("div.col-3", [
								h("p", result.title)
							]),
							h("div.col-4", [
								h("p", result.initials)
							]),
							h("div.col-5", [
								h("p", replaceNice.call(null, result.membership_type || ""))
							]),
							h("div.col-6", [
								h("p", utils.lastSub(result.payments))
		          			])
						])
					])
				);
			});
		}

		function noResults () {

			return h("p", {
				style: {
					"text-align": "center"
				}
			}, "No results");
		}

		/**
		 *	inpunt: life-single
		 *	output: Life single
		 */
		function replaceNice (string) {

			return string.replace("-", " ").split(" ").map(function (elm){
				return elm.charAt(0).toUpperCase() + elm.slice(1);
			}).join(" ");
		}
	}
}