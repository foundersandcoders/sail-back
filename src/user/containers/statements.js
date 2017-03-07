import React from 'react'
import { connect } from 'react-redux'
import { pick, isEmpty, length, compose, join, map, split, toUpper, adjust, pipe, propOr } from 'ramda'

import { fetch_member_user, update_member_user } from '../../shared/redux/modules/member.js'
import { add_donation } from '../redux/modules/user_payments.js'

const PaymentsTable = require('../../shared/components/payments_table')

class MemberPaymentsTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      membership_changed: false
    }
  }

  componentDidMount () {
    this.props.fetch_member_user()
  }

  shouldComponentUpdate ({ user_payments: { donation_made }, payments, personal_details }) {
    var donation_added = this.props.user_payments.donation_made !== donation_made
    var payments_updated = length(this.props.payments) !== length(payments)
    var membership_changed = propOr('annual-single', 'value')(this.props.personal_details.membership_type) !== personal_details.membership_type.value

    membership_changed && this.setState({ membership_changed: true })

    return donation_added || payments_updated || membership_changed
  }

  componentDidUpdate () {
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

export default connect(pick(['payments', 'user_payments', 'personal_details' ]), { fetch_member_user, add_donation, update_member_user })(MemberPaymentsTable)
