'use strict'

var expect = require('expect')
var React = require('react/addons')
var Component = require('../../../../src/admin/pages/add_member.js')

describe('/addmember route', function () {

  var node
  beforeEach(function () {
    node = document.body
  })

  it('should load new member page', function (done) {

    React.render((
      React.createElement(Component)
    ), node, function () {

      expect(node.innerHTML).toMatch(/1. Profile/)
      expect(node.innerHTML).toMatch(/2. Address/)
      expect(node.innerHTML).toMatch(/3. Contact/)
      expect(node.innerHTML).toMatch(/4. Membership/)
      expect(node.innerHTML).toMatch(/5. Gift aid/)
      expect(node.innerHTML).toMatch(/6. Other/)
      done()
    })
  })
})
