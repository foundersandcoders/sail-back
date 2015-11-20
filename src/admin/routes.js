'use strict'

var React = require('react')
var routerModule  = require('react-router')

var App = require('./admin_app.js')
var AdminHome = require('./pages/home.js')
var ViewMember = require('./pages/view_member.js')
var AddMember = require('./pages/add_member.js')
var DataMaintenance = require('./pages/data_maintenance.js')
var Reports = require('./pages/paying_in.js')

var Router = routerModule.Router
var Route = routerModule.Route
var Redirect = routerModule.Redirect

module.exports = function (h, onUpdate) {

  onUpdate = onUpdate || function noop () {}

  return (
    <Router history={h} onUpdate={onUpdate}>
      <Route component={App}>
        <Route path='/' component={AdminHome} />
          <Route path='/members/:id' component={ViewMember} />
          <Route path='/addmember' component={AddMember} />
          <Route path='/reports' component={Reports} />
      </Route>
    </Router>
  )
}
