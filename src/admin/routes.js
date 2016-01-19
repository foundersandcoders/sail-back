'use strict'

var React = require('react')
var { Router, Route, Redirect }  = require('react-router')

var App = require('./admin_app.js')
var AdminHome = require('./pages/home.js')
var ViewMember = require('./containers/member_page.js')
var AddMember = require('./pages/add_member.js')
var Reports = require('./pages/available_reports.js')
var PayingIn = require('./pages/paying_in.js')
var NonCheque = require('./pages/non_cheque.js')
var Email = require('./pages/email.js')

module.exports = function () {
  return (
    <Router>
      <Route component={App}>
        <Route path='/' component={AdminHome} />
          <Route path='/members/:id' component={ViewMember} />
          <Route path='/addmember' component={AddMember} />
          <Route path='/reports' component={Reports} />
            <Route path='/reports/paying_in' component={PayingIn} />
            <Route path='/reports/non_cheque' component={NonCheque} />
          <Route path='/email' component={Email} />
      </Route>
    </Router>
  ) }

