'use strict'

var expect = require('expect')
var React = require('react/addons')
var Component = require('../../../../src/admin/pages/view_member.js')
var arrayify = require('../../../../src/utils/arrayify.js')

var member = require('../../../../src/__MOCK_MEMBER__.js')

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
})
