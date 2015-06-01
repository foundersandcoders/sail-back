"use strict";


var uploadComponent = require("../components/upload.js");


module.exports = function (utils) {

	var state = utils.observS({
		status: utils.observ("")
	});

	state(function onchange (updatedState) {

		render(updatedState);
	});


	var renderObj = function (state) {

		var tree, resultsNode, initial = true;

		return {
			view: function (state) {
				return (
					h("div", [
						uploadComponent.render(state)
					])
				);
			}
			render: function (stateObj) {



				if(initial){
					tree        = view(state);
					resultsNode = utils.createElement(tree);
					initial     = false;
					return resultsNode;
				} else {
					var newResults = view(state);
					var patches    = utils.diff(tree, newResults);
					resultsNode    = utils.patch(resultsNode, patches);
					tree           = resultsNode;
				}
			}
		}
	}
};