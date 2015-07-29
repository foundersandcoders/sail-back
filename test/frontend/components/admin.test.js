'use strict'

var nuclear = require('nuclear.js');
var jsdom = require('jsdom');
var test = require('tape');
var createMocks = require('../../helpers/createMocks.js');
var mockMember = createMocks.member();
var decache = require('decache');
decache('nuclear.js');

test('Admin component', function (t) {

  t.test('Check render component: ', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],

      done: function (errors, window) {

        var $ = window.$;
        global.window = window;
        global.document = window.document;

        var nuclear = require('nuclear.js');
        var Admin = require('../../../assets/js/vdom/pages/admin.js');

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
/*
  test('subscription section', function (st) {

    jsdom
    
  });
*/
  /*
  test('Click sections', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],

      done: function (errors, window) {

        var $ = window.$;
        global.window = window;
        global.document = window.document;

        var nuclear = require('nuclear.js');
        var Admin = require('../../../assets/js/vdom/pages/admin.js');

        var state = nuclear.observS({
          member: nuclear.observS(mockMember),
          modeMember: nuclear.observ('subscription'),
          modePayment: nuclear.observ('donation'),
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
          assert.equals($('#amount').length, 1, 'input amount exists');

          $('#amount').text('100');
          // TODO -- NOTE TO SELF: Don't try to send real request
          $('#view-payment-btn').click();

          assert.equals($('.payment-row').length, 1, "one payment exists");
          assert.equals($('#member-payment-charges'), '100', 'payment amount is correct');
          
          assert.end();
        });

        st.test('donation section', function (assert) {

          // select button and click
          $('#donation_btn').click();
          assert.equals($('#charge').length, 1, 'input charge exists');
          assert.end();
        });

        st.test('payment section', function (assert) {

          $('#payment_btn').click()
          assert.equals($('#date').length, 1, 'input date exists');
          assert.end();
        });
        
        st.end();
      }
    });
  });

  test('test edit member', function (st) {

    jsdom.env('', {
      scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
      done: function (errors, window) {

        var $ = window.$;
        global.window = window;
        global.document = window.document;

        var nuclear = require('nuclear.js');
        var Admin = require('../../../assets/js/vdom/pages/admin.js');

        var state = nuclear.observS({
          member: nuclear.observS(mockMember),
          modeMember: nuclear.observ('editMember'),
          modePayment: nuclear.observ('donation'),
          events: nuclear.observA([]),
          payments: nuclear.observA([]),
          bookings: nuclear.observA([])
        });

        nuclear.app(window.document.body, state, Admin.render, {
          document: global.document
        });

        st.end();
      }
    });
  });
*/  
  t.end();


});
