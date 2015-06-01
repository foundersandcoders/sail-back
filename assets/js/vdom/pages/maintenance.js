"use strict";


var utils = require("./../app").utils;
var h     = utils.h;

module.exports = function (utils) {


	var state = utils.observS({
		status: utils.observ(""),
		upload: utils.observS({
			duplicates: utils.observ([])
		})
	});

	var renderTools = renderObj();

	state(function onchange (updatedState) {

		renderTools.render(updatedState);
	});

	var uploadComponent = require("../components/upload.js").index(utils, state);

	utils.$$("upload-component").append(renderTools.render(state));



	function renderObj (state) {

		var tree, resultsNode, initial = true;

		var renderFun = function (stateObj) {

			if(initial){
				tree        = viewFun(state);
				resultsNode = utils.createElement(tree);
				initial     = false;
				return resultsNode;
			} else {
				var newResults = viewFun(state);
				var patches    = utils.diff(tree, newResults);
				resultsNode    = utils.patch(resultsNode, patches);
				tree           = resultsNode;
			}
		}

		var viewFun = function (state) {
			return (
				h("div", [
					uploadComponent.render(state)
				])
			);
		};
			
		return {
			view: viewFun,
			render: renderFun
		}
	}
};

