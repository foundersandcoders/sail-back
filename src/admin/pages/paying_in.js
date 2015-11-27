'use strict'

const React = require('react')
const PaymentsReport = require('./payments.js')
const get_data = require('app/get_data')

module.exports = () =>
  <PaymentsReport
    get_payments={get_payments}
    inputs={['reference'] }/>

const get_payments = ({target: {firstChild: {children: [,{value: ref}] } } }) =>
  get_data('api/payments/?category=payment&reference=' + ref)

