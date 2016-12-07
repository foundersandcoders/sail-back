'use strict'

var React = require('react')
var ReactRouter = require('react-router')

var App = require('./app.js')
var Signin = require('./components/signin.js')

var Router = ReactRouter.Router
var Route = ReactRouter.Route

module.exports = function (h, onUpdate) {

  onUpdate = onUpdate || function noop () {}

  return (
    <Router history={h} onUpdate={onUpdate}>
      <Route component={App}>
        <Route path='/' component={Signin} />
        <Route path='/signin' component={Signin} />
      </Route>
    </Router>
  )
}
