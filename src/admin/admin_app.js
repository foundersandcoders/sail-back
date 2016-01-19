'use strict'

var React = require('react')
var { Provider } = require('react-redux')
var store = require('./redux/store.js')
var App = require('../shared/app.js')

var AdminApp = React.createClass({
  getInitialState: function () {
    return {
      date: '',
      reference: '',
      type: '' } },

  add_payment_info: function (elem) {
    return React.cloneElement(elem, {
      payment_date: this.state.date,
      payment_reference: this.state.reference,
      payment_type: this.state.type,
      update: this.setState.bind(this) }) },

  add_details: function (child) {
    return child.type.displayName==='ViewMember' ?
      this.add_payment_info(child) : child },

  render () {
    return (
      <Provider store={store}>
        <App
          user='Admin'
          add_details={this.add_details}
          children={this.props.children}/>
      </Provider>
  )} })

module.exports = AdminApp
