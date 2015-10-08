'use strict'

var test = require('tape')
var React = require('react/addons')
var Component = require('../../../src/open/pages/signin.js')

Component.__set__('request', function(){console.log('Request set! word')})
test('should signin page', function (t) {

  React.render(React.createElement(Component), document.body, function () {

    //t.ok(document.body.innerHTML.indexOf('signin-component') > -1)
    t.ok(document.body.innerHTML.indexOf('email') > -1)
    t.ok(document.body.innerHTML.indexOf('password') > -1)
    t.ok(document.body.innerHTML.indexOf('Membership number') > -1)
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

  React.render(React.createElement(Component), document.body, function () {
    document.body.querySelector('#email').value = username
    document.body.querySelector('#password').value = password
    var submit = document.body.querySelector('#submit-button')
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

  React.render(React.createElement(Component), document.body, function () {
    document.body.querySelector('#submit-button').click()
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

  React.render(React.createElement(Component), document.body, function () {
    document.body.querySelector('#email').value = email
    var submit = document.body.querySelector('a')
    React.addons.TestUtils.Simulate.click(submit)
  })
})

test('clicking on forgot password without an email does not request and displays error message', function (t) {

  Component.__set__('request', function (opts, cb) {
    t.ok(false)
  })

  React.render(React.createElement(Component), document.body, function () {
    document.body.querySelector('#email').value = ''
    var submit = document.body.querySelector('a')
    React.addons.TestUtils.Simulate.click(submit)
    process.nextTick(function () {
      t.equal(submit.nextSibling.innerHTML,
          'Please enter the correct email for your account')
      t.end() }) }) })
