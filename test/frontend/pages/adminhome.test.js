'use strict'


var nuclear = require('nuclear.js')
var jsdom = require('jsdom')
var test = require('tape')
var createMocks = require('../../helpers/createMocks.js')
var decache = require('decache')
var AdminHome = require('../../../assets/js/vdom/pages/adminhome.js')

test('adminhome component', function (t) {


  jsdom.env('', {
    scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
    done: function (errors, window) {

      var $ = window.$;
      global.window = window;
      global.document = window.document

      var state = AdminHome({})

      nuclear.app(window.document.body, state, AdminHome.render, {
	document: global.document
      })

      t.test('check initial render status', function (st) {

	st.equals($('#search-component').length, 1, 'search-component rendered')
	st.equals($('#search-result').length, 1, 'search-result container rendered')

	st.equals($('.search-component').length, 1, 'search controls rendered')

	st.equals($('.search-table-section-member').length, 0, 'results not displaying yet')
	
	st.end()
      })

      t.test('check search controls')

      t.end()
    }
  })
})

test('search results', function (t) {

  jsdom.env('', {
    scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
    done: function (errors, window) {

      var $ = window.$;
      global.window = window;
      global.document = window.document

      var members = createMocks.getMembers()
      
      var state = AdminHome({
	members: members,
	showResult: true,
	query: function (_, params) {

	  t.equals(params.activation_status, 'deactivated', 'status matches')
	  t.equals(params.id, '1234', 'id matches')
	  t.equals(params.last_name.startsWith, 'horatio', 'last_name matches')
	  t.equals(params.primary_email.startsWith, 'admin@foch.com', 'emails match')
	}
      })

      nuclear.app(window.document.body, state, AdminHome.render, {
	document: global.document
      })

      t.equals($('.search-table-section-member').length, 1, 'search results container displaying')

      var memberRows = $('.member-row')
      t.equals(memberRows.length, members.length,
	       '4 members displayed in results')

      $('#member-status').val('deactivated').trigger('change')
      $('#search-field-id').val('1234').trigger('change')
      $('#search-field-email').val('admin@foch.com').trigger('change')
      $('#search-field-lastName').val('horatio').trigger('change')
      $('#search-button').click()
      
      var firstMember = memberRows.first()
      t.equals($('#member-tag').attr('href'), '/members/1234', 'href matches expected')
      
      t.end()
    }
  })
})	  
