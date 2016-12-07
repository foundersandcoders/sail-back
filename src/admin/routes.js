/* @flow */

var React = require('react')
var { Router, Route, hashHistory } = require('react-router')
var { Provider } = require('react-redux')
import store from './redux/store.js'

var App = require('./admin_app.js')
var AdminHome = require('./containers/home.js')
import ViewMember from './containers/member_page.js'
import AddMember from './containers/add_member.js'
import Reports from './containers/reports.js'
import Letter from './containers/letter.js'
import Emails from './containers/email.js'
import Labels from './containers/labels.js'
import Letters from './containers/letters.js'
import ChangePassword from './components/change_password.js'

var { pathDidUpdate } = require('../shared/redux/modules/route.js')

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
          <Route path='/letters' component={Letters} />
          <Route path='/emails' component={Emails} />
          <Route path='/labels' component={Labels} />
          <Route path='/letter/:id' component={Letter} />
          <Route path='/changepassword' component={ChangePassword} />
        </Route>
      </Router>
    </Provider>
  ) }
