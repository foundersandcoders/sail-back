'use strict'

var expect = require('expect')
var React = require('react/addons')
var Component = require('../../../../src/admin/pages/data_maintenance.js')

describe('/maintenance route', function () {

  var node
  beforeEach(function () {
    node = document.body
  })

  it('should load data maintenance page', function (done) {

    React.render((
      React.createElement(Component)
    ), node, function () {

      expect(node.innerHTML).toMatch(/Data maintenance/)
      done()
    })
  })
})
