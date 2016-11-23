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
        {this.state.membership_changed
          ? SuccessfulMembershipChange(propOr('annual-single', 'value')(this.props.personal_details.membership_type))
          : ChangeMembershipForm (this.props.update_member_user, propOr('annual-single', 'value')(this.props.personal_details.membership_type))
        }
        {this.props.user_payments.donation_made ? SuccessfulDonation() : DonationForm(this.props.add_donation)}
      </div>
    )
  }
}

const ChangeMembershipForm = (update_member, membership_type) => {
  return (
    <div className='form-container'>
      <h4>
        Your membership is currently <b>{prettify_membership(membership_type)}</b>.
        If you would like to change it please select one from the dropdown menu and
        click 'Change Membership'.
      </h4>
      <form onSubmit={(e) => {
          e.preventDefault()
          return e.target[0].value !== '' && update_member({ membership_type: e.target[0].value })
      }}
      >
        <select name='membership_type'>
          <option value=''>Choose Membership</option>
          <option value='annual-single'>Annual Single</option>
          <option value='annual-double'>Annual Double</option>
          <option value='annual-family'>Annual Family</option>
          <option value='life-single'>Life Single</option>
          <option value='life-double'>Life Double</option>
        </select>
        <button type='submit'>Change Membership</button>
      </form>
    </div>
  )
}

const SuccessfulMembershipChange = (membership_type) => {
  return (
    <div className='successful-donation'>
      <h3>
        Your membership has been changed to <b>{prettify_membership(membership_type)}</b> and your payment records updated.
      </h3>
    </div>
  )
}

const DonationForm = (add_donation) => {
  return (
    <div className='form-container'>
      <h4>
        In order to make membership of the Friends available to as many people
        as possible we try to keep our annual subscription rates down.
        If you would like to add a donation please enter the amount in the box
        and click 'Make Donation'. Otherwise select the 'Make a Payment' tab above.
      </h4>
      <form onSubmit={(e) => {
          e.preventDefault()
          add_donation({ amount: e.target[0].value })
      }}
      >
        <input type='number'/>
        <button type='submit'>Make Donation</button>
      </form>
    </div>
  )
}

const SuccessfulDonation = () => {
  return (
    <div className='successful-donation'>
      <h3>Thanks for your donation. It has been added to your records.</h3>
    </div>
  )
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
