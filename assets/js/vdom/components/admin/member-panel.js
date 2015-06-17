"use strict";

var h     = require("virtual-dom/h");
var utils = require("../../app.js").utils;

module.exports.viewMember = function (state) {

	var data = state.member();

	return ([
		h("div.member-info-controls", [
			h("button#edit-member-mode.button-two.m-l-15.right.w-100",{
				onclick: function () {
					var mode = (state.modeMember() === "editMember") ? "viewMember" : "editMember";
					state.modeMember.set(mode);
				}
			}, "Edit")
		]),
		h("div.member-info-content", [
			renderPersonalInfo(data),
			renderAddressInfo(data),
			renderMembership(data)
		])
	]);

	function renderPersonalInfo (member) {

		return ([
			h("div.col-1", [
				h("h2", "Personal info"),
				check("Name: ",            fullName.call(member), "full_name"),
				check("ID: ",              member.id, "id"),
				check("Primary email: ",   member.primary_email, "primary_email"),
				check("Secondary email: ", member.secondary_email, "secondary_email"),
				check("Bounced email: ",   member.email_bounced, "bounced_email"),
				check("News: ",            (member.news_type === "post" ? "Post" : "Online"), "news_type"),
				check("Status: ",          (member.activation_status === "deactivated" ? "deleted" : "active"), "activation_status"),
				[(
					(member.activation_status === "deactivated")
					? h("span", [
						check("Deletion date: ",   utils.moment(member.deletion_date).format("DD-MM-YY"), "deletion_date"),
						check("Deletion reason: ", (member.deletion_reason ? member.deletion_reason.description : ""), "deletion_reason")
					])
					: undefined
				)]
			])
		]);
	}

	function renderAddressInfo (member) {

		return ([
			h("div.col-2", [
				h("h2", "Address info"),
				check("Address line: ", member.address1, "address1"),
				check("Address line: ", member.address2, "address2"),
				check("Address line: ", member.address3, "address3"),
				check("Address line: ", member.address4, "address4"),
				check("County: ",       member.county, "county"),
				check("Postcode: ",     member.postcode, "postcode"),
				check("Deliverer: ",    member.deliverer, "deliverer"),
				check("Home phone: ",   member.home_phone, "home_phone"),
				check("Work phone: ",   member.work_phone, "work_phone"),
				check("Mobile phone: ", member.mobile_phone, "mobile_phone")
			])
		]);
	}

	function renderMembership (member) {

		return ([
			h("div.col-3", [
				h("h2", "Membership info"),
				check("Date joined: ", utils.moment(member.date_joined).format("DD-MM-YYYY"), "date_joined"),
				check("Membership type: ", replaceNice.call(null, (member.membership_type || "")), "membership_type"),
				[(
					(member.membership_type === "life-double" || member.membership_type === "life-single")
					? check("Life payent date: ", member.life_payment_date, "life_payment_date")
					: undefined
				)],
				[(
					(member.dateTypeChanged && (member.membership_type === "life-double" || member.membership_type === "life-single"))
					? (check("Life payment date: ", member.life_payment_date, "life_payment_date"), check("Membership date changed: ", member.date_type_changed, "date_type_changed"))
					: undefined
				)],
				[(
					(member.gift_aid_signed !== undefined && member.gift_aid_signed === true)
					? check("GAD Signed: ", utils.moment(member.date_gift_aid_signed).format("DD-MM-YYYY"), "gad_signed")
					: undefined
				)],
				[(
					(member.date_gift_aid_cancelled !== undefined && member.date_gift_aid_cancelled === true)
					? check("GAD cancelled: ", utils.moment(member.date_gift_aid_cancelled).format("DD-MM-YYYY"), "date_gift_aid_cancelled")
					: undefined
				)],
				check("Standing order: ", ((member.standing_order) ? "Yes" : "No"), "standing_order"),
				check("Notes: ", member.notes),
				check("Status online: ", (member.registered === "registered" ? "Registered" : "Unregistered"), "registered"),
				check("Due date: ", utils.moment(member.due_date).format("DD-MMM"), "due_date")
			])
		]);
	}

	function check (name, elm, id) {
		if(elm) {
			return h("p", [
				h("span.info", name),
				h("span#view-member-" + id, elm)
			]);
		}
	}

	function replaceSpaceColon (){

		return this.toLowerCase().replace(" ", "-").replace(":", "");
	}

	function replaceNice (membership_type) {

		if (!utils.is.ok(membership_type)) {
			return "";
		} else {
			return membership_type.description;
		}

	}

	function fullName () {
		var store = [];

		if(utils.is.ok(this.title)    ) {store.push(this.title)}
		if(utils.is.ok(this.first_name)) {store.push(this.first_name)}
		if(utils.is.ok(this.initials) ) {store.push(this.initials)}
		if(utils.is.ok(this.last_name) ) {store.push(this.last_name)}

		return store.join(" ");
	}
};

