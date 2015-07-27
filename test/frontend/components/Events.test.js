'use strict';


var jsdom        = require('jsdom');
var test         = require('tape');
var createMocks  = require('../../helpers/createMocks.js');
var toHTML       = require('vdom-to-html');
var cheerio      = require('cheerio');
var decache      = require('decache');


test('Events component', function (t) {

	t.test('#homeEvents', function (st) {

		st.plan(2);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				// decache('nuclear.js');
				// decache('../../../assets/js/vdom/pages/Home.js');
				// decache('../../../assets/js/vdom/pages/Account.js');
				var nuclear = require('nuclear.js');
				var Home    = require('../../../assets/js/vdom/pages/Home.js');
				var Events  = require('../../../assets/js/vdom/pages/Events.js');

				var initialState = {
					member: createMocks.member(),
					events: createMocks.getEvents(),
					redirectTo: function (state, path) {

						st.equals(path, '/event/4', 'redirect to refund');
					}
				};

				var state = Home(initialState);

				nuclear.app(global.document.body, state, Events.home, {
					document: window.document
				});

				st.equals($('h3').text(), 'Party in LondonToday at WilVisit at Chichester', 'events title');

				$('button:contains("View details")').last().click();
			}
		});
	});

	t.test('#showDetails', function (st) {

		st.plan(2);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				decache('nuclear.js');
				decache('../../../assets/js/vdom/pages/Home.js');
				decache('../../../assets/js/vdom/pages/Account.js');
				var nuclear = require('nuclear.js');
				var Home    = require('../../../assets/js/vdom/pages/Home.js');
				var Events  = require('../../../assets/js/vdom/pages/Events.js');

				var initialState = {
					member: createMocks.member(),
					events: createMocks.getEvents()
				};

				var state = Home(initialState);

				nuclear.app(global.document.body, state, Home.render, {
					document: window.document
				});

				state.channels.redirectTo(state, "/event/4");

				process.nextTick(function () {

					st.equals($('h1').text(), 'Visit at Chichester', 'events title');					
					st.equals($('.image').css('background-image'), 'url(http://mtbl1.vm.bytemark.co.uk/familydaysout/wp-content/uploads/Chichester-Solar-Boat-Harbour-8.jpg)', 'right background-image');
				});
			}
		});
	});

	// t.test('#renderBooking', function (st) {

	// 	st.plan(2);

	// 	jsdom.env('', {
	// 		virtualConsole: jsdom.createVirtualConsole().sendTo(console),
	// 		scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
	// 		done: function (errors, window) {

	// 			var $           = window.$;
	// 			global.window   = window;
	// 			global.document = window.document;

	// 			decache('nuclear.js');
	// 			decache('../../../assets/js/vdom/pages/Home.js');
	// 			decache('../../../assets/js/vdom/pages/Account.js');
	// 			var nuclear = require('nuclear.js');
	// 			var Home    = require('../../../assets/js/vdom/pages/Home.js');
	// 			var Events  = require('../../../assets/js/vdom/pages/Events.js');

	// 			var initialState = {
	// 				member: createMocks.member(),
	// 				events: createMocks.getEvents()
	// 			};

	// 			var state = Home(initialState);

	// 			nuclear.app(global.document.body, state, Home.render, {
	// 				document: window.document
	// 			});

	// 			state.channels.redirectTo(state, "/event/4/booking");

	// 			process.nextTick(function () {

	// 				st.equals($('h1').text(), 'Visit at Chichester', 'events title');					
	// 				st.equals($('.image').css('background-image'), 'url(http://mtbl1.vm.bytemark.co.uk/familydaysout/wp-content/uploads/Chichester-Solar-Boat-Harbour-8.jpg)', 'right background-image');
	// 			});
	// 		}
	// 	});		
	// });
});