"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils, state) {
	
	var that = {};

	that.render = function () {

		return module.exports.view(state, createUploader, receiveUploader);
	};

	function createUploader (type, callback) {

		return function upload () {

			var reader = new FileReader;
			var result;

			reader.addEventListener("load", function (e) {
				result = e.target.result;
				callback({type: type, result: result});
			});
			reader.readAsText(this.files[0]);
		}
	}

	function checkDuplicates (entries) {

		var emailsArray = utils.lazy(entries)
		.pluck("primary_email")
		.sort()
		.filter(function (elm) {
		
            if(elm) {
				return elm;
			}
		})
		.toArray();

		var dups = utils.lazy(emailsArray)
		.reduce(function (aggregator, currentValue, index, array) {
		
            if(currentValue === emailsArray[index-1]) {
				aggregator.push(currentValue);
			}
			return aggregator;
		}, []);
       
        return utils.lazy(entries).filter(function (entry) {
            return dups.indexOf(entry.primary_email) > -1;
        }).toArray();
	}

	function receiveUploader (file) {

		utils.parseCsv(file, function (err, fileAsJson) {
			
			var duplicates = checkDuplicates(fileAsJson);

			state.upload.duplicates.set(duplicates);

		});
	}

	var uploadDone = {done: false, status: ""};

	return that;
};

module.exports.view = function (state, fnUpload, fnPost) {

	return h("div.upload-component", [
		h("div.upload", [
			h("div.file-upload", [
				h("span", "Upload members"),
				h("input#upload-members.upload", {
					type: "file",
					onchange: fnUpload("member", fnPost)
				})
			]),
			h("div.file-upload", [
				h("span", "Upload payments"),
				h("input#upload-payments.upload", {
					type: "file",
					onchange: fnUpload("payment", fnPost)
				})
			]),
		]),
		renderResult(state)
	])

	function renderResult (state) {

		if(state.status().done){
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
