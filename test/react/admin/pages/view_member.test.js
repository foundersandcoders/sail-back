'use strict'

var expect = require('expect')
var React = require('react/addons')
var rewire = require('rewire')
var Component = rewire('../../../../src/admin/pages/view_member.js')
var arrayify = require('../../../../src/utils/arrayify.js')
// NB: these change and click events are more reliable than elm.click()
var change = React.addons.TestUtils.Simulate.change
var click = React.addons.TestUtils.Simulate.click

var member = require('../../../../src/__MOCK_MEMBER__.js')

Component.__set__('request', function (opts, cb) {

  cb(null, {body: member})
})

describe('/members/:id route', function () {

  var compileRoutes = require('../../../../src/admin/routes.js')
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

    React.render((
      React.createElement(Component, {
        member: member,
        params: {
          id: 1234
        }
      })
    ), node, function () {

      expect(node.innerHTML).toMatch(/events-section/)
      expect(node.innerHTML).toMatch(/Events/)
      expect(node.innerHTML).toMatch(/event-row/)
      expect(node.innerHTML).toMatch(/table-section-individual-rows/)
      done()
    })
  })

  it('should toggle between edit and view mode', function (done) {

    function get_data_nodes () {
      return arrayify(node.querySelectorAll('.member-info-content .info')).map(function (node) {
        return node.nextSibling })}

    function check_nodes_tag (tag, nodes) {
      return nodes.every(function (node){
        return node.tagName.toLowerCase() === tag })}

    function assert_all_nodes_of_tag (tag, nodes) {
      expect(check_nodes_tag(tag, nodes)).toBe(true) }

    assert_all_nodes_of_tag('span', get_data_nodes())
    node.querySelector('#edit-member-mode').click()
    process.nextTick(function () {

      assert_all_nodes_of_tag('input', get_data_nodes())
      done()
    })
  })

  it('inputs should all be editable', function (done) {

    var fields = ['id']
    
    /*'title', 'initials', 'first_name','last_name',
	       'primary_email', 'secondary_email', 'news_type',
	       'email_bounced', 'activation_status', 'address1',
	       'address2', 'address3', 'address4', 'county', 'postcode',
	       'deliverer', 'home_phone', 'work_phone', 'mobile_phone',
	       'date_joined', 'membership_type', 'life_payment_date',
	       'date_type_changed', 'date_gift_aid_signed',
	       'date_gift_aid_cancelled', 'standing_order', 'notes',
		  'registered', 'due_date']
    */
    Component.__set__('request', function (opts, cb) {
      done()
      if (opts.method === 'GET') return cb(null, {body: member})
      expect(opts.method).toBe('PUT')
      expect(opts.uri).toBe('/api/members/1234')
      var member_fields = Object.keys(opts.json || {})
      var all_fields_filled = fields.every(function (field) {
        return member_fields.indexOf(field) > -1 })
      expect(all_fields_filled).toBe(true)
    })

    React.render(
      React.createElement(Component, {
        member: member,
        params: {
          id: 1234
        }
      }), document.body, function () {

        fields.forEach(function (id) {
          var node = document.querySelector('#' + id)
            change(node, { target: {
              id: id,
              value: Math.random().toString(36).substring(7)
            }})
        })
        
        process.nextTick(function () {
          click(document.querySelector('#save-member'))
        })
    })
  })
})
