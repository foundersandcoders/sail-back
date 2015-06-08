"use strict";


var panelViews = require("../components/authorization/signin.js");


module.exports = function (utils) {

	var state = utils.observS({
		member: utils.observS({}),
		panel:  utils.observ("signIn")
	});

	state(function onchange (currentState) {

		render();
	});

	// returns current virtual dom object
	function view () {

		return (
			utils.h("div", [
				// panelViews.navbar(state),
				panelViews[state.panel()](state)
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
		document.querySelector("#signin-component").appendChild(render());
	} catch (e) {
		console.log("Sign in page err: ", e);
	}
};