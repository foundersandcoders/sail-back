import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { fetch_member_user } from '../../shared/redux/modules/member.js'
import { add_donation } from '../redux/modules/user_payments.js'

const PaymentsTable = require('../../shared/components/payments_table')

class MemberPaymentsTable extends React.Component {
  componentDidMount () {
    this.props.fetch_member_user()
  }

  render () {
    return (
      <div className='donation-section'>
        <PaymentsTable payments={this.props.payments} />
        {this.props.user_payments.donation_made ? SuccessfulDonation(this.props.fetch_member_user) : DonationForm(this.props.add_donation)}
      </div>
    )
  }
}

const DonationForm = (add_donation) => {
  return (
    <div className='donation-form'>
      <h4>
        In order to make membership of the Friends available to as many people
        as possible we try to keep our annual subscription rates down. Perhaps
        you would like to help by making a donation.
      </h4>
      <form onSubmit={(e) => {
          e.preventDefault()
          add_donation({ amount: e.target[0].value })
      }}
      >
        <input type='number' placeholder='£10' />
        <button type='submit'>Add donation to my account</button>
      </form>
    </div>
  )
}

// TODO: think of somehwere else to fire off this action

const SuccessfulDonation = (fetch_member_user) => {
  fetch_member_user()
  return (
    <div className='successful-donation'>
      <h3>Your records have been updated</h3>
    </div>
  )
}
export default connect(pick(['payments', 'user_payments']), { fetch_member_user, add_donation })(MemberPaymentsTable)
