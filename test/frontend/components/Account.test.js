'use strict';


var jsdom        = require('jsdom');
var test         = require('tape');
var createMocks  = require('../../helpers/createMocks.js');
var decache      = require('decache');


test('Account component', function (t) {

	t.test('initial state render', function (st) {

		st.plan(8);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				delete global.window;
				delete global.document;

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				// decache('../../../assets/js/vdom/pages/Account.js');
				var nuclear = require('nuclear.js');
				var Home    = require('../../../assets/js/vdom/pages/Home.js');
				var Account = require('../../../assets/js/vdom/pages/Account.js');

				var initialState = {
					member: createMocks.member()
				};

				var state = Home(initialState);

				nuclear.app(global.document.body, state, Account.home, {
					document: global.document
				});

				st.equals($('p:contains("Date")').text(), 'Date', 'date column');
				st.equals($('p:contains("Description")').text(), 'Description', 'Description column');
				st.equals($('p:contains("Charge")').text(), 'Charge', 'Charge column');
				st.equals($('p:contains("Due")').text(), 'Due', 'Due column');

				st.equals($('.row p.micro').get(0).innerHTML, '11 Aug 11', 'first date come first');
				st.equals($('.row p.micro').get(1).innerHTML, String(initialState.member.payments[0].description), 'first description');
				st.equals($('.row p.micro').get(2).innerHTML, String(initialState.member.payments[0].amount), 'first amount');
				st.equals($('.row p.micro').get(3).innerHTML, String(initialState.member.payments[0].amount), 'first balance due');
			}
		});
	});

	t.test('#refundRender', function (st) {

		st.plan(6);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				delete global.window;
				delete global.document;

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				// decache('../../../assets/js/vdom/pages/Account.js');
				var nuclear = require('nuclear.js');
				var Home    = require('../../../assets/js/vdom/pages/Home.js');
				var Account = require('../../../assets/js/vdom/pages/Account.js');

				var initialState = {
					member: createMocks.member(),
					redirectTo: function (state, path) {

						st.equals(path, '/account/refund', 'redirect to refund');
					}
				};

				initialState.member.payments = [
					createMocks.payment({
						date: '10-10-10'
					})
				];

				var state = Home(initialState);

				nuclear.app(global.document.body, state, Account.home, {
					document: global.document
				});

				st.equals($('.row p.micro').get(0).innerHTML, '10 Oct 10', 'first date come first');
				st.equals($('.row p.micro').get(1).innerHTML, String(initialState.member.payments[0].description), 'first description');
				st.equals($('.row p.micro').get(2).innerHTML, String(initialState.member.payments[0].amount), 'first amount');
				st.equals($('.row p.micro').get(3).innerHTML, '-' + String(initialState.member.payments[0].amount), 'first balance due');

				st.equals($('button:contains("Refund options")').text(), 'Refund options', 'Refund options available');

				$('button:contains("Refund options")').click();
			}
		});
	});

	t.test('#expireAnnualSubscription', function (st) {

		st.plan(2);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				delete global.window;
				delete global.document;

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				// decache('../../../assets/js/vdom/pages/Account.js');
				var nuclear = require('nuclear.js');
				var Home    = require('../../../assets/js/vdom/pages/Home.js');
				var Account = require('../../../assets/js/vdom/pages/Account.js');

				var initialState = {
					member: createMocks.member()
				};

				var state = Home(initialState);

				nuclear.app(global.document.body, state, Account.home, {
					document: global.document
				});

				st.equals($('h3').text(), 'Subscription', 'Subscription option available');
				st.equals($('h4').text(), 'Your annual subscription is due on 12-12-2012 pay it now?', 'Subscription message');
			}
		});
	});
});