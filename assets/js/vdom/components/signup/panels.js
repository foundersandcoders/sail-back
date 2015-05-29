"use strict";


var h     = require("virtual-dom/h");
var utils = require("../../app.js").utils;


module.exports.navbar = function (state) {
	
	return (
		h("div.mobile-nav", [
			h("h1", {
				onclick: function () {
					return state.panel.set("home")
				}
			}, "Menu")
		])
	);
}

function progressBar (state, currentMemberInputs) {

	var panels = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
	var currentPanel = state.panel();
	return (
		h("div.progress-bar",
			panels.map(function (panel, i) {

				var switchIndex = panels.indexOf(currentPanel);
				var cl = "div.progress.";
				cl += (i <= switchIndex)  ? "active"   : "inactive";
				cl += (i === switchIndex) ? ".current" : "";

				return h(cl, {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentMemberInputs).toObject();

						state.member.set(memberChanges);
						return state.panel.set(panel);
					}
				});
			})
		)
	);
}


module.exports.home = function (state) {

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "What would you like to do?")
			]),
			h("div.container-small", [
				h("button.btn-primary", {
					onclick: function () {
						return state.panel.set("one")
						// return state.panel.set("account")<
					}
				}, /* View account */"Sign up"),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: function () {
						return state.panel.set("makePayment")
					}
				}, "Make payment"),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: function () {
						return state.panel.set("makeDonation")
					}
				}, "Make donation"),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: function () {
						return state.panel.set("browseEvents")
					}
				}, "Browse events"),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: function () {
						return state.panel.set("home")
					}
				}, "Home"),
				h("div.inner-section-divider-small"),
				h("button.btn-primary", {
					onclick: function () {
						return state.panel.set("logOut")
					}
				}, "Log out"),
			])
		])
	);
};


module.exports.one = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Sign up")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				h("input#email", {
					type:"text",
					name:"primary_email",
					placeholder: "Email address",
					value: currentInputValues.primary_email,
					onkeyup: function () {
						return currentInputValues.primary_email = this.value;
					}
				}),
				h("div.inner-section-divider-small"),
				h("input#confirm-email", {
					type:"text",
					name:"primary_email",
					placeholder: "Confirm email address",
					value: currentInputValues.confirm_email,
					onkeyup: function () {
						return currentInputValues.confirm_email = this.value
					}
				}),
				h("div.inner-section-divider-small"),
				h("input#password", {
					type:"password",
					name:"password",
					placeholder: "Password",
					value: currentInputValues.password,
					onkeyup: function () {
						return currentInputValues.password = this.value;
					}
				}),
				h("div.inner-section-divider-small"),
				h("input#password", {
					type:"password",
					name:"password",
					placeholder: "Confirm password",
					value: currentInputValues.confirm_password,
					onkeyup: function () {
						return currentInputValues.confirm_password = this.value
					}
				}),
				h("div.inner-section-divider-small"),
				h("button#button_sign_up.btn-primary", {
					onclick: function () {

						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("two", "changeycgangecange");
					}
				}, "Next")
			])
		])
	);
};


module.exports.two = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Membership info")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				h("div.input-label-container", [
					h("h2", "Membership number: 4324319")
				]),

				h("div.inner-section-divider-small"),

				h("div.input-label-container", [
					h("h3", "Choose a membership type")
				]),

				h("select.select-signup", {
					onchange: function () {

						return currentInputValues.membership_type = this.value;
					}
				},
					utils.vDomHelpers.renderOptionsSelected(utils.mocks.memberTypes, currentInputValues.membership_type, "Click to select one")
				),

				h("div.inner-section-divider-small"),
				
				h("button.align-one.btn-primary",{
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						return state.panel.set("one")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {

						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("three");
					}
				},"Next")
			])
		])
	);
};


module.exports.three = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Personal details")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				h("div.block", [
					h("input.align-one", {
							type: "text",
							placeholder: "Title",
							value: currentInputValues.title,
							onkeyup: function () {
							return currentInputValues.title = this.value
						}
					}),
					h("input.align-two", {
							type: "text",
							placeholder: "Initials",
							value: currentInputValues.intials,
							onkeyup: function () {
							return currentInputValues.intials = this.value
						}
					})
				]),
				h("div.inner-section-divider-small"),

				h("div.input-label-container", [
					h("h4", "First name or nickname (optional). If you are a couple enter both names eg Dick & Val")
				]),
				h("input", {
					type: "text",
					placeholder: "First name or nickname",
					value: currentInputValues.first_name,
					onkeyup: function () {
						return currentInputValues.first_name = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Last name",
					value: currentInputValues.last_name,
					onkeyup: function () {
						return currentInputValues.last_name = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("button.align-one.btn-primary",{
					onclick: function () {

						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						return state.panel.set("two")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						return state.panel.set("four")
					}
				},"Next")
			]),
		])
	);
};


