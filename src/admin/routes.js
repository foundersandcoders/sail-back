'use strict'

var React = require('react')
var { Router, Route, Redirect, hashHistory }  = require('react-router')
var { Provider } = require('react-redux')
var store = require('./redux/store.js')

var App = require('./admin_app.js')
var AdminHome = require('./pages/home.js')
var ViewMember = require('./containers/member_page.js')
var AddMember = require('./containers/add_member.js')
var Reports = require('./pages/available_reports.js')
var { PayingIn } = require('./containers/payment_reports.js')
var { NonCheque } = require('./containers/payment_reports.js')
var Email = require('./pages/email.js')

var { pathDidUpdate } = require('./redux/modules/route.js')

hashHistory.listen((path) => store.dispatch(pathDidUpdate(path)))

module.exports = function () {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
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
    </Provider>
  ) }
