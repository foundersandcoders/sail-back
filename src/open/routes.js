'use strict'

var React = require('react')
var { Router, Route, hashHistory } = require('react-router')
var { createStore, applyMiddleware, compose } = require('redux')
var { Provider } = require('react-redux')
import future from 'redux-future'

var App = require('./app.js')
var Signin = require('./components/signin.js')

// require().default is used here because the originating files use 'export default'
// to expose their contents rather than 'module.exports'

var Signup = require('./components/signup.js').default
var reducer = require('./redux/reducer.js').default

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
var store = createStore(reducer, {}, composeEnhancers(applyMiddleware(future)))

module.exports = () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path='/' component={Signin} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Route>
      </Router>
    </Provider>
  )
}
