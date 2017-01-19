import React from 'react'
import { connect } from 'react-redux'

import { GiftAidReport, DelivererReport, OverdueReport, EmailBouncedReport, NumbersReport, MembershipReport } from './member_analysis.js'
import { PayingIn, NonCheque } from './payment_reports.js'

import { deliverers_tab, list_120_overdue, change_tab, get_numbers_report } from '../redux/modules/member_analysis.js'

const tab_mapper = { GiftAidReport
                   , DelivererReport
                   , PayingIn
                   , NonCheque
                   , OverdueReport
                   , EmailBouncedReport
                   , NumbersReport
                   , MembershipReport
                   }

class Reports extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active_tab: ''
    }
  }

  render () {
    const ActiveComponent = tab_mapper[this.state.active_tab]
    return (
      <div className='reports-container'>
        <div className='button-container'>
          <button className='tabs' onClick={() => { this.props.change_tab(); this.setState({ active_tab: 'GiftAidReport' }) }}>Gift Aid Status</button>
          <button className='tabs' onClick={() => { this.props.deliverers_tab(); this.setState({ active_tab: 'DelivererReport' }) }}>Deliverer</button>
          <button className='tabs' onClick={() => { this.props.change_tab(); this.props.list_120_overdue(); this.setState({ active_tab: 'OverdueReport' }) }}>120 Days Overdue</button>
          <button className='tabs' onClick={() => { this.props.change_tab(); this.setState({ active_tab: 'EmailBouncedReport' }) }}>Email Bounced</button>
          <button className='tabs' onClick={() => { this.props.change_tab(); this.props.get_numbers_report(); this.setState({ active_tab: 'NumbersReport' }) }}>Member Numbers</button>
          <button className='tabs' onClick={() => { this.props.change_tab(); this.setState({ active_tab: 'MembershipReport' }) }}>Membership</button>
          <button className='tabs' onClick={() => this.setState({ active_tab: 'NonCheque' })}>Non Cheque Payments</button>
          <button className='tabs' onClick={() => this.setState({ active_tab: 'PayingIn' })}>Paying In Slips</button>
        </div>
        {this.state.active_tab && <ActiveComponent />}
      </div>
    )
  }
}

export default connect(null, { deliverers_tab, list_120_overdue, change_tab, get_numbers_report })(Reports)
