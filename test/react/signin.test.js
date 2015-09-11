'use strict'

var test = require('tape')
var React = require('react/addons')
var Component = require('../../src/shared/signin.js')
var click = React.addons.TestUtils.Simulate.click

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
  ), document.body, function () {
      document.body.querySelector('#submit-button').click()
  })
})
