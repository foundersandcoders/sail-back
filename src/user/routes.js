import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

import store from './redux/store.js'

//Parent component
import App from './user_app.js'
//Container components
import ContactDetails from './containers/contact_details.js'
import Membership from './containers/membership.js'
import Statements from './containers/statements.js'
import MakePayment from './containers/make_payment.js'
import ChangePassword from './components/change_password.js'
import WelcomeScreen from './containers/welcome_screen.js'

import { pathDidUpdate } from '../shared/redux/modules/route.js'

hashHistory.listen((path) => store.dispatch(pathDidUpdate(path)))


module.exports = () =>
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path='/' component={ContactDetails} />
        <Route path='/membership' component={Membership} />
        <Route path='/statements' component={Statements} />
        <Route path='/make-payment' component={MakePayment} />
        <Route path='/change-password' component={ChangePassword} />
        <Route path='/welcome-screen' component={WelcomeScreen} />
      </Route>
    </Router>
  </Provider>
