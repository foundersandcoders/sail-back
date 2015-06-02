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
			h("div.container-small", [
				h("div.inner-section-divider-medium"),
				h("button.btn-primary", {
					onclick: function () {
						if (state.member().registered === 'registered') {

							return state.panel.set("account");
						} else {

							return state.panel.set("one");
						}
					}
				}, (state.member().registered === 'registered' ? "View account" : "Sign up")),
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

module.exports.account = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Account info")
			]),
			h("div.container-small", [

				h("div.inner-section-divider-medium"),

				list(currentInputValues),

				h("div.inner-section-divider-medium"),

				h("button.align-one.btn-primary",{
					onclick: function () {
						state.panel.set("editAccount")
					}
				}, "Modify"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						state.panel.set("home");
					}
				}, "Home")
			])
		])
	);

	function list (member) {

		var propertiesMapper = utils.mocks.memberPropsMapper;

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
	}
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
				h("div.inner-section-divider-medium"),
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

	function renderPrice(member) {

		if(utils.is.ok(member.membership_type)) {

			var index = utils.mocks.memberTypes
				.map(function (e){return e.value})
				.indexOf(member.membership_type);

			return (
				h("div", [
					h("div.inner-section-divider-small"),
					h("h3", "Membership details"),
					h("input", {
						type: "text",
						value: utils.mocks.memberTypes[index].description,
						disabled: true
					})
				])
			);
		}
	}

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

						currentInputValues.membership_type = this.value;
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();
						state.member.set(memberChanges);
					}
				},
					utils.vDomHelpers.renderOptionsSelected(utils.mocks.memberTypes, currentInputValues.membership_type, "Click to select one")
				),

				renderPrice(currentInputValues),

				h("div.inner-section-divider-medium"),
				
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
							value: currentInputValues.initials,
							onkeyup: function () {
							return currentInputValues.initials = this.value
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

				h("div.inner-section-divider-medium"),

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
					onchange: function () {
						return currentInputValues.address1 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Address 2",
					value: currentInputValues.address2,
					onchange: function () {
						return currentInputValues.address2 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Address 3",
					value: currentInputValues.address3,
					onchange: function () {
						return currentInputValues.address3 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Address 4",
					value: currentInputValues.address4,
					onchange: function () {
						return currentInputValues.address4 = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "County",
					value: currentInputValues.county,
					onchange: function () {
						return currentInputValues.county = this.value
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Postcode",
					value: currentInputValues.postcode,
					onchange: function () {
						return currentInputValues.postcode = this.value
					}
				}),
				
				h("div.inner-section-divider-medium"),

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
					onchange: function () {
						return currentInputValues.home_phone = this.value;
					}
				}),

				h("div.inner-section-divider-small"),

				h("input", {
					type: "text",
					placeholder: "Mobile number",
					value: currentInputValues.mobile_phone,
					onchange: function () {
						return currentInputValues.mobile_phone = this.value;
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
					onchange: function () {
						return currentInputValues.secondary_email = this.value
					}
				}),

				h("div.inner-section-divider-medium"),

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

				h("div.inner-section-divider-medium"),

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

				h("div.inner-section-divider-medium"),

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


module.exports.eight = function (state, createMember) {

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

				h("div.inner-section-divider-medium"),

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

						createMember(memberChanges, function (err, member) {

							if(err) {

								return state.panel.set("sorryError");
							}

							state.member.set(member);
							state.panel.set("checkEmail");
						});
					}
				},"Confirm")
			])
		])
	);

	function list (member) {

		var propertiesMapper = utils.mocks.memberPropsMapper;

		return propertiesMapper.map(function (elm) {
			return (
				h("div.details-list", [
					h("div.block", [
						h("p.left.meta", elm.desc),
						h("p.right", member[elm.prop])
					])
				])
			)
		});
	}
};

module.exports.editAccount = function (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Member information")
			]),
			h("div.container-small", [

				h("div.inner-section-divider-medium"),

				listInputs(currentInputValues),

				h("div.inner-section-divider-medium"),
				
				h("button.align-one.btn-primary",{
					onclick: function () {
						
						state.panel.set("account")
					}
				},"Back"),

				h("div.inner-section-divider-small"),
				
				h("button.align-two.btn-primary", {
					onclick: function () {
						var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject();

						state.member.set(memberChanges);
						state.panel.set("account");
					}
				},"Save")
			])
		])
	);

	function listInputs (member) {

		var propertiesMapper = utils.mocks.memberPropsMapper;

		return propertiesMapper.map(function (elm) {
			return (
				h("div.details-list.no-border", [
					h("div.block", [
						h("p.left.meta", elm.desc),
						(
							elm.select === true 
							? renderSelect(elm.options, member[elm.prop], "Click to select one", elm, member) 
							: renderInput(elm, member)
						)
					])
				])
			)
		});
	}

	function renderInput (elmType, memberObj) {

		return (
			h("input", {
				type: "text",
				placeholder: elmType.desc,
				value: memberObj[elmType.prop],
				onchange: function () {
					return memberObj[elmType.prop] = this.value;
				}
			})
		);
	}

	function renderSelect (options, selectedOption, placeholder, elmType, memberObj) {

		return (
			h("select.select-signup", {
				onchange: function () {

					memberObj[elmType.prop] = this.value;
				}
			},
				utils.vDomHelpers.renderOptionsSelected(options, selectedOption, placeholder)
			)
		);
	}
};

module.exports.checkEmail = function (state) {

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Welcome!")
			]),
			h("div.container-small", [
				h("div.inner-section-divider-medium"),
				h("div.input-label-container", [
					h("h3", "We have just send you and email to validate your information.")
				]),
				h("div.inner-section-divider-medium"),
				h("button#button_sign_up.btn-primary", {
					onclick: function () {

						state.panel.set("home");
					}
				}, "Continue")
			])
		])
	);
};

module.exports.sorryError = function (state) {

	return (
		h("div.main-container", [
			h("div.inner-section-divider-small"),
			h("div.section-label", [
				h("h1", "Sorry!")
			]),
			h("div.container-small", [
				h("div.inner-section-divider-medium"),
				h("div.input-label-container", [
					h("h3", "Apparently there was a problem! Wil is working on that!")
				]),
				h("div.inner-section-divider-medium"),
				h("button#button_sign_up.btn-primary", {
					onclick: function () {

						state.panel.set("home");
					}
				}, "Continue")
			])
		])
	);
};