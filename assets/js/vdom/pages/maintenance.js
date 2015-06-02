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

	state(function onchange () {

		renderTools.render(state);
	});

	var uploadComponent = require("../components/upload.js").index(utils, state);
    var uploadResultsComponent = require("../components/uploadproblems.js").index(utils, state);

	utils.$$("upload-component").append(renderTools.render(state));


	function renderObj () {

		var tree, resultsNode, initial = true;

		var renderFun = function (stateObj) {

			if(initial){
				tree        = viewFun(stateObj);
				resultsNode = utils.createElement(tree);
				initial     = false;
				return resultsNode;
			} else {
				var newResults = viewFun(stateObj);
				var patches    = utils.diff(tree, newResults);
				resultsNode    = utils.patch(resultsNode, patches);
				tree           = resultsNode;
			}
		}

		var viewFun = function (state) {
            console.log(state);
			return (
				h("div", [
					uploadComponent.render(state),
                    (state().upload.duplicates.length > 1) 
                    ? uploadResultsComponent.render(state)
                    : ""
				])
			);
		};
			
		return {
			view: viewFun,
			render: renderFun
		}
	}
};

