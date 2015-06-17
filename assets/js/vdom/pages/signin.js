"use strict";

var nuclear   = require("../nuclear.js");
var utils     = require("../utils.js");
var Messenger = require("../components/Messenger.js");

module.exports = SignInApp;

var route;

function SignInApp () {

	var state = nuclear.observS({
		error:    nuclear.observS({}),
		route:    nuclear.observ(""),
		number:   nuclear.observ(""),
		email:    nuclear.observ(""),
		password: nuclear.observ(""),
		panel:    nuclear.observ(""),
		channels: {
			forgotPassword: forgotPassword
		}
	});

	route = nuclear.router(state);

	return state;
}

function forgotPassword (state, member) {

	nuclear.request({
		method: "POST",
		uri: "/forgotPassword",
		json: member
	}, function (err, header, body) {

		if(err) {
			alert("Could not send request");
		} else if (body.emailSent) {

			window.location.hash = "forgot";
			// state.route.set("/forgot");
		} else {

			state.error.set({message: body.error});
		}
	});
}


SignInApp.render = function (state) {
	
	var h = nuclear.h;

	return (
		h("div", [
			(!!state.error().message ? Messenger.render(state) : ""),
			route("/", signin),
			route("/forgot", forgotPass)
		])
	);

	function signin (state) {

		var data = {};

		return (
			h("div.main-container", [
				h("div.inner-section-divider-small"),
				h("div.section-label", [
					h("h1", "Sign in")
				]),
				h("div.container-small", [
					h("div.inner-section-divider-medium"),
					h("div.input-label-container", [
						h("h3", "Membership number")
					]),
					h("form", {
						action: "/signin",
						method: "POST"
					}, [
						h("input#number", {
							type:"text",
							// name: "username",
							placeholder: "Membership number",
							onchange: function () {
								return data.membership_number = this.value;
							}
						}),
						h("div.inner-section-divider-small"),
						h("div.input-label-container", [
							h("h3", "...or email")
						]),
						h("input#email", {
							type:"text",
							name: "username",
							placeholder: "Email address",
							onchange: function () {
								return data.email = this.value
							}
						}),
						h("div.inner-section-divider-small"),
						h("input#password", {
							type:"password",
							name: "password",
							placeholder: "Password",
							onchange: function () {
								return data.password = this.value;
							}
						}),
						h("div.inner-section-divider-medium"),
						h("div.input-label-container", [
							h("a", {
								href: "#forgot",
								onclick: function (event) {

									event.preventDefault();

									state.channels.forgotPassword(state, data);
								}
							}, "Forgot password"),
							h("h4", "If you are an existing member who is logging in for the first time please click 'Forgot Password' and we’ll email you a temporary one.")
						]),
						h("div.inner-section-divider-medium"),
						h("button#signin-btn.btn-primary", {
							type: "submit"
						}, "Sign in")
					])
				])
			])
		);
	}

	function forgotPass (state) {

		return (
			h("div.main-container", [
				h("div.inner-section-divider-small"),
				h("div.section-label", [
					h("h1", "Sign in")
				]),
				h("div.container-small", [
					h("div.inner-section-divider-medium"),
					h("div.input-label-container", [
						h("h3", "We just emailed you a provisional password")
					]),
					h("div.inner-section-divider-medium"),
					h("button#button_sign_up.btn-primary", {
						onclick: function () {

							window.location.hash = "";
						}
					}, "Continue")
				])
			])
		);
	}
}


nuclear.app(document.querySelector("#signin-component"), SignInApp(), SignInApp.render);


// var panelViews = require("../components/authorization/signin.js");
// module.exports = function (utils) {

// 	var state = utils.observS({
// 		member: utils.observS({}),
// 		panel:  utils.observ("signIn")
// 	});

// 	state(function onchange (currentState) {

// 		render();
// 	});

// 	// returns current virtual dom object
// 	function view () {

// 		return (
// 			utils.h("div", [
// 				// panelViews.navbar(state),
// 				panelViews[state.panel()](state)
// 			])
// 		);
// 	}

// 	// virtual dom data
// 	var virtualTree, resultsNode, initial = true;
	
// 	function render () {

// 		if(initial){
// 			virtualTree = view();
// 			resultsNode = utils.createElement(virtualTree);
// 			initial     = false;
// 			return resultsNode;
// 		} else {
// 			var newResults = view();
// 			var patches    = utils.diff(virtualTree, newResults);
// 			resultsNode    = utils.patch(resultsNode, patches);
// 			virtualTree    = resultsNode;
// 		}
// 	}

// 	try {
// 		document.querySelector("#signin-component").appendChild(render());
// 	} catch (e) {
// 		console.log("Sign in page err: ", e);
// 	}
// };