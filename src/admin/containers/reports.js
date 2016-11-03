import React from 'react'
import { connect } from 'react-redux'

import { GiftAidReport, DelivererReport } from './member_analysis.js'
import { PayingIn, NonCheque } from './payment_reports.js'

import { gift_aid_tab, deliverers_tab } from '../redux/modules/member_analysis.js'

const tab_mapper = { GiftAidReport
                   , DelivererReport
                   , PayingIn
                   , NonCheque
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
        <button className='member-analysis-tab' onClick={() => { this.props.gift_aid_tab(); this.setState({ active_tab: 'GiftAidReport' }) }}>Members by Gift Aid Status</button>
        <button className='member-analysis-tab' onClick={() => { this.props.deliverers_tab(); this.setState({ active_tab: 'DelivererReport' }) }}>Members by Deliverer</button>
        <button className='member-analysis-tab' onClick={() => this.setState({ active_tab: 'NonCheque' })}>Non Cheque Payments</button>
        <button className='member-analysis-tab' onClick={() => this.setState({ active_tab: 'PayingIn' })}>Paying In Slips</button>
        {this.state.active_tab && <ActiveComponent />}
      </div>
    )
  }
}

export default connect(null, { gift_aid_tab, deliverers_tab })(Reports)
