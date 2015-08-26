'use strict'

var React = require('react')
var routerModule  = require('react-router')

var App = require('./components/app.js')
var AdminHome = require('./pages/admin_home.js')

var Router = routerModule.Router
var Route = routerModule.Route
var Redirect = routerModule.Redirect
var hist = require('react-router/lib/HashHistory').history

module.exports = function (history, onUpdate) {

  history = history || hist
  onUpdate = onUpdate || function noop () {}

  return (
      <Router history={history} onUpdate={onUpdate}>
      <Route component={App}>
      <Route path='/' component={AdminHome} />
      </Route>
      </Router>
  )
}
