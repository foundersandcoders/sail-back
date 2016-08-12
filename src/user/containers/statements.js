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
      </div>
    )
  }
}

export default connect(pick(['payments']), { fetch_member_user })(MemberPaymentsTable)
