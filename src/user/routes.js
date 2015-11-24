'use strict'

var React = require('react')
var routerModule  = require('react-router')

var App = require('../shared/app.js')
var UserHome = require('./pages/home.js')

var Router = routerModule.Router
var Route = routerModule.Route
var Redirect = routerModule.Redirect

module.exports = function (h, onUpdate) {

  onUpdate = onUpdate || function noop () {}

  return (
    <Router history={h} onUpdate={onUpdate}>
      <Route component={App}>
        <Route path='/' component={UserHome} />
      </Route>
    </Router>
  )
}
