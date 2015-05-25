"use strict";

var h                     = require("virtual-dom/h");
var memberTypes           = require("./helpers").memberTypes;
var newsType              = require("./helpers").newsType;
var renderOptionsSelected = require("./helpers").renderOptionsSelected;
var deletionReasons		  = require("./helpers").deletionReasons;


module.exports = {
	index: index,
	view: view
};


function index (utils, state) {

	var that = {};
	var $$   = utils.$$;

	that.render = function () {

		return view(that, state.member(), state.toggleMode, utils);
	};

	that.getData = function () {

		utils.request(utils.createOpts("GET"), function (e, h, b) {

			var member = JSON.parse(b);
			state.member.set(member);
		});
	};

	that.putData = function () {

		try {
			var payload = {
				// info
				title:          $$("edit-member-title").value(),
				initials:       $$("edit-member-initials").value(),
				firstName:      $$("edit-member-first-name").value(),
				lastName:       $$("edit-member-last-name").value(),
				primaryEmail:   $$("edit-member-primary-email").value(),
				secondaryEmail: $$("edit-member-secondary-email").value(),
				newsType:       $$("edit-member-news-type").valSelect(),
				// address
				address1:    $$("edit-member-address-line").value(),
				address2:    $$("edit-member-town-or-city").value(),
				county:      $$("edit-member-county").value(),
				postcode:    $$("edit-member-postcode").value(),
				homePhone:   $$("edit-member-home-phone").value(),
				workPhone:   $$("edit-member-work-phone").value(),
				mobilePhone: $$("edit-member-mobile-phone").value(),
				// membership
				membershipType:    $$("edit-member-membership-type").valSelect(),
				dateJoined:        $$("edit-member-date-joined").value(),
				lifePaymentDate:   $$("edit-member-life-payment-date").value(),
				registered:        $$("edit-member-status-online").checkedValue(),
				giftAidSigned:     $$("edit-member-gift-aid-signed").checkedValue(),
				dateGiftAidSigned: $$("edit-member-date-gift-aid-signed").value(),
				standingOrder:     $$("edit-member-standing-order").checkedValue(),
				notes:             $$("edit-member-notes").value()
			};
		} catch (e) {
			console.log("Error in updating details: ", e);
		}

		utils.request(utils.createOpts("PUT", payload), function (e, h, b) {

			// check if b is object, if not, try and JSON.parse it.
			state.member.set(b);
			state.toggleMode();
		});
	};

	that.deleteMember = function () {

		var selectElm = document.querySelector("#deletion-reason");

		var payload = {
			deletionDate: utils.moment(),
			deletionReason: selectElm.options[selectElm.selectedIndex].value,
			status: "deleted"
		};

		utils.request(utils.createOpts("PUT", payload), function (e, h, b) {

			var member = state.member();
			member.status = b.status;
			member.deletionReason = b.deletionReason;
			member.deletionDate = b.deletionDate;
			state.member.set(b);
			state.toggleMode();
		});
	}

	that.reactivate = function () {

		var payload = {
			deletionReason: [],
			status: "active"
		};

		utils.request(utils.createOpts("PUT", payload), function (e, h, b) {

			var member = state.member();
			member.status = b.status;
			state.member.set(member);
			state.toggleMode();
		});
	}

	that.getData();

	return that;
};

