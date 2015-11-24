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
        'date_gift_aid_signed', 'date_gift_aid_cancelled', 'standing_order',
        'notes', 'due_date']
    var is_on_page = function (id) {
      return 'INPUT SELECT'.match(document.querySelector('#'+id).tagName) }
    var all_ids_present = ids.every(is_on_page)

    t.ok(all_ids_present)

    t.end()
  })

})
