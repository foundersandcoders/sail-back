'use strict'

var nuclear = require('nuclear.js')
var jsdom = require('jsdom')
var test = require('tape')
var createMocks = require('../../helpers/createMocks.js')
var Signup = require('../../../assets/js/vdom/pages/signup.js')

test('fill form', function (t) {

  jsdom.env('', {
    scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
    done: function (errors, window) {

      var $ = window.$
      global.window = window
      global.document = window.document

      var state = Signup({
	panel: 'one',
	member: {
	  primary_email: 'fil@foch.com',
	  confirm_email: 'fil@focc.com',
	  password: 'thurp',
	  confirm_password: 'thury',
	  membership_type: 'annual-family',
	  title: 'Mr',
	  initials: 'S',
	  first_name: 'Fil',
	  last_name: 'Wisher',
	  address1: '123 Leiningen Street',
	  county: 'BEAM',
	  postcode: 'ERRNOEXCEPTION',
	  home_phone: '12345',
	  secondary_email: '999',
	  news_type: 'post'
	}
      })

      nuclear.app(window.document.body, state, Signup.render, {
        document: global.document
      })

      t.test('page one', function (st) {
	st.equals($('#email').val(), 'fil@foch.com', 'email matches')
	st.equals($('#confirm-email').val(), 'fil@focc.com', 'email matches')
	st.equals($('#password').val(), 'thurp', 'password matches')
	st.equals($('#confirm-password').val(), 'thury', 'password matches')
	$('#confirm-email').val('fil@foch.com').trigger('change')
	$('#confirm-password').val('thurp').trigger('change')
	$('#next-btn').click()
	st.end()
      })

      t.test('page two', function (st) {
	st.equals($('#membership-type').val(), 'annual-family', 'membership-type preloads')
	$('#membership-type').val('annual-single').trigger('change')
	$('#next-btn').click()
	st.end()
      })

      t.test('page three', function (st) {
	st.equals($('#title').val(), 'Mr', 'title preloads')
	st.equals($('#initials').val(), 'S', 'initials preload')
	st.equals($('#first_name').val(), 'Fil', 'firstname preloads')
	st.equals($('#last_name').val(), 'Wisher', 'lastname preloads')
	$('#title').val('mrs').trigger('change')
	$('#last_name').val('fish').trigger('change')
	$('#next-btn').click()
	st.end()
      })

      t.test('page four', function (st) {
	st.equals($('#address1').val(), '123 Leiningen Street', 'address preloads')
	st.equals($('#county').val(), 'BEAM', 'county preloads')
	st.equals($('#postcode').val(), 'ERRNOEXCEPTION', 'postcode preloads')
	$('#address1').val('123 Lein Street').trigger('change')
	$('#county').val('JVM').trigger('change')
	$('#postcode').val('ERRNO34').trigger('change')
	$('#next-btn').click()
	st.end()
      })

      t.test('page five', function (st) {
	st.equals($('#home-phone').val(), '12345')
	st.equals($('#primary').val(), 'fil@foch.com')
	st.equals($('#secondary-email').val(), '999')
	$('#home-phone').val('123').trigger('change')
	$('#secondary-email').val('4321').trigger('change')
	$('#next-btn').click()
	st.end()
      })

      t.test('page six', function (st) {
	$('#next-btn').click()
	st.end()
      })

      t.test('page seven', function (st) {
	st.equals($('#news-type').val(), 'post', 'news-type preloads')
	$('#news-type').val('online').trigger('change')
	$('#next-btn').click()
	st.end()
      })

      t.test('page eight', function (st) {
	var memberProps = [
	  {prop: 'title', value: 'Mrs'},
	  {prop: 'initials', value: 'S'},
	  {prop: 'first_name', value: 'Fil'},
	  {prop: 'last_name', value: 'Fish'},
	  {prop: 'address1', value: '123 Lein Street'},
	  {prop: 'county', value: 'JVM'},
	  {prop: 'postcode', value: 'ERRNO34'},
	  {prop: 'home_phone', value: '123'},
	  {prop: 'primary_email', value: 'fil@foch.com'},
	  {prop: 'secondary_email', value: '4321'}
	]
	memberProps.forEach(function (field) {
	  st.equals($('#value-' + field.prop + '').text(), field.value, field.prop + ' matches')
	})
	st.end()
      })

      t.end()
    }
  })
})
