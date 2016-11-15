import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import
  { fetch_member_user
  , update_member_user
  , deactivate_member
  , reactivate_member
  , toggle_gift_aid
  , cancel_standing_order
  , switch_to_online_news
  } from '../../shared/redux/modules/member.js'

import { toggle_member_mode } from '../../shared/redux/modules/mode.js'

import MembershipDetails from '../components/personal_details/membership_details.js'

class MyDetails extends React.Component {
  componentDidMount () {
    this.props.fetch_member_user()
  }

  render () {
    return (
      <MembershipDetails member_view_fields='membership' {...this.props} />
    )
  }
}

export default connect(pick(['mode', 'personal_details']),
  { fetch_member_user
  , update_member_user
  , toggle_member_mode
  , deactivate_member
  , reactivate_member
  , toggle_gift_aid
  , cancel_standing_order
  , switch_to_online_news
  })(MyDetails)
