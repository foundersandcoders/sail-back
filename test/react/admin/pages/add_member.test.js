'use strict'

var test = require('tape')

var React = require('react')
var ReactDOM = require('react-dom')
var change = require('react-addons-test-utils').Simulate.change
var Component = require('../../../../src/admin/pages/add_member.js')
var wrapper

test('create a wrapper', function (t) {
  wrapper = document.createElement('div')
  wrapper.id = 'wrapper'
  document.body.appendChild(wrapper)
  t.end() } )

test('should load new member page with all fields', function (t) {

  ReactDOM.render((
    React.createElement(Component)
  ), wrapper, function () {

    var node = wrapper

    var ids = ['title', 'initials', 'first_name','last_name',
        'primary_email', 'secondary_email', 'news_type',
        'email_bounced', 'activation_status', 'address1',
        'address2', 'address3', 'address4', 'county', 'postcode',
        'deliverer', 'home_phone', 'work_phone', 'mobile_phone',
        'date_joined', 'membership_type', 'life_payment_date',
        'date_type_changed', 'date_gift_aid_signed',
        'date_gift_aid_cancelled', 'standing_order', 'notes',
        'due_date']
    var is_on_page = function (id) {
      return 'INPUT SELECT'.match(document.querySelector('#'+id).tagName) }
    var all_ids_present = ids.every(is_on_page)

    t.ok(all_ids_present)

    t.end()
  })

})

test('appropriate fields should be editable', function (t) {

  var fields = ['title', 'initials', 'first_name','last_name',
      'primary_email', 'secondary_email', 'news_type',
      'email_bounced', 'activation_status', 'address1',
      'address2', 'address3', 'address4', 'county', 'postcode',
      'deliverer', 'home_phone', 'work_phone', 'mobile_phone',
      'date_joined', 'membership_type', 'life_payment_date',
      'date_type_changed', 'date_gift_aid_signed',
      'date_gift_aid_cancelled', 'standing_order', 'notes',
      'due_date']

  Component.__set__('request', function (opts, cb) {
    var member_fields = Object.keys(opts.json)
    var all_fields_filled = fields.every(function (field) {
      return member_fields.indexOf(field) > -1 })
    t.ok(all_fields_filled)
    t.end()
  })

  ReactDOM.render(React.createElement(Component), wrapper, function () {

    fields.forEach(function (id) {
      change(document.querySelector('#' + id), {target: {
        id: id,
        value: Math.random().toString(36).substring(7)
      }})
    })
    process.nextTick(function () {
        document.querySelector('#save-button').click()
    })
  })
})
