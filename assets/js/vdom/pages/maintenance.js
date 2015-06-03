"use strict";


var utils = require("./../app").utils;
var h     = utils.h;
var uploadPanels = {
    confirm: function () {},// this is to show problems with file before upload
    pending: function () {}, // this is while the upload is pending 
    done: function () {} // this is to show status AFTER upload
};

module.exports = function (utils) {


	var state = utils.observS({
		status: utils.observ(""),
		upload: utils.observS({
			memberDuplicates: utils.observ([]),
            members: utils.observ([]),
            done: utils.observ("false"),
            problems: utils.observ("false")
		}),
        panel: utils.observ("")
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
		
 //           var renderPanel = uploadPanels[state().panel];
 //           renderPanel = renderPanel ? renderPanel : uploadPanels.generic;
        
            return (
				h("div", [
					uploadComponent.render(state),
//                    renderPanel()
                    (state().upload.memberDuplicates.length > 1) 
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

