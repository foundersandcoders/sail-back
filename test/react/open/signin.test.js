'use strict'

var test = require('tape')
var React = require('react')
var ReactDOM = require('react-dom')
var Component = require('../../../src/open/pages/signin.js')

var node

test('create a wrapper', function (t) {
  node = document.createElement('div')
  node.id = 'wrapper'
  document.body.appendChild(node)
  t.end() } )

Component.__set__('request', function(){console.log('Request set! word')})
test('should signin page', function (t) {

  ReactDOM.render(React.createElement(Component), node, function () {

    t.ok(node.innerHTML.indexOf('email') > -1)
    t.ok(node.innerHTML.indexOf('password') > -1)
    t.ok(node.innerHTML.indexOf('Membership number') > -1)
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

  ReactDOM.render(React.createElement(Component), node, function () {
    node.querySelector('#email').value = username
    node.querySelector('#password').value = password
    var submit = node.querySelector('#submit-button')
    submit.click()
  })
})

test('successful login sets pathname to response.headers.location', function (t) {
  var response = {
    statusCode: 200,
    headers: {
      location: 'hoho'
    }
  }
  var window_mock = {location: {}}
  Component.__set__({
      request: function (opts, cb) {
        cb(null, response, null)
        process.nextTick(function(){
          t.equals(window_mock.location.pathname, 'hoho')
          t.end()
        })
      },
      win: window_mock
  })

  ReactDOM.render(React.createElement(Component), node, function () {
    node.querySelector('#submit-button').click()
  })
})

test('clicking on forgot password sends appropriate request', function (t) {
  var email = 'fil@foch.org'

  Component.__set__('request', function (opts, cb) {
    t.equals(opts.method, 'POST')
    t.equals(opts.uri, '/forgotPassword')
    t.equals(opts.json.email, email)
    t.end()
  })

  ReactDOM.render(React.createElement(Component), node, function () {
    node.querySelector('#email').value = email
    var submit = node.querySelector('a')
    require('react-addons-test-utils').Simulate.click(submit)
  })
})

test('clicking on forgot password without an email does not request and displays error message', function (t) {

  Component.__set__('request', function (opts, cb) {
    t.ok(false)
  })

  ReactDOM.render(React.createElement(Component), node, function () {
    node.querySelector('#email').value = ''
    var submit = node.querySelector('a')
    require('react-addons-test-utils').Simulate.click(submit)
    process.nextTick(function () {
      t.equal(submit.nextSibling.innerHTML,
          'Please enter the correct email for your account')
      t.end() }) }) })
