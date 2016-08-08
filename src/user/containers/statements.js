import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

const PaymentsTable = require('../../admin/components/payments_table')

const MemberPaymentsTable = ({payments}) =>
  <div>
    <PaymentsTable payments={payments} />
  </div>

export default connect(pick(['payments']))(MemberPaymentsTable)
