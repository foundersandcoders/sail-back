'use strict'

const React = require('react')
const PaymentsReport = require('./payments.js')
const get_data = require('app/get_data')

module.exports = () =>
  <PaymentsReport
    get_payments={get_payments}
    inputs={ ['reference'] }/>

const get_payments = ({target: {firstChild: {children: {1:{value: ref}} } } }) =>
  ({
    payments: get_data('api/payments/?category=payment&reference=' +
        ref + '&populate=member&limit=3000')
    , restriction_start: 'where={"or":[{"category":{"!":"payment"}},' +
          '{"reference":{"!":"' + ref + '"}}]'
  })

