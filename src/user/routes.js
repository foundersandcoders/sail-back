import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory }  from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './redux/store.js'

//Parent component
import App from './user_app.js'
//Container components
import UserHome from './pages/home.js'



const history = syncHistoryWithStore(hashHistory, store)

module.exports = () =>
  <Provider store={store} >
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={UserHome} />
      </Route>
    </Router>
  </Provider>
