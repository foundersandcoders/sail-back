import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { fetch_member_user } from '../../shared/redux/modules/member.js'

const PaymentsTable = require('../../shared/components/payments_table')

class MemberPaymentsTable extends React.Component {
  componentDidMount () {
    this.props.fetch_member_user()
  }

  render () {
    return (
      <div>
        <PaymentsTable payments={this.props.payments} />
        <DonationSection />
      </div>
    )
  }
}

const DonationSection = () => {
  return (
    <div className='donation-section'>
      <h4>
        In order to make membership of the Friends available to as many people
        as possible we try to keep our annual subscription rates down. Perhaps
        you would like to help by making a donation.
      </h4>
      <form>
        <input type='number' placeholder='£10' />
        <button type='submit'>Add donation to my account</button>
      </form>
    </div>
  )
}

export default connect(pick(['payments']), { fetch_member_user })(MemberPaymentsTable)
