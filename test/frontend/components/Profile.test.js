'use strict';

var nuclear      = require('nuclear.js');
var jsdom        = require('jsdom');
var test         = require('tape');
var createMocks  = require('../../helpers/createMocks.js');
var mockMember   = createMocks.member();
var decache      = require('decache');
decache('nuclear.js');

test('Profile component', function (t) {


	t.test('Check render component: ', function (st) {

		st.plan(4);

		jsdom.env('', {
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				var nuclear = require('nuclear.js');
				var Profile = require('../../../assets/js/vdom/components/Profile.js');

				var state = nuclear.observS({
					member: nuclear.observS(mockMember),
					channels: { 
						redirectTo: function (state, path) {},
						updateProfile: function (state, updateProfile) {}
					}
				});

				nuclear.app(window.document.body, state, Profile.show, {
					document: window.document
				});


				st.equals($('h1').text(), 'Account info', 'right title');
				st.equals($('p#value-last_name').text(), mockMember.last_name, 'right last name');
				st.equals($('p#value-primary_email').text(), mockMember.primary_email, 'right email');
				st.equals($('p#value-secondary_email').text(), '', 'no secondary email');
			}
		});
	});

	t.test('From normal mode to edit mode', function (st) {

		st.plan(1);

		jsdom.env('', {
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				var nuclear = require('nuclear.js');
				var Profile = require('../../../assets/js/vdom/components/Profile.js');

				var state = nuclear.observS({
					member: nuclear.observS(mockMember),
					channels: {
						updateProfile: function (state, updateProfile) {},
						redirectTo: function (state, path) {

							st.equals(path, '/profile/edit', 'redirect to modify');
						}
					}
				});

				nuclear.app(window.document.body, state, Profile.show, {
					document: window.document
				});

				$('button:contains("Modify")').click();
			}
		});
	});

	t.test('Edit mode', function (st) {

		st.plan(2);

		jsdom.env('', {
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				var nuclear = require('nuclear.js');
				var Profile = require('../../../assets/js/vdom/components/Profile.js');

				var state = nuclear.observS({
					member: nuclear.observS(mockMember),
					channels: { 
						redirectTo: function (state, path) {},
						updateProfile: function (state, updateProfile) {

						}
					}
				});

				nuclear.app(window.document.body, state, Profile.edit, {
					document: window.document
				});

				st.equals($('input#last_name').val(), 'Hoxhaj', 'input with right value last name');
				st.equals($('select#membership_type').val(), 'annual-double', 'right membership type');
			}
		});
	});

	t.test('Update profile function', function (st) {

		st.plan(6);

		jsdom.env('', {
			virtualConsole: jsdom.createVirtualConsole().sendTo(console),
			scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
			done: function (errors, window) {

				var $           = window.$;
				global.window   = window;
				global.document = window.document;

				var nuclear = require('nuclear.js');
				var Profile = require('../../../assets/js/vdom/components/Profile.js');

				var state = nuclear.observS({
					member: nuclear.observS(mockMember),
					channels: { 
						redirectTo: function (state, path) {},
						updateProfile: function (state, updateProfile) {

							st.equals(updateProfile.last_name, 'Shyti', 'data right value last name');
							st.equals(updateProfile.membership_type, 'corporate-annual', 'data right membership type');
						}
					}
				});

				nuclear.app(window.document.body, state, Profile.edit, {
					document: window.document
				});

				st.equals($('input#last_name').val(), 'Hoxhaj', 'input with right value last name');
				st.equals($('select#membership_type').val(), 'annual-double', 'right membership type');

				$('input#last_name').val('Shyti');
				$('select#membership_type').val('corporate-annual');

				st.equals($('input#last_name').val(), 'Shyti', 'input with right value last name');
				st.equals($('select#membership_type').val(), 'corporate-annual', 'right membership type');

				$('input#last_name').trigger('change');
				$('select#membership_type').trigger('change');

				$('button:contains("Save")').click();
			}
		});
	});
});