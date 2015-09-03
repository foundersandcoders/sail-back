'use strict'

var expect = require('expect')
var React = require('react/addons')
var rewire = require('rewire')
var Component = rewire('../../src/shared/signin.js')

Component.__set__('request', function(){console.log('Request set! word')})

describe('/signin route', function () {

  var node
  beforeEach(function () {
    node = document.body
  })
//
  it('should signin page', function (done) {

    React.render((
      React.createElement(Component)
    ), node, function () {

      expect(node.innerHTML).toMatch(/Sign In/)
      expect(node.innerHTML).toMatch(/signin-component/)
      expect(node.innerHTML).toMatch(/email/)
      expect(node.innerHTML).toMatch(/password/)
      expect(node.innerHTML).toMatch(/Membership number/)
      done()
    })
  })

  it('clicking submit sends a well-formed login request', function (done) {
    var username = 'fil@foch.org'
    var password = 'wrongPa$$w0rd23'

    Component.__set__('request', function (opts, cb) {
      expect(opts.method).toBe('POST')
      expect(opts.uri).toBe('/signin')
      expect(opts.json.username).toBe(username)
      expect(opts.json.password).toBe(password)
      done()
    })

    React.render((
      React.createElement(Component)
    ), node, function () {
      node.querySelector('#email').value = username
      node.querySelector('#password').value = password
      node.querySelector('#submit-button').click()
    })

  })

  /* TODO: write test for handle_response to ensure
      that redirection happens as expected. It currently does not.
  */
})
