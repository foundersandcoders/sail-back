/**
 *	UPLOAD
 *
**/

'use strict'

var test = require('tape')
var frontEndParser = require('./../../../assets/js/vdom/services/parsecsv.js')
var backEndParser = require('./../../../api/services/Upload.js')()
var helpers = require('./helpers.js')

test('Payments: ', function (t) {

  t.test('Upload parser:', function (st) {

    var mockPayments = helpers.payments
    var fileObj = {type: 'payments', result: mockPayments}
    st.comment('that\'s what\'s up!')
    frontEndParser.parse(fileObj, function (err, array) {

      if (err) {
        console.log(err)
        st.end()
      }

      var first = array[1]

      st.equals(first.member, '6085', 'right member')
      st.equals(first.subscription, 5, 'right subscription amount')
      st.equals(first.donation, 0, 'right donation amount')
      st.equals(first.events, 0, 'right events amount')
      st.equals(first.amount, 5, 'right total amount')
      // st.equals(first.deleted,      false,   "right deleted status")
      st.end()
    })
  })

  t.test('Database entries:', function (st) {

    var mockPayments = 'DatePaid;MembershipID;MembershipPaid;Donation;Event;Payment;Difference;PaymentMethod;Bank Slip Ref;PaymentNotes\n03/01/12;6085;5;0;0;5;0;8 - Standing Order;61201;;'
    var fileObj = {type: 'payments', result: mockPayments}

    frontEndParser.parse(fileObj, function (err, array) {
      var databaseEntries = backEndParser._generatePayments(array)

      st.equals(databaseEntries.length, 2, 'right number of charges and payments created')
      st.end()
    })
  })

  t.test('Database entries with multiple charges:', function (st) {
    var mockPayments = 'DatePaid;MembershipID;MembershipPaid;Donation;Event;Payment;Difference;PaymentMethod;Bank Slip Ref;PaymentNotes\n03/01/12;6085;5;5;5;15;0;8 - Standing Order;61201;;\n03/01/12;6085;5;5;5;15;0;8 - Standing Order;61201;;'

    var fileObj = {type: 'payments', result: mockPayments}

    frontEndParser.parse(fileObj, function (err, array) {
      var databaseEntries = backEndParser._generatePayments(array)

      st.equals(databaseEntries.length, 8, 'right number of charges and payments created')
      st.end()
    })
  })
})

test('Members: ', function (t) {
  t.test('Upload parser: ', function (st) {
    var mockMember = helpers.members
    var fileObj = {type: 'members', result: mockMember}
    frontEndParser.parse(fileObj, function (err, array) {
      if (err) {
        console.log(err)
        st.end()
      }

      var first = array[1]

      // {
      // 	id: '8419',
      // 	title: 'Ms',
      // 	initials: 'C L',
      // 	last_name: 'Younger',
      // 	first_name: 'Christina Lucy',
      // 	address1: '3 New Buildings',
      // 	address2: 'Shore Road',
      // 	address3: null,
      // 	address4: 'Bosham',
      // 	county: 'West Sussex',
      // 	postcode: 'PO18 8JD',
      // 	deliverer: 'BW',
      // 	home_phone: null,
      // 	mobile_phone: null,
      // 	work_phone: null,
      // 	primary_email: 'luyounger@talktalk.net',
      // 	secondary_email: null,
      // 	email_bounced: false,
      // 	date_joined: null,
      // 	membership_type: null,
      // 	date_membership_type_changed: null,
      // 	life_payment_date: null,
      // 	notes: null,
      // 	gift_aid_signed: true,
      // 	date_gift_aid_signed: Sat Feb 06 1909 00:00:00 GMT+0000 (GMT),
      // 	date_gift_aid_cancelled: null,
      // 	standing_order: true,
      // 	activation_status: 'deactivated'
      // }

      // console.log(first)
      st.end()
    })
  })
})
