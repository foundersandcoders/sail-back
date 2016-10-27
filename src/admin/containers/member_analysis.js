import React from 'react'
import { connect } from 'react-redux'
import { pick, isEmpty } from 'ramda'

import SearchResults from '../components/search_results.js'

import { gift_aid_tab
       , list_by_deliverer
       , deliverers_tab
       , list_by_gift_aid_status
       , GIFT_AID_TAB
       , DELIVERERS_TAB
       }
from '../redux/modules/member_analysis.js'

const MemberAnalysis = (props) => {
  const { gift_aid_tab, deliverers_tab, member_analysis: { active_tab } } = props
  return (
    <div className='member-analysis-tabs-container'>
      <button className='member-analysis-tab' onClick={gift_aid_tab}>Members by Gift Aid Status</button>
      <button className='member-analysis-tab' onClick={deliverers_tab}>Members by Deliverer</button>
      {active_tab && map_tab[active_tab](props)}
    </div>
  )
}

const GiftAidSection = (props) => {
  const { member_analysis: { members_by_gift_aid_status, no_matches } } = props
  return !isEmpty(members_by_gift_aid_status) || no_matches
    ? <SearchResults results={members_by_gift_aid_status} error={no_matches}/>
    : GiftAidForm(props)
}

const GiftAidForm = ({ list_by_gift_aid_status }) =>
  <div className='member-analysis-form-container'>
    <h2>Select Gift Aid Status</h2>
    <form onSubmit={e => {
      e.preventDefault()
      list_by_gift_aid_status(e.target[0].value)
    }}>
      <select className='member-analysis-dropdown'>
        <option value='true'>Signed</option>
        <option value='false'>Not Signed</option>
        <option value='null'>Unknown</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>

const DelivererSection = (props) => {
  const { member_analysis: { members_by_deliverer, no_matches } } = props
  return !isEmpty(members_by_deliverer) || no_matches
    ? <SearchResults results={members_by_deliverer} error={no_matches}/>
    : DelivererForm(props)
}

// TODO: possibly use queryselector rather than e.target.value

const DelivererForm = ({ list_by_deliverer, member_analysis: { deliverers } }) =>
  <div className='member-analysis-form-container'>
    <h2>Search for Deliverer</h2>
    <form onSubmit={e => {
      const deliverer = e.target[0].value === 'No Deliverer' ? 'null' : e.target[0].value
      e.preventDefault()
      list_by_deliverer(deliverer)
    }}>
      <select className='member-analysis-dropdown'>
        {deliverers.map((deliverer, i) =>
          <option key={i}>{deliverer}</option>)
        }
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>

const map_tab =
  { [GIFT_AID_TAB]: GiftAidSection
  , [DELIVERERS_TAB]: DelivererSection
  }

export default connect(pick(['member_analysis']),
  { gift_aid_tab, list_by_deliverer, deliverers_tab, list_by_gift_aid_status })(MemberAnalysis)
