'use strict'

var expect = require('expect')
var React = require('react/addons')
var MemoryHistory = require('react-router/lib/MemoryHistory')

describe('The route component', function () {

  var compileRoutes = require('../../../src/admin_routes.js')
  var node

  beforeEach(function () {

    node = document.createElement('div')

  })

  it('should load admin home page', function (done) {

    React.render((
      compileRoutes(new MemoryHistory('/'))
    ), node, function () {

      expect(node.innerHTML).toMatch(/Search Members/)
      done()
    })
  })

  it('should render search box component', function (done) {

    React.render((
      compileRoutes(new MemoryHistory('/'))
    ), node, function () {

      expect(node.innerHTML).toMatch(/search-field-email/)
      expect(node.innerHTML).toMatch(/search-field-id/)
      expect(node.innerHTML).toMatch(/search-field-lastName/)
      expect(node.innerHTML).toMatch(/search-button/)
      done()
    })
  })

  it('should render search results component', function (done) {

    React.render((
      compileRoutes(new MemoryHistory('/'))
    ), node, function () {

      expect(node.innerHTML).toMatch(/search-table-section-member-header/)
      expect(node.innerHTML).toMatch(/search-table-section-member-rows/)
      done()
    })
  })
})
