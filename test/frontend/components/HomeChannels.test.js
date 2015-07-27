'use strict';


var jsdom        = require('jsdom');
var test         = require('tape');
var createMocks  = require('../../helpers/createMocks.js');
var decache      = require('decache');

test('Home channels', function (t) {

	t.test('Redirect to', function (st) {

		st.plan(1);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				var nuclear = require('nuclear.js');
				var Home = require('../../../assets/js/vdom/pages/Home.js');

				var state = Home({});

				state.channels.redirectTo(state, '/path');

				st.equals(global.window.location.hash, '#/path', 'path updated');
			}
		});
	});

	t.test('Update profile triggers update and redirect channels', function (st) {

		st.plan(5);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				var nuclear = require('nuclear.js');
				var Home = require('../../../assets/js/vdom/pages/Home.js');

				var initialState = {
					member:     createMocks.member(),
					redirectTo: function (state, path) {

						st.equals(state.member().last_name, 'Bar', 'state updated');
						st.equals(path, '/profile', 'redirect to profile');
					}
				};

				var state = Home(initialState);

				var fake = {
					request: function (opts, callback) {

						st.equals(opts.method, 'PUT', 'right method');
						st.equals(opts.uri, '/api/account', 'right uri endpoint');
						st.equals(opts.json, initialState.member, 'right data body');
						callback(null, '', '{"last_name": "Bar"}');
					}
				}

				state.channels.updateProfile(state, initialState.member, fake);
			}
		});
	});

	t.test('Forgot password', function (st) {

		st.plan(4);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				var nuclear = require('nuclear.js');
				var Home = require('../../../assets/js/vdom/pages/Home.js');

				var initialState = {
					member:     createMocks.member(),
					redirectTo: function (state, path) {

						st.equals(path, '/forgot', 'redirect to profile');
					}
				};

				var state = Home(initialState);

				var fake = {
					request: function (opts, callback) {

						st.equals(opts.method, 'POST', 'right method');
						st.equals(opts.uri, '/forgotPassword', 'right uri endpoint');
						st.equals(opts.json, initialState.member, 'right data body');
						callback(null, '', '{"emailSent": true}');
					}
				}

				state.channels.forgotPassword(state, initialState.member, fake);
			}
		});
	});

	t.test('Create member', function (st) {

		st.plan(4);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				var nuclear = require('nuclear.js');
				var Home = require('../../../assets/js/vdom/pages/Home.js');

				var initialState = {
					member:     createMocks.member()
				};

				var state = Home(initialState);

				state(function listener (newState) {

					st.equals(newState.panel, 'checkEmail', 'state panel updated');
				});

				var fake = {
					request: function (opts, callback) {

						st.equals(opts.method, 'POST', 'right method');
						st.equals(opts.uri, '/signup', 'right uri endpoint');
						st.equals(opts.json, initialState.member, 'right data body');
						callback(null, '', JSON.stringify(initialState.member));
					}
				}

				state.channels.createMember(state, initialState.member, fake);
			}
		});
	});

	t.test('Create charge', function (st) {

		st.plan(5);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				var nuclear = require('nuclear.js');
				var Home = require('../../../assets/js/vdom/pages/Home.js');

				var initialState = {
					member: createMocks.member(),
					redirectTo: function (state, path) {

						st.equals(path, '/account', 'redirect to profile');
					}
				};

				var eventInfo = createMocks.eventItem();

				var state = Home(initialState);

				var fake = {
					request: function (opts, callback) {

						st.equals(opts.method, 'POST', 'right method');
						st.equals(opts.uri, '/book_event', 'right uri endpoint');
						st.equals(opts.json.eventItem, eventInfo, 'right data eventInfo');
						st.equals(opts.json.total, 20, 'right data total');
						callback(null, '', JSON.stringify(eventInfo));
					}
				}

				state.channels.createCharge(state, 20, eventInfo, fake);
			}
		});
	});
});