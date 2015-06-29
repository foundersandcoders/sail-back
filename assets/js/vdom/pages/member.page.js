// "use strict";


// var nuclear    = require("nuclear.js");
// var page       = require("../components/admin/member-panel.js");
// var balanceDue = require("../services/balanceDue");


// module.exports = function (utils) {

// 	var state = utils.observS({
// 		member:      utils.observ({}),
// 		payments:    utils.observ([]),
// 		modeMember:  utils.observ("viewMember"),
// 		modePayment: utils.observ("viewPayment"),
// 		selected:    utils.observ([]),
// 		channels: {
// 			deletePayment: deletePayment
// 		}
// 	});

// 	function deletePayment (state, paymentId) {

// 		nuclear.request({
// 			method: "DELETE",
// 			url: "/api/payments/" + paymentId
// 		}, function (error, header, body) {

// 			if(error) {
// 				alert("Error deleting payments");
// 			} else {
// 				var paymentsArray = state.payments();
// 				var index = paymentsArray.map(function (elm) {return elm.id}).indexOf(JSON.parse(body).id);
// 				paymentsArray.splice(index, 1);
// 				state.payments.set(paymentsArray);
// 			}
// 		})
// 	}

// 	state(function onchange () {

// 		render();
// 	});

// 	function view (h) {

// 		return (
// 			h("div.main-container#member-component", [

// 				h("div.inner-section-divider-medium"),

// 				h("div.section-label", [
// 					h("h1", "Member info")
// 				]),

// 				h("div.inner-section-divider-medium"),

// 				page[state.modeMember()](state),

// 				h("div.inner-section-divider-medium"),

// 				renderPayment(),

// 				h("div.inner-section-divider-medium"),

// 				renderEvents()
// 			])
// 		);

// 		function renderPayment () {
// 			if (state.modeMember() === "editMember") {
// 				return;
// 			} else {

// 				return (
// 					h("div", [
// 						h("div.section-label", [
// 							h("h1", "Payment info")
// 						]),

// 						h("div.inner-section-divider-medium"),

// 						h("div.flex", [
// 							h("button#subscription_btn.btn-primary.w-3",{
// 								onclick: function () {
// 									return state.modePayment.set("subscription")
// 								}
// 							},"+ Subscription"),
							
// 							h("button#donation_btn.btn-primary.w-3", {
// 								onclick: function () {
// 									return state.modePayment.set("donation")
// 								}
// 							},"+ Donation"),

// 							h("button#payment_btn.btn-primary.w-3", {
// 								onclick: function () {
// 									return state.modePayment.set("payment")
// 								}
// 							},"+ Payment")
// 						]),

// 						h("div.inner-section-divider-medium"),

// 						page[state.modePayment()](state)
// 					])
// 				);
// 			}
// 		}
// 	}

// 	var tree, resultsNode, initial = true;
	
// 	function render () {

// 		if(initial){
// 			tree        = view(utils.h);
// 			resultsNode = utils.createElement(tree);
// 			initial     = false;
// 			return resultsNode;
// 		} else {
// 			var newResults = view(utils.h);
// 			var patches    = utils.diff(tree, newResults);
// 			resultsNode    = utils.patch(resultsNode, patches);
// 			tree           = resultsNode;
// 		}
// 	}

// 	try {
// 		document.querySelector("#member-component").appendChild(render());
// 	} catch (e) {
// 		console.log("View member page err: ", e);
// 	}

// 	utils.request({
// 		method: "GET",
// 		uri: "/api/members/" + location.pathname.split("/")[2] + "?populate=[payments,membership_type,deletion_reason,bookingrecords]"
// 	}, function (error, header, body) {

// 		body = JSON.parse(body);
// 		if(error) {
// 			alert("Something went wrong");
// 		} else {
// 			var payments = balanceDue(body.payments);
// 			delete body.payments;
// 			state.member.set(body);
// 			state.payments.set(payments);
// 		}
// 	});
// };
