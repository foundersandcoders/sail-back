import React from 'react'
import { Router, Route, Redirect, browserHistory, hashHistory }  from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import store from './redux/store.js'
// import reducers from './redux/reducer.js'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import App from './user_app.js'
import UserHome from './pages/home.js'




import account_details from './redux/modules/account_details.js'
import payments from './redux/modules/payments.js'




const reducers = combineReducers(
  { account_details
  , payments
  }
)

const reducersTwo = combineReducers({routing: routerReducer, ...reducers})
const store = createStore(reducersTwo)


const history = syncHistoryWithStore(hashHistory, store)

module.exports = () =>
  <Provider store={store} >
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={UserHome} />
      </Route>
    </Router>
  </Provider>
