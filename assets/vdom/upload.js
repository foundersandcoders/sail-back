"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils) {
	
	var that = {};

	that.render = function (state) {

		return module.exports.view(state);
	};

	var uploadDone = {done: false, status: ""};

	// for payments
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


	// for members
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

	return that;
};

module.exports.view = function (state) {

	return h("div.upload-component", [
		h("div.upload", [
			h("div.file-upload", [
				h("span", "Upload members"),
				h("input#upload-members.upload", {
					type: "file"
				})
			]),
			h("div.file-upload", [
				h("span", "Upload payments"),
				h("input#upload-payments.upload", {
					type: "file"
				})
			]),
		]),
		renderResult(state)
	])

	function renderResult (state) {

		if(state.done){
			if(status.status.split(" ")[0] === "Done"){
				return h("div.result-upload", [
					h("p", "Upload succesful")
				]);
			} else {
				return h("div.result-upload", [
					h("p", state)
				]);
			}
		}
	}
}