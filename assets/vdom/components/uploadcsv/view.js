"use strict";


var h = require("virtual-dom/h");


module.exports = function (statusUpload) {

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
		renderResult(statusUpload)
	])

	function renderResult (status) {

		if(status.done){
			if(status.status.split(" ")[0] === "Done"){
				return h("div.result-upload", [
					h("p", "Upload succesful")
				]);
			} else {
				return h("div.result-upload", [
					h("p", status)
				]);
			}
		}
	}
}