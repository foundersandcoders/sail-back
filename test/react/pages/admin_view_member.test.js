'use strict'

var expect = require('expect')
var React = require('react/addons')
var Component = require('../../../src/pages/admin_view_member.js')

var member = JSON.stringify({
  id: 1234,
  first_name: 'Wil',
  last_name: 'Eritrea',
  news_type: 'Post',
  activation_status: 'deactivated',
  primary_email: 'wil@foch.org',
  secondary_email: 'wil2@foch.org',
  deletion_date: new Date(),
  deletion_reason: {
    description: 'I turned purple'
  },
  email_bounced: true,
  address1: '123 Fake Street',
  address2: 'Psychophysical Substrate',
  address3: 'Endoscopic Rectomy',
  county: 'Whisk Yortshore',
  postcode: '123 80e',
  home_phone: '12384',
  work_phone: '184391',
  mobile_phone: 'a9134',
  date_gift_aid_signed: new Date(),
  notes: 'I am green',
  standing_order: true,
  membership_type: 'life_double',
  date_joined: new Date()
})

describe('/members/:id route', function () {

  var compileRoutes = require('../../../src/admin_routes.js')
  var node

  beforeEach(function () {
    node = document.body
  })

  it('should load admin view member page', function (done) {

    React.render((
      React.createElement(Component, {
	member: member,
	params: {
	  id: 1234
	}
      })
    ), node, function () {

      expect(node.innerHTML).toMatch(/Member info/)
      expect(node.innerHTML).toMatch(/1234/)
      expect(node.innerHTML).toMatch(/member-component/)
      done()
    })
  })

  it('should render member details', function (done) {

    React.render((
      React.createElement(Component, {
	member: member,
	params: {
	  id: 1234
	}
      })
    ), node, function () {

      expect(node.innerHTML).toMatch(/edit-member-mode/)
      expect(node.innerHTML).toMatch(/member-info-content/)
      expect(node.innerHTML).toMatch(/Personal info/)
      expect(node.innerHTML).toMatch(/Address info/)
      expect(node.innerHTML).toMatch(/Membership info/)
      done()
    })
  })

  it('should render payments section', function (done) {

    React.render((
      React.createElement(Component, {
	member: member,
	params: {
	  id: 1234
	}
      })
    ), node, function () {

      expect(node.innerHTML).toMatch(/Payment info/)
      expect(node.innerHTML).toMatch(/subscription_btn/)
      expect(node.innerHTML).toMatch(/table-payments/)
      expect(node.innerHTML).toMatch(/table-section-individual-rows/)
      done()
    })
  })

  it('should render events section', function (done) {

    done()
  })
})
