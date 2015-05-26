"use strict";

var h = require("virtual-dom/h");


module.exports = {
	index: index,
	view: view
};

function index (utils, state) {

	var that = {};

	that.render = function () {

		return view(state.member(), state.toggleMode, utils);
	};

	that.getData = function () {

		utils.request(utils.createOpts("GET"), function (e, h, b) {

			var member = JSON.parse(b);
			state.member.set(member);
		});
	};

	that.getData();

	return that;
};


function view (data, toggleFn, utils) {

	return ([
		h("div.member-info-controls", [
			h("button#edit-member-mode.button-two.m-l-15.right.w-100",{
				onclick: toggleFn
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
				check("Name: ", fullName.call(member)),
				check("ID: ", member.id),
				check("Primary email: ", member.primary_email),
				check("Secondary email: ", member.secondary_email),
				check("Bounced email: ", member.email_bounced),
				check("News: ", (member.news_type === "post" ? "Post" : "Online")),
				check("Status: ", member.status),
				[(
					(member.status !== "deleted")
					? undefined 
					: h("span", [
						check("Deletion date:", utils.moment(member.deletionDate).format("DD-MM-YY")),
						check("Deletion reason: ", member.deletion_reason)
					])
				)]
			])
		]);
	}

	function renderAddressInfo (member) {

		return ([
			h("div.col-2", [
				h("h2", "Address info"),
				check("Address line: ", member.address1),
				check("Address line: ", member.address2),
				check("Address line: ", member.address3),
				check("Address line: ", member.address4),
				check("Address line: ", member.address5),
				check("County: ", member.county),
				check("Postcode: ", member.postcode),
				check("Deliverer: ", member.deliverer),
				check("Home phone: ", member.home_phone),
				check("Work phone: ", member.work_phone),
				check("Mobile phone: ", member.mobile_phone)
			])
		]);
	}

	function renderMembership (member) {

		return ([
			h("div.col-3", [
				h("h2", "Membership info"),
				check("Date joined: ", utils.moment(member.date_joined).format("DD-MM-YYYY")),
				check("Membership type: ", replaceNice.call(null, (member.membership_type || ""))),
				[(
					(member.membership_type === "life-double" || member.membership_type === "life-single")
					? check("Life payent date: ", member.life_payment_date)
					: undefined
				)],
				[(
					(member.dateTypeChanged && (member.membership_type === "life-double" || member.membership_type === "life-single"))
					? (check("Life payment date: ", member.life_payment_date), check("Membership date changed: ", member.date_type_changed))
					: undefined
				)],
				[(
					(member.gift_aid_signed !== undefined)
					? check("GAD Signed: ", utils.moment(member.date_gift_aid_signed).format("DD-MM-YYYY"))
					: undefined
				)],
				[(
					(member.date_gift_aid_cancelled !== undefined)
					? check("GAD cancelled: ", utils.moment(member.date_gift_aid_cancelled).format("DD-MM-YYYY"))
					: undefined
				)],
				check("Standing order: ", (member.standing_order) ? "Yes" : "No" ),
				check("Notes: ", member.notes),
				check("Status online: ", (member.registered ? "Registered" : "Unregistered")),
				check("Due date: ", utils.moment(member.due_date).format("DD-MMM"))
			])
		]);
	}

	function check (name, elm) {
		if(elm) {
			return h("p", [
				h("span.info", name),
				h("span#view-member-" + replaceSpaceColon.call(name), elm)
			]);
		}
	}

	function replaceSpaceColon (){

		return this.toLowerCase().replace(" ", "-").replace(":", "");
	}

	function replaceNice (string) {

		return string.replace("-", " ").split(" ").map(function (elm){
			return elm.charAt(0).toUpperCase() + elm.slice(1);
		}).join(" ");
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