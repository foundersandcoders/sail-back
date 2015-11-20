'use strict'

var React = require('react')
var ReactRouter  = require('react-router')

var App = require('./components/app.js')
var Signin = require('./pages/signin.js')

var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Redirect = ReactRouter.Redirect

module.exports = function (h, onUpdate) {

  onUpdate = onUpdate || function noop () {}

  return (
    <Router history={h} onUpdate={onUpdate}>
    <Route component={App}>
    <Route path='/' component={Signin} />
      <Route path='/signin' component={Signin} />
    </Route>
    </Router>
  )
}
