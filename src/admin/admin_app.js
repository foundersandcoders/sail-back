'use strict'

var React = require('react')
var App = require('../shared/app.js')

var AdminApp = React.createClass({
  getInitialState: function () {
    return { payment_date: '' } },

  update_date: function (date) {
    this.setState({payment_date: date}) },

  add_date: function (elem) {
    return React.cloneElement(elem, {
      payment_date: this.state.payment_date,
      update_date: this.update_date }) },

  add_details: function (child) {
    return child.type.displayName==='ViewMember' ? this.add_date(child) : child },

  render: function () {
    return <App
        add_details={this.add_details}
        children={this.props.children}/> } })

module.exports = AdminApp
