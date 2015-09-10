'use strict'

var test = require('tape')
var React = require('react/addons')
var rewire = require('rewire')
var Component = require('../../src/shared/signin.js')

Component.__set__('request', function(){console.log('Request set! word')})

test('should signin page', function (t) {

  React.render((
    React.createElement(Component)
  ), node, function () {

    t.ok(node.innerHTML.indexOf(/Sign In/) > -1)
    t.ok(node.innerHTML.indexOf(/signin-component/) > -1)
    t.ok(node.innerHTML.indexOf(/email/) > -1)
    t.ok(node.innerHTML.indexOf(/password/) > -1)
    t.ok(node.innerHTML.indexOf(/Membership number/) > -1)
    t.end()
  })
})

test('clicking submit sends a well-formed login request', function (t) {
  var username = 'fil@foch.org'
  var password = 'wrongPa$$w0rd23'

  Component.__set__('request', function (opts, cb) {
    t.equals(opts.method, 'POST')
    t.equals(opts.uri, '/signin')
    t.equals(opts.json.username, username)
    t.equals(opts.json.password, password)
    t.end()
  })

  React.render((
    React.createElement(Component)
  ), node, function () {
    node.querySelector('#email').value = username
    node.querySelector('#password').value = password
    node.querySelector('#submit-button').click()
  })

})

test('clicking submit sends a well-formed login request', function (t) {
  var username = 'fil@foch.org'
  var password = 'wrongPa$$w0rd23'

  Component.__set__('request', function (opts, cb) {
      t.equals(opts.method, 'POST')
      t.equals(opts.uri, '/signin')
      t.equals(opts.json.username, username)
      t.equals(opts.json.password, password)
      t.end()
  })

  React.render((
      React.createElement(Component)
  ), node, function () {
      node.querySelector('#email').value = username
      node.querySelector('#password').value = password
      node.querySelector('#submit-button').click()
  })

})

test('successful login sets pathname to response.headers.location', function (t) {
  var response = {statusCode: 200} 
  var window = {location: {}}
  Component.__set__({
      request: function (opts, cb) {
        cb(null, response, null)
        process.nextTick(function(){
          t.equals(window.location.hash, '')
          t.end()
        })
      },
      window: window
  })

  React.render((
      React.createElement(Component)
  ), node, function () {
      node.querySelector('#submit-button').click()
  })
})
