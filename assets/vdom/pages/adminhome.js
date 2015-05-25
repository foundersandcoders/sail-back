"use strict";

var searchResultsComponent = require("../components/search/index.js");
var searchBoxComponent     = require("../components/search-box/index.js");

module.exports = function (utils) {

	var tree, resultsNode, initial = true;

	function view (state, searchResults, searchBox, h) {

		return h("div#search-component", [
			searchBox.render(),
			h("div#search-result", [
				searchResults.render(),
			])
		]);
	}

	var state = utils.observS({
		members: utils.observ([])
	});

	state(function onchange () {

		render();
	});

	var sr = searchResultsComponent(utils, state);
	var sb = searchBoxComponent(utils, state);

	function render () {

		if(initial){
			tree        = view(state, sr, sb, utils.h);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(state, sr, sb, utils.h);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	}

	try {
		document.querySelector(".overall-container-member").appendChild(render());
	} catch (e) {
		console.log("Search page err: ", e);
	}
};