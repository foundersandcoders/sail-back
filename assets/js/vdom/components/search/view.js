"use strict";

var h = require("virtual-dom/h");

module.exports = function (data, moment, utils) {
	console.log("ddd",data);
	return h("div.search-table-section-member", [
		h("div.search-table-section-member-header", [
			h("div.col-1", [
				h("p", "ID")
			]),
			h("div.col-2", [
				h("p", "Name")
			]),
			h("div.col-3", [
				h("p", "Title")
			]),
			h("div.col-4", [
				h("p", "Initials")
			]),
			h("div.col-5", [
				h("p", "Subscription")
			]),
			h("div.col-6", [
				h("p", "Payment")
			])
		]),
		h("div.search-table-section-member-rows", [
			decide(data)
		])
	]);

	function renderRows (data) {

		return data.map(function (result){

		console.log("RESULT", result);

			return h("a", {href: "/members/" + result.id}, [
				h("div.row", [
					h("div.col-1", [
						h("p", result.id)
					]),
					h("div.col-2", [
						h("p", result.last_name + " " + result.first_name)
					]),
					h("div.col-3", [
						h("p", result.title)
					]),
					h("div.col-4", [
						h("p", result.initials)
					]),
					h("div.col-5", [
						h("p", replaceNice.call(null, result.membership_type || ""))
					]),
					h("div.col-6", [
						h("p", utils.lastSub(result.payments))
          			])
				])
			]);
		});
	}

	function decide (data) {

		if(data.length > 0) {
			return renderRows(data);
		}else{
			return noResults();
		}
	}

	function noResults () {

		return h("p", "No results");
	}
};

/**
 *	inpunt: life-single
 *	output: Life single
 */
function replaceNice (string) {

	return string.replace("-", " ").split(" ").map(function (elm){
		return elm.charAt(0).toUpperCase() + elm.slice(1);
	}).join(" ");
}