'use strict'

var React = require('react')
var App = require('./app.js')

var AdminApp = React.createClass({
  render () {
    return (
      <App
        user='Admin'
        add_details={this.add_details}
        children={this.props.children}
      />
    )
  }
})

module.exports = AdminApp
