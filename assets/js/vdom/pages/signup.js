"use strict";


var panelViews = require("../components/signup/panels.js");


module.exports = function (utils) {

	var state = utils.observS({
		member: utils.observS({}),
		panel:  utils.observ("one"),
        balanceDue: utils.observ("0")
	});

	// check if "state" is in storage
	// if(localStorage.getItem("state")) {

	// 	populateFromStorage(state);
	// } else {

	// 	saveToStorage(state);
	// }

	state(function onchange (currentState) {

		// saveToStorage(currentState);
		render();
	});

	function createMember (member, callback) {

		// validate member and clean up
		utils.request({
			method: "POST",
			uri: "/signup",
			json: member
		}, function (error, header, body) {

			// checking the id is the best way
			// to know if the body contains a
			// member
			if(!body || body.id !== undefined) {

				return callback(error, body);
			} else {
				
				return callback(body, undefined);
			}
		});
	}

	function updateMember (member, callback) {

		// validate member and clean up
		utils.request({
			method: "PUT",
			uri: "/member/" + member.id,
			json: member
		}, function (error, header, body) {

			// checking the id is the best way
			// to know if the body contains a
			// member
			if(!body || body.id !== undefined) {

				return callback(error, body);
			} else {
				
				return callback(body, undefined);
			}
		});
	}

	var fun = {
		createMember: createMember,
		updateMember: updateMember
	};

	// returns current virtual dom object
	function view () {

		return (
			utils.h("div", [
				// panelViews.navbar(state),
				panelViews[state.panel()](state, createMember)
			])
		);
	}

	// virtual dom data
	var virtualTree, resultsNode, initial = true;
	
	function render () {

		if(initial){
			virtualTree = view();
			resultsNode = utils.createElement(virtualTree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view();
			var patches    = utils.diff(virtualTree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			virtualTree    = resultsNode;
		}
	}

	try {
		document.querySelector("#signup-component").appendChild(render());
	} catch (e) {
		console.log("Sign up page err: ", e);
	}
};

/**
 * Updates the current state observable  with the state
 * stored in local storage.
 * localstorage can only accept strings as values
 *
 * @param {Object} - state observable to be updated
 */
function populateFromStorage (state) {

	var stateParse = JSON.parse(localStorage.getItem("state"));
	state.set(stateParse);
}


/**
 * Stores the current state observable in local storage
 * localstorage can only accept strings as values
 *
 * @param {Object} - current observable state
 */
function saveToStorage (stateObj) {

	var stateStringify = JSON.stringify(stateObj);
	localStorage.setItem("state", stateStringify);
}







