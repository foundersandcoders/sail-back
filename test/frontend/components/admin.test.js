'use strict'

var nuclear = require('nuclear.js');
var jsdom = require('jsdom');
var test = require('tape');
var createMocks = require('../../helpers/createMocks.js');
var mockMember = createMocks.member();
var Admin = require('../../../assets/js/vdom/pages/admin.js');

test('Admin component', function (t) {

  t.test('Check render component: ', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],

      done: function (errors, window) {

        var $ = window.$;
        global.window = window;
        global.document = window.document;

        var state = Admin({
          member: mockMember,
	  payments: mockMember.payments,
          modeMember: 'view',
          modePayment: 'view'
        });

        nuclear.app(window.document.body, state, Admin.render, {
          document: global.document
        });

	// member is displaying
	st.equals($('#view-member-id').text(), '9999', 'member id displaying');
	st.equals($('#view-member-full_name').text(), 'Mr B H Hoxhaj', 'member name displaying');

	// payments are displaying
	st.equals($('.payment-row').length, mockMember.payments.length, 'correct number of payments');
	st.equals($('#member-payment-charges', $('.payment-row').last()).text(), mockMember.payments[0].amount.toString(), 'correct amount');

        st.end();
      }
    });
  });

  test('click sections', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
      done: function (errors, window) {

	var $ = window.$;
        global.window = window;
        global.document = window.document;

        var state = nuclear.observS({
          member: nuclear.observS(mockMember),
          modeMember: nuclear.observ('view'),
          modePayment: nuclear.observ('view'),
          events: nuclear.observA([]),
          payments: nuclear.observA([]),
          bookings: nuclear.observA([])
        });

        nuclear.app(window.document.body, state, Admin.render, {
          document: global.document
        });

	st.test('subscription section', function (assert) {
	
          // select button and click ...
          $('#subscription_btn').click();
	  var section = $('.subscription-section');
          assert.equals(section.length, 1, 'subscription section rendered');

          $('#amount', section).text('100');
	  assert.equals($('#amount').text(), '100', 'text input filled');

	  $('#view-payment-btn').click();
	  section = $('.subscription-section');
	  assert.equals(section.length, 0, 'subscription section no longer rendered');
	  
          assert.end();
	});

	st.test('donation section', function (assert) {
	
          // select button and click ...
          $('#donation_btn').click();
	  var section = $('#donation-section');
          assert.equals(section.length, 1, 'donation section rendered');

          $('#amount', section).text('100');
	  assert.equals($('#amount').text(), '100', 'text input filled');

	  $('#view-payment-btn').click();
	  section = $('#donation-section');
	  assert.equals(section.length, 0, 'donation section no longer rendered');
	  
          assert.end();
	});

	st.test('payment section', function (assert) {
	
          // select button and click ...
          $('#payment_btn').click();
	  var section = $('#payment-section');
          assert.equals(section.length, 1, 'payment section rendered');

          $('#amount', section).text('100');
	  assert.equals($('#amount').text(), '100', 'text input filled');

	  $('#back').click();
	  section = $('#payment-section');
	  assert.equals(section.length, 0, 'payment section no longer rendered');
	  
          assert.end();
	});

	st.end();
      }
    });
  });

  t.test('edit member fields', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
      done: function (errors, window) {

        var $ = window.$;
        global.window = window;
        global.document = window.document;

        var state = Admin({
          member: mockMember,
	  payments: mockMember.payments,
          modeMember: 'view',
          modePayment: 'view'
        });

        nuclear.app(window.document.body, state, Admin.render, {
          document: global.document
        });

	// go to edit member mode
	$('#edit-member-mode').click();
	st.equals($('#edit-member-section').length, 1, 'edit section loaded');

	$('#edit-member-cancel').click();
	st.equals($('#edit-member-section').length, 0, 'edit section removed');
	
        st.end();
      }
    });
  });

  t.test('events section', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
      done: function (errors, window) {

        var $ = window.$;
        global.window = window;
        global.document = window.document;

	var evs = createMocks.getEvents();
	
        var state = Admin({
          member: mockMember,
	  payments: mockMember.payments,
	  events: evs,
          modeMember: 'view',
          modePayment: 'view'
        });

        nuclear.app(window.document.body, state, Admin.render, {
          document: global.document
        });

	var section = $('#events-section');
	st.equals(section.length, 1, 'events section rendered');
	st.equals($('.event-row', section).length, evs.length, 'all events showing');
	
	st.end();
      }
    });
  });
  
  t.end();
});
