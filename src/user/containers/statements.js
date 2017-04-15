import React from 'react'
import { connect } from 'react-redux'
import { pick, isEmpty, length, compose, join, map, split, toUpper, adjust, pipe, propOr } from 'ramda'

import { fetch_member_user } from '../../shared/redux/modules/member.js'

const PaymentsTable = require('../../shared/components/payments_table')

class MemberPaymentsTable extends React.Component {
  componentDidMount () {
    this.props.fetch_member_user()
  }

  render () {
    return (
      <div className='donation-section'>
        {isEmpty(this.props.payments) ? NoRecords() : <PaymentsTable payments={this.props.payments} />}
      </div>
    )
  }
}

const NoRecords = () => {
  return (
    <div className='no-payment-records'>
      <h3>No payments have been recorded in your account</h3>
    </div>
  )
}

const prettify_membership = compose(join(' '), map(pipe(split(''), adjust(toUpper, 0), join(''))), split('-'))

export default connect(pick([ 'payments' ]), { fetch_member_user })(MemberPaymentsTable)
