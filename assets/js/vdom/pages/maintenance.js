"use strict";


var utils = require("./../app").utils;
var h     = utils.h;
var createRouter = require("../services/route.js");

module.exports = function (utils) {

	var state = utils.observS({
		status: utils.observ(""),
		upload: utils.observS({
			memberDuplicates: utils.observ([]),
			paymentCount: utils.observ([]),
            members: utils.observ([]),
            payments: utils.observ([]),
            done: utils.observ("false"),
            problems: utils.observ(""),
		}),
        panel: utils.observ("")
	});
	
    var renderTools = renderObj();

	state(function onchange () {

		renderTools.render(state);
	});

    var uploadPanels = require("../components/upload/panels.js")(utils.h, state, utils.request);
    var router       = createRouter(uploadPanels);
	
    var uploadComponent        = require("../components/upload.js").index(utils, state);
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
		
            return (
				h("div", [
					uploadComponent.render(state),
                    router(state().panel)()
				])
			);
		};
			
		return {
			view: viewFun,
			render: renderFun
		}
	}
};

