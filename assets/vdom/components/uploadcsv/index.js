"use strict";

var view  = require("./view");

module.exports = function (utils) {
	
	console.log("Upload:");

	var tree, resultsNode, initial = true;

	var uploadDone = {done: false, status: ""};

	function render () {

		// abstract this into single shared function
		if(initial){
			tree        = view(uploadDone);
			resultsNode = utils.createElement(tree);
			initial     = false;
			return resultsNode;
		} else {
			var newResults = view(uploadDone);
			var patches    = utils.diff(tree, newResults);
			resultsNode    = utils.patch(resultsNode, patches);
			tree           = resultsNode;
		}
	};

	try {
		document.querySelector(".upload-container").appendChild(render());
	} catch (e) {
		console.log("Upload: ", e);
	}

	try{
		var elemPay = document.querySelector('#upload-payments');
		utils.upload(elemPay, {type: "text"}, function (err, file) {

			console.log("file: ",file);
			uploadDone = {done: false, status: ""};

			var opts = {
				method: "POST",
				uri: "/api/upload?type=payments",
				body: file[0].target.result
			};

			utils.request(opts, function (e, h, b){

				uploadDone = {done: true, status: ""};
				uploadDone.status = e || b;

				render(uploadDone);
			});
		});
	}catch(e) {
		console.log("err upload", e);
	}


	try{
		var elemMem = document.querySelector('#upload-members');
		utils.upload(elemMem, {type: "text"}, function (err, file) {

			console.log("file: ",file);
			uploadDone = {done: false, status: ""};

			var opts = {
				method: "POST",
				uri: "/api/upload?type=members",
				body: file[0].target.result
			};

			utils.request(opts, function (e, h, b){

				uploadDone = {done: true, status: ""};
				uploadDone.status = e || b;

				render(uploadDone);
			});
		});
	}catch(e){
		console.log("err upload", e);
	}

	return;
};