module.exports.editMember = function (state) {

	// function view (that, data, toggleFn, utils) {
	var data = state.member();

	var that = {
		putData: function () {

			var $$ = utils.$$;

			try {
				var payload = {
					// info
					title:          	$$("edit-member-title").value(),
					initials:       	$$("edit-member-initials").value(),
					first_name:     	$$("edit-member-first-name").value(),
					last_name:      	$$("edit-member-last-name").value(),
					primary_email:   	$$("edit-member-primary-email").value(),
					secondary_email: 	$$("edit-member-secondary-email").value(),
					news_type:       	$$("edit-member-news-type").valSelect(),
					// address
					address1:    		$$("edit-member-address-line").value(),
					address2:    		$$("edit-member-town-or-city").value(),
					county:      		$$("edit-member-county").value(),
					postcode:    		$$("edit-member-postcode").value(),
					home_phone:   		$$("edit-member-home-phone").value(),
					work_phone:   		$$("edit-member-work-phone").value(),
					mobile_phone: 		$$("edit-member-mobile-phone").value(),
					// membership
					membership_type:      $$("edit-member-membership-type").valSelect(),
					// date_joined:          $$("edit-member-date-joined").value(),
					// life_payment_date:    $$("edit-member-life-payment-date").value(),
					registered:           ($$("edit-member-status-online").checkedValue() === true ? "registered" : "unregistered"), 
					gift_aid_signed:      $$("edit-member-gift-aid-signed").checkedValue(),
					// date_gift_aid_signed: $$("edit-member-date-gift-aid-signed").value(),
					standing_order:       $$("edit-member-standing-order").checkedValue(),
					notes:                $$("edit-member-notes").value()
				};
			} catch (e) {
				console.log("Error in updating details: ", e);
			}

			utils.request({
				method: "PUT",
				uri: "/api/members/" + state.member().id,
				json: payload
			}, function (error, header, body) {

				if(error) {
					alert("Could not update member");
				} else {
					// get the populated member
					utils.request({
						method: "GET",
						uri: "/api/members/" + body.id + "?populate=[payments,membership_type, deletion_reason]"
					}, function (errorPop, headerPop, bodyPop) {

						if(errorPop) {
							alert("Could not get member");
						} else {
							state.member.set(JSON.parse(bodyPop));
							state.modeMember.set("viewMember");
						}
					});
				}
			});
		},
		deleteMember: function () {

			var selectElm = document.querySelector("#deletion-reason");

			var payload = {
				deletion_date: new Date(),
				deletion_reason: selectElm.options[selectElm.selectedIndex].value,
				activation_status: "deactivated"
			};

			utils.request({
				method: "PUT",
				uri: "/api/members/" + state.member().id,
				json: payload
			}, function (error, header, body) {

				if(error){
					alert("Could not delete member");
				} else {
					state.member.set(body);
				}
			});
		},
		reactivate: function () {

			var payload = {
				deletion_reason: null,
				activation_status: "activated"
			};

			utils.request({
				method: "PUT",
				uri: "/api/members/" + state.member().id,
				json: payload
			}, function (error, header, body) {

				if(error) {
					alert("Could not activate member");
				} else {
					state.member.set(body);
				}
			});
		}
	};

	return ([		
		h("div.member-info-controls", [
			h("button#edit-member-save.button-two.m-l-15.w-100",{
				onclick: that.putData
			}, "Save"),
			h("button#edit-member-cancel.button-two.m-l-15.w-100",{
				onclick: function () {
					var mode = (state.modeMember() === "editMember") ? "viewMember" : "editMember";
					state.modeMember.set(mode);
				}
			}, "Cancel"),
			renderStatus(data.activation_status)
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
			h("select#deletion-reason.w-200", utils.vDomHelpers.renderOptionsSelected(utils.mocks.deletionReasons, null, "Deletion reason"))
		]);

		var deleted = ([
			h("button.button-two.button-c.m-l-15.red", {
				onclick: that.reactivate
			},  "Reactivate")
		]);

		if(status === "deactivated"){
			return deleted;
		}else{
			return active;
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
					value: member.first_name || ""
				})
			]),
			h("p", [
				h("span.info", "Last name: "),
				h("input#edit-member-last-name", {
					type: "text",
					value: member.last_name || ""
				})
			]),
			h("p", [
				h("span.info", "Primary email: "),
				h("input#edit-member-primary-email", {
					type: "text",
					value: member.primary_email || ""
				})
			]),
			h("p", [
				h("span.info", "Secondary email: "),
				h("input#edit-member-secondary-email", {
					type: "text",
					value: member.secondary_email || ""
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
				h("select#edit-member-news-type.input-width", utils.vDomHelpers.renderOptionsSelected(utils.mocks.newsType, member.newsType, "Select news"))
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
				h("span.info", "Address 1: "),
				h("input#edit-member-address-line", {
					type: "text",
					value: member.address1 || "",
				})
			]),
			h("p", [
				h("span.info", "Address 2: "),
				h("input#edit-member-town-or-city", {
					type: "text",
					value: member.address2 || ""
				})
			]),
			h("p", [
				h("span.info", "Address 3: "),
				h("input#edit-member-address3", {
					type: "text",
					value: member.address3 || ""
				})
			]),
			h("p", [
				h("span.info", "Address 4: "),
				h("input#edit-member-address3", {
					type: "text",
					value: member.address4 || ""
				})
			]),
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
					value: member.home_phone || ""
				})
			]),
			h("p", [
				h("span.info", "Work phone: "),
				h("input#edit-member-work-phone", {
					type: "text",
					value: member.work_phone || ""
				})
			]),
			h("p", [
				h("span.info", "Mobile phone: "),
				h("input#edit-member-mobile-phone", {
					type: "text",
					value: member.mobile_phone || ""
				})
			])
		]);
	}

	function renderMembership (member) {

		return h("div.col-3", [
			h("h2", "Membership info"),
			h("p", [
				h("span.info", "Membership type: "),
				h("select#edit-member-membership-type.input-width", utils.vDomHelpers.renderOptionsSelected(utils.mocks.memberTypes, (member.membership_type.value || ""), "Membership type"))
			]),
			h("p", [
				h("span.info", "Date joined: "),
				h("input#edit-member-date-joined", {
					type: "text",
					value: (member.date_joined ? utils.moment(member.date_joined).format("DD-MM-YYYY") : "")
				})
			]),
			h("p", [
				h("span.info", "Life payment date: "),
				h("input#edit-member-life-payment-date", {
					type: "text",
					value: (member.life_payment_date ? utils.moment(member.life_payment_date).format("DD-MM-YYYY") : "")
				})
			]),
			h("p", [
				h("span.info", "Registered: "),
				h("input#edit-member-status-online", {
					type: "checkbox",
					checked: (member.registered === "registered")
				})
			]),
			h("p", [
				h("span.info", "Gift aid: "),
				h("input#edit-member-gift-aid-signed", {
					type: "checkbox",
					checked: member.gift_aid_signed
				})
			]),
			h("p", [
				h("span.info", "Date GAD Signed: "),
				h("input#edit-member-date-gift-aid-signed", {
					type: "text",
					value: (member.date_gift_aid_signed ? utils.moment(member.date_gift_aid_signed).format("DD-MM-YYYY") : "")
				})
			]),
			h("p", [
				h("span.info", "Standing order: "),
				h("input#edit-member-standing-order", {
					type: "checkbox",
					checked: member.standing_order
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

module.exports.viewPayment = function (state) {

	var data = state.payments();

	return (
		h("div#table-payments", [
			h("div.table-section-individual", [
				h("div.table-section-individual-header", [
					h("div.col-1", [
						h("h3", "Date")
					]),
					h("div.col-2", [
						h("h3", "Description")
					]),
					h("div.col-3", [
						h("h3", "Charges")
					]),
					h("div.col-3", [
						h("h3", "Payments")
					]),
					h("div.col-4", [
						h("h3", "Balance Due")
					]),
					h("div.col-5", [
						h("h3", "Reference")
					]),
					h("div.col-6", [
						h("h3", "Notes")
					]),
					h("div.col-7", [
						h("h3#member-delete-payment", {
						//	onclick: deleteFn
						}, "Del.")
					])
				]),
				h("div.table-section-individual-rows", renderRows(data))
			])
		])
	);

	function renderRows (data){

		return data.map(function (elm){

		// var sel = selected.some(function (s) {
		// 	return s.id === elm.id;
		// }) ? "selected" : "unselected";

		var ref = {
			id: elm.id,
			collection: elm.collection
		};

		return h("div.row", [
				h("div.col-1", [
					h("p#member-payment-date", utils.moment(elm.date).format("DD-MM-YYYY"))
				]),
				h("div.col-2", [
					h("p#member-payment-description", (elm.description + (elm.type ? (" by " + elm.type) : "") ))
				]),
				h("div.col-3", [
					h("p#member-payment-charges", 
                    (elm.category !== "payment" && elm.amount) ? elm.amount.toString() : "")
				]),
				h("div.col-3", [
					h("p#member-payment-payments",
                    (elm.category === "payment" && elm.amount) ? elm.amount.toString() : "")
				]),
				h("div.col-4", [
					h("p#member-payment-balance-due", elm.balanceDue)
				]),
				h("div.col-5", [
					h("p#member-payment-reference", elm.reference)
				]),
				h("div.col-6", [
					h("p#member-payment-notes", elm.notes)
				]),
				h("div.col-7", [
					h("p#member-payment-delete", {
            			onclick: function () {

            			}
					}, "x")
				])
			])
		});
	}
};

module.exports.subscription = function (state) {

	var data = {};

	return (
		h("div.container-small", [
			h("div.inner-section-divider-small"),

			h("input#amount", {
				placeholder: "Amount",
				onchange: function () {
					data.amount = this.value;
				}
			}),

			h("div.inner-section-divider-medium"),

			h("button.align-one.btn-primary",{
				onclick: function () {

					state.modePayment.set("viewPayment");
				}
			}, "Back"),

			h("div.inner-section-divider-small"),
			
			h("button#charge.align-two.btn-primary", {
				onclick: function () {

					data.date        = new Date();
					data.category    = "subscription";
					data.description = "Subscription";
					data.member      = state.member().id;

					utils.request({
						method: "POST",
						uri: "/api/payments",
						json: data
					}, function (err, header, body){

						if(err) {
							alert("Could not create subscription yo");
						} else {
							var payments = state.payments();
							payments.push(body);
							state.payments.set(payments);
							state.modePayment.set("viewPayment");
						}
					});
				}
			},"Charge")
		])
	);
};

module.exports.donation = function (state) {

	var data = {};

	return (
		h("div.container-small", [
			h("div.inner-section-divider-small"),

			h("input#amount", {
				placeholder: "Amount",
				onchange: function () {

					data.amount = this.value;
				}
			}),

			h("div.inner-section-divider-small"),

			h("input#notes", {
				placeholder: "Optional note",
				onchange: function () {

					data.notes = this.value;
				}
			}),

			h("div.inner-section-divider-medium"),

			h("button.align-one.btn-primary",{
				onclick: function () {

					state.modePayment.set("viewPayment");
				}
			},"Back"),

			h("div.inner-section-divider-small"),
			
			h("button#charge.align-two.btn-primary", {
				onclick: function () {

					data.date        = new Date();
					data.description = "Donation";
					data.category    = "donation";
					data.member      = state.member().id;

					utils.request({
						method: "POST",
						uri: "/api/payments",
						json: data
					}, function (err, header, body){

						if(err) {
							alert("Could not create donation");
						} else {
							var payments = state.payments();
							payments.push(body);
							state.payments.set(payments);
							state.modePayment.set("viewPayment");
						}
					});
				}
			},"Charge")
		])
	);
};

module.exports.payment = function (state) {
	
	var data = {};
	
	return (
		h("div.container-small", [
			h("div.inner-section-divider-small"),

			h("select#member-controls-payment-type.mb10", {
				style: {
					width: "100%"
				},
				onchange: function () {
					data.type = this.value;
				}
			}, utils.vDomHelpers.renderOptionsSelected(utils.mocks.paymentTypes, "", "Select type")),

			h("div.inner-section-divider-small"),

			h("input#date", {
				placeholder: "Payment date",
				type: "date",
				onchange: function () {

					data.date = this.value;
				}
			}),

			h("div.inner-section-divider-small"),

			h("input#reference", {
				placeholder: "Reference",
				onchange: function () {

					data.reference = this.value;
				}
			}),

			h("div.inner-section-divider-small"),

			h("input#amount", {
				placeholder: "Amount",
				onchange: function () {

					data.amount = this.value;
				}
			}),

			h("div.inner-section-divider-small"),

			h("input#notes", {
				placeholder: "Notes",
				onchange: function () {

					data.notes = this.value;
				}
			}),

			h("div.inner-section-divider-medium"),

			h("button#back.align-one.btn-primary",{
				onclick: function () {

					state.modePayment.set("viewPayment");
				}
			},"Back"),

			h("div.inner-section-divider-small"),
			
			h("button#charge.align-two.btn-primary", {
				onclick: function () {

					data.description = "Payment";
					data.category    = "payment";
					data.member      = state.member().id;

					utils.request({
						method: "POST",
						uri: "/api/payments",
						json: data
					}, function (err, header, body){

						if(err) {
							alert("Could not create payment");
						} else {
							var payments = state.payments();
							payments.push(body);
							state.payments.set(payments);
							state.modePayment.set("viewPayment");
						}
					});

				}
			},"Charge")
		])
	);
};