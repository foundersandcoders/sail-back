import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { list_gift_aid
       , list_by_deliverer
       , LIST_GIFT_AID
       , LIST_BY_DELIVERER
       }
from '../redux/modules/member_analysis.js'


import SearchResults from '../components/search_results.js'

const MemberAnalysis = (props) =>
  <div>
    <button onClick={props.list_gift_aid}>Members with Gift Aid Signed</button>
    <button onClick={props.list_by_deliverer}>Members by Deliverer</button>
    {props.member_analysis.active_tab && map_tab[props.member_analysis.active_tab](props)}
  </div>

const GiftAidSection = (props) =>
  <SearchResults results={props.member_analysis.gift_aid_members} />


const ListByDelivererSection = (props) => {
  console.log(props)
  return props.member_analysis.members_by_deliverer.length > 0
  ? <SearchResults results={props.member_analysis.members_by_deliverer} />
  : <div>
      <h2>Search for Deliverer</h2>
      <form onSubmit={(e) => {
          e.preventDefault()
          props.list_by_deliverer(e.target[0].value) }}>
        <input type='text' required/>
        <button type='submit'>Search</button>
      </form>
    </div>
    }

const map_tab =
  { [LIST_GIFT_AID]: GiftAidSection
  , [LIST_BY_DELIVERER]: ListByDelivererSection
  }

export default connect(pick(['member_analysis']), { list_gift_aid, list_by_deliverer })(MemberAnalysis)
