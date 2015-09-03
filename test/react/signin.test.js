'use strict'

var expect = require('expect')
var React = require('react/addons')
var Component = require('../../src/shared/signin.js')

describe('/signin route', function () {

  var node
  beforeEach(function () {
    node = document.body
  })

  it('should signin page', function (done) {

    React.render((
      React.createElement(Component)
    ), node, function () {

      expect(node.innerHTML).toMatch(/Signin/)
      expect(node.innerHTML).toMatch(/signin-component/)
      expect(node.innerHTML).toMatch(/email/)
      expect(node.innerHTML).toMatch(/password/)
      expect(node.innerHTML).toMatch(/Membership number/)
      done()
    })
  })
})