function view (that, data, toggleFn, utils) {
	
	return ([		
		h("div.member-info-controls", [
			h("button#edit-member-save.button-two.m-l-15.w-100",{
				onclick: that.putData
			}, "Save"),
			h("button#edit-member-cancel.button-two.m-l-15.w-100",{
				onclick: toggleFn
			}, "Cancel"),
			renderStatus(data.status)
		]),
		h("div.member-info-content", [
			renderPersonalInfo(data),
			renderAddressInfo(data),
			renderMembership(data)
		])	
	]);

	function renderStatus (status) {

		var active = ([
			h("button.button-two.button-c.m-l-15.red.w-100", {
				onclick: that.deleteMember
			}, "Delete"),
			h("select#deletion-reason.w-200", renderOptionsSelected(deletionReasons, null, "Deletion reason"))
		]);

		var deleted = ([
			h("button.button-two.button-c.m-l-15.red", {
				onclick: that.reactivate
			},  "Reactivate")
		]);

		if(status === "active"){
			return active;
		}else{
			return deleted;
		}
	}

	function renderPersonalInfo (member) {

		return h("div.col-1", [
			h("h2", "Personal info"),
			h("p", [
				h("span.info", "ID: "),
				h("input#edit-member-id", {
					type: "text",
					value: member.id,
					disabled: true
				})
			]),
			h("p", [
				h("span.info", "Title: "),
				h("input#edit-member-title", {
					type: "text",
					value: member.title || ""
				})
			]),
			h("p", [
				h("span.info", "Initials: "),
				h("input#edit-member-initials", {
					type: "text",
					value: member.initials || ""
				})
			]),
			h("p", [
				h("span.info", "First name: "),
				h("input#edit-member-first-name", {
					type: "text",
					value: member.firstName || ""
				})
			]),
			h("p", [
				h("span.info", "Last name: "),
				h("input#edit-member-last-name", {
					type: "text",
					value: member.lastName || ""
				})
			]),
			h("p", [
				h("span.info", "Primary email: "),
				h("input#edit-member-primary-email", {
					type: "text",
					value: member.primaryEmail || ""
				})
			]),
			h("p", [
				h("span.info", "Secondary email: "),
				h("input#edit-member-secondary-email", {
					type: "text",
					value: member.secondaryEmail || ""
				})
			]),
			// h("p", [
			// 	h("span.info", "Email bounced: "),
			// 	h("input#edit-member-email-bounced", {
			// 		type: "checkbox",
			// 		checked: member.emailBounced,
			// 		disabled: true
			// 	})
			// ]),
			h("p", [
				h("span.info", "News: "),
				h("select#edit-member-news-type.input-width", renderOptionsSelected(newsType, member.newsType, "Select news"))
			]),
			h("p", [
				h("span.info", "Status: "),
				h("input#edit-member-status", {
					type: "text",
					value: member.status || "",
					disabled: true
				})
			])
		]);
	}

	function renderAddressInfo (member) {

		return h("div.col-2", [
			h("h2", "Address info"),
			h("p", [
				h("span.info", "Address line: "),
				h("input#edit-member-address-line", {
					type: "text",
					value: member.address1 || "",
					placeholder: "House name/number and street, P.O. box, company name, c/o"
				})
			]),
			// h("p", [
			// 	h("span.info", "Address line 1: "),
			// 	h("input#edit-member-address1", {
			// 		type: "text",
			// 		value: member.address1 || "",
			// 		placeholder: "House name/number and street, P.O. box, company name, c/o"
			// 	})
			// ]),
			h("p", [
				h("span.info", "Town/City: "),
				h("input#edit-member-town-or-city", {
					type: "text",
					value: member.address2 || ""
				})
			]),
			// h("p", [
			// 	h("span.info", "Address 3: "),
			// 	h("input#edit-member-address3", {
			// 		type: "text",
			// 		value: member.address3 || ""
			// 	})
			// ]),
			// h("p", [
			// 	h("span.info", "Address 4: "),
			// 	h("input#edit-member-address3", {
			// 		type: "text",
			// 		value: member.address3 || ""
			// 	})
			// ]),
			h("p", [
				h("span.info", "County: "),
				h("input#edit-member-county", {
					type: "text",
					value: member.county || ""
				})
			]),
			h("p", [
				h("span.info", "Postcode: "),
				h("input#edit-member-postcode", {
					type: "text",
					value: member.postcode || ""
				})
			]),
			// h("p", [
			// 	h("span.info", "Deliverer: "),
			// 	h("input#edit-member-deliverer", {
			// 		type: "text",
			// 		value: member.deliverer || ""
			// 	})
			// ]),
			h("p", [
				h("span.info", "Home phone: "),
				h("input#edit-member-home-phone", {
					type: "text",
					value: member.homePhone || ""
				})
			]),
			h("p", [
				h("span.info", "Work phone: "),
				h("input#edit-member-work-phone", {
					type: "text",
					value: member.workPhone || ""
				})
			]),
			h("p", [
				h("span.info", "Mobile phone: "),
				h("input#edit-member-mobile-phone", {
					type: "text",
					value: member.mobilePhone || ""
				})
			])
		]);
	}

	function renderMembership (member) {

		return h("div.col-3", [
			h("h2", "Membership info"),
			h("p", [
				h("span.info", "Membership type: "),
				h("select#edit-member-membership-type.input-width", renderOptionsSelected(memberTypes, (member.membershipType || ""), "Membership type"))
			]),
			h("p", [
				h("span.info", "Date joined: "),
				h("input#edit-member-date-joined", {
					type: "text",
					value: (member.dateJoined ? utils.moment(member.dateJoined).format("DD-MM-YYYY") : "")
				})
			]),
			h("p", [
				h("span.info", "Life payment date: "),
				h("input#edit-member-life-payment-date", {
					type: "text",
					value: (member.lifePaymentDate ? utils.moment(member.lifePaymentDate).format("DD-MM-YYYY") : "")
				})
			]),
			h("p", [
				h("span.info", "Registered: "),
				h("input#edit-member-status-online", {
					type: "checkbox",
					checked: member.registered
				})
			]),
			h("p", [
				h("span.info", "Gift aid: "),
				h("input#edit-member-gift-aid-signed", {
					type: "checkbox",
					checked: member.giftAidSigned
				})
			]),
			h("p", [
				h("span.info", "Date GAD Signed: "),
				h("input#edit-member-date-gift-aid-signed", {
					type: "text",
					value: (member.dateGiftAidSigned ? utils.moment(member.dateGiftAidSigned).format("DD-MM-YYYY") : "")
				})
			]),
			h("p", [
				h("span.info", "Standing order: "),
				h("input#edit-member-standing-order", {
					type: "checkbox",
					checked: member.standingOrder
				})
			]),
			// h("p", [
			// 	h("span.info", "Due date: "),
			// 	h("input#edit-member-due-date", {
			// 		type: "text",
			// 		value: (member.dueDate ? utils.moment(member.dueDate).format("DD-MMM") : "")
			// 	})
			// ]),
			h("p", [
				h("span.info", "Notes: "),
				h("input#edit-member-notes", {
					type: "text",
					value: member.notes || ""
				})
			]),
		]);
	}
};