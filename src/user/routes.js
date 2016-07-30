import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory }  from 'react-router'

import store from './redux/store.js'

//Parent component
import App from './user_app.js'
//Container components
import MyDetails from './containers/my_details.js'
import Statements from './containers/statements.js'
import MakePayment from './containers/make_payment.js'

import { pathDidUpdate } from '../shared/redux/modules/route.js'

hashHistory.listen((path) => store.dispatch(pathDidUpdate(path)))


module.exports = () =>
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path='/' component={MyDetails} />
        <Route path='/statements' component={Statements} />
        <Route path='/make-payment' component={MakePayment} />
      </Route>
    </Router>
  </Provider>
