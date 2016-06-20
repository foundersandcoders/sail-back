'use strict'

var React = require('react')
var { Provider } = require('react-redux')
var store = require('./redux/store.js')
var App = require('../shared/app.js')

var AdminApp = React.createClass({
  render () {
    return (
      <App
        user='Admin'
        add_details={this.add_details}
        children={this.props.children}
      />
  ) } })

module.exports = AdminApp
