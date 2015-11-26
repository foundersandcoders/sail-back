'use strict'

var React = require('react')
var PaymentsReport = require('./payments.js')
var get_data = require('app/get_data')

module.exports = React.createClass({
  render () {
    return <PaymentsReport get_payments={get_payments} />
  }
})

function get_payments (e) {
  var ref = e.target.firstChild.value
  return get_data('api/payments/?category=payment&reference=' + ref) }