module.exports.four = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Address details")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				h("input", {
					type: "text",
					placeholder: "Address 1",
					value: currentInputValues.address1,
					onkeyup: function () {
						return currentInputValues.address1 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Address 2",
					value: currentInputValues.address2,
					onkeyup: function () {
						return currentInputValues.address2 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Address 3",
					value: currentInputValues.address3,
					onkeyup: function () {
						return currentInputValues.address3 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Address 4",
					value: currentInputValues.address4,
					onkeyup: function () {
						return currentInputValues.address4 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "County",
					value: currentInputValues.county,
					onkeyup: function () {
						return currentInputValues.county = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Postcode",
					value: currentInputValues.postcode,
					onkeyup: function () {
						return currentInputValues.postcode = this.value
					}
				}),
				
				h("div.inner-section-divider-small"),

				h("button.align-one.btn-primary",{
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("three")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("five")
					}
				},"Next")
			])
		])
	);
};


module.exports.five = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Contact details")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				h("input", {
					type: "text",
					placeholder: "Home phone number",
					value: currentInputValues.home_phone,
					onkeyup: function () {
						return currentInputValues.home_phone = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Mobile number",
					value: currentInputValues.mobile_phone,
					onkeyup: function () {
						return currentInputValues.mobile_phone = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Primary email",
					value: currentInputValues.primary_email,
					disabled: true
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Secondary email",
					value: currentInputValues.secondary_email,
					onkeyup: function () {
						return currentInputValues.secondary_email = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("button.align-one.btn-primary",{
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("four");
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("six");
					}
				},"Next")
			])
		])
	);
};


module.exports.six = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Gift aid declaration")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				h("div.input-label-container", [
					h("h4", "If you sign a Gift Aid Declaration it significantly increases the value of your subscription (and any donations you make). If you would like to sign a Gift Aid Declaration please print the form, sign it and post it to Membership Secretary")
				]),
				h("button.btn-primary",{
					onclick: function () {
						return state.print();
					},
				}, "Print"),

				h("div.inner-section-divider-small"),

				h("button.align-one.btn-primary",{
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("five")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("seven")
					}
				},"Next")
			])
		])
	);
};


module.exports.seven = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Notifications")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [

				h("div.input-label-container", [
					h("h2", "Keeping in touch"),
					h("h4", "Because it’s much easier (and cheaper) for us, we’ll send you information about Events and things by email.  If you’d prefer us to do it by post please tick the box.")
				]),

				h("select.select-signup", {
					onchange: function () {
						return currentInputValues.news_type = this.value;
					}
				}, 
					utils.vDomHelpers.renderOptionsSelected(utils.mocks.newsType, currentInputValues.news_type, "Click to select one")
				),

				h("div.inner-section-divider-small"),

				h("button.align-one.btn-primary",{
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("six")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("eight")
					}
				},"Next")
			])
		])
	);
};


module.exports.eight = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Member information")
			]),
			progressBar(state, currentInputValues),
			h("div.container-small", [
				list(currentInputValues),

				h("div.inner-section-divider-small"),

				h("button.align-one.btn-primary",{
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("seven")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("home")
					}
				},"Confirm")
			])
		])
	);

	function list (member) {

		var propertiesMapper = [
			{ prop: "title",           desc: "Title" },
			{ prop: "initials",        desc: "Initials" },
			{ prop: "first_name",      desc: "First name" },
			{ prop: "last_name",       desc: "Last name" },
			{ prop: "address1",        desc: "Address 1" },
			{ prop: "address2",        desc: "Address 2" },
			{ prop: "address3",        desc: "Address 3" },
			{ prop: "address4",        desc: "Address 4" },
			{ prop: "county",          desc: "County" },
			{ prop: "postcode",        desc: "Postcode" },
			{ prop: "home_phone",      desc: "Home phone" },
			{ prop: "mobile_phone",    desc: "Mobile phone" },
			{ prop: "primary_email",   desc: "Primary email" },
			{ prop: "secondary_email", desc: "Secondary email" },
			{ prop: "membership_type", desc: "Membership type" },
			{ prop: "news_type",       desc: "News type" }
		];
		
		return propertiesMapper.map(function (elm) {
			return (
				h("div.details-list", [
					h("div.block", [
						h("p.left", elm.desc),
						h("p.right", member[elm.prop])
					])
				])
			)
		});

		// return (
		// 	Object
		// 	.keys(member)
		// 	.map(function (key) {
		// 		return (
		// 			h("div.details-list", [
		// 				h("div.block", [
		// 					h("p.left", key),
		// 					h("p.right", member[key])
		// 				])
		// 			])
		// 		)
		// 	});
		// )
	}
};