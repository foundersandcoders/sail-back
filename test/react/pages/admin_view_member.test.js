'use strict'

var expect = require('expect')
var React = require('react/addons')
var MemoryHistory = require('react-router/lib/MemoryHistory')

describe('/members/:id route', function () {

  var compileRoutes = require('../../../src/admin_routes.js')
  var node

  beforeEach(function () {
    node = document.body
  })

  it('should load admin view member page', function (done) {

    React.render((
      compileRoutes(new MemoryHistory('/members/1234'))
    ), node, function () {

      expect(node.innerHTML).toMatch(/Member info/)
      expect(node.innerHTML).toMatch(/1234/)
      expect(node.innerHTML).toMatch(/member-component/)
      done()
    })
  })

  it('should render member details', function (done) {

    React.render((
      compileRoutes(new MemoryHistory('/members/1234'))
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

    done()
  })

  it('should render events section', function (done) {

    done()
  })
})
