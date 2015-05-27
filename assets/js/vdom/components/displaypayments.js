"use strict";


var h = require("virtual-dom/h");
var moment = require("moment");


module.exports.index = function (utils, state) {

	var that = {};

	that.render = function (payments) {

		return module.exports.view(payments, state.selected(), that.select, that.getData, that.deletePayment, utils);
	};

	that.deletePayment = function () {

		var deleteMe = state.selected();

		deleteMe.forEach(function (record) {

			utils.request({
				method: "DELETE",
				url: "/api/" + record.collection + "/" + record.id
			}, function (err, header, body) {

				if(err) {
					return alert("Error deleting payments.");
				}

				var payments = state.payments();

				payments.forEach(function (element, index) {

					if (element.id === JSON.parse(body).id) {
						payments.splice(index, 1);
					}
				});
				state.payments.set(payments);
			});
		});
	};

	that.select = function (ref) {

		return function () {
			var selected = state.selected();
			var index;

			var isSelected = selected.some(function (r, i) {

				if (r.id === ref.id) {
					index = i;
					return true;
				} else {
					return false;
				}
			});

			if (isSelected) {
				selected.splice(index, 1);
			} else {
				selected.push(ref);
			}
			state.selected.set(selected);
		};
	};

	that.getData = function () {

		utils.request({
			method: "GET",
			url: "/api/payments?member=" + document.querySelector("#member-id").textContent + "?populate=[]"
		}, function (err, header, body) {

			if(err) {
				return alert("Error getting payments.");
			}

			var orderedPayments = utils.lazy(JSON.parse(body)).sortBy(function (item) {
				return item.date;
			}).toArray();

			orderedPayments.reduce(function (a, b) {

				var cost;
				if (b.collection !== "payment") {
					cost = Number(b.amount);
				} else {
					cost = 0 - Number(b.amount);
				}
				var due = a + cost;
				b.balanceDue = String(due);
				return due;
			}, 0);

			state.payments.set(orderedPayments);
		});
	};

	that.getData();
	return that;
};

module.exports.view = function (data, selected, selectFn, refreshFn, deleteFn, utils) {

	return h("div.table-section-individual", [
		h("div.table-section-individual-header", [
			h("div.col-1", [
				h("p", "Date")
			]),
			h("div.col-2", [
				h("p", "Description")
			]),
			h("div.col-3", [
				h("p", "Charges")
			]),
			h("div.col-3", [
				h("p", "Payments")
			]),
			h("div.col-4", [
				h("p", "Balance Due")
			]),
			h("div.col-5", [
				h("p", "Reference")
			]),
			h("div.col-6", [
				h("p", "Notes")
			]),
			h("div.col-7", [
				h("button#member-delete-payment.button-two.m-l-15.right.w-full.red",{
					onclick: deleteFn
				}, "Del.")
			])
		]),
		h("div.table-section-individual-rows", renderRows(data))
	]);

	function renderRows (data){

		return data.map(function (elm){

		var sel = selected.some(function (s) {
			return s.id === elm.id;
		}) ? "selected" : "unselected";

		var ref = {
			id: elm.id,
			collection: elm.collection
		};

		return h("div.row." + sel, [
				h("div.col-1", [
					h("p#member-payment-date", utils.moment(elm.date).format("DD-MM-YYYY"))
				]),
				h("div.col-2", [
					h("p#member-payment-description", elm.description)
				]),
				h("div.col-3", [
					h("p#member-payment-charges", (elm.collection === "charges") ? elm.total.toString() : "")
				]),
				h("div.col-3", [
					h("p#member-payment-payments", (elm.collection === "payments") ? elm.total.toString() : "")
				]),
				h("div.col-4", [
					h("p#member-payment-balance-due", elm.balanceDue)
				]),
				h("div.col-5", [
					h("p#member-payment-reference", elm.listReference)
				]),
				h("div.col-6", [
					h("p#member-payment-notes", elm.notes)
				]),
				h("div.col-7", [
					h("p#member-payment-delete", {
            			onclick: selectFn(ref)
					}, "x")
				])
			])
		});
	}
};