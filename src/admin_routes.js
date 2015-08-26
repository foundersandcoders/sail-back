'use strict'

var React = require('react')
var routerModule  = require('react-router')

var App = require('./components/app.js')
var AdminHome = require('./pages/admin_home.js')
var ViewMember = require('./pages/admin_view_member.js')

var Router = routerModule.Router
var Route = routerModule.Route
var Redirect = routerModule.Redirect
var history = require('react-router/lib/HashHistory').history

module.exports = function (h, onUpdate) {

  h = h || history
  onUpdate = onUpdate || function noop () {}

  return (
      <Router history={h} onUpdate={onUpdate}>
      <Route component={App}>
	  <Route path='/' component={AdminHome} />
	  <Route path='/members/:id' component={ViewMember} />
      </Route>
      </Router>
  )
}
