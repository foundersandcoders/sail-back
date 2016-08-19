import React from 'react'
import { connect } from 'react-redux'
import { fetch_member_user, update_member_user, deactivate_member, reactivate_member, update_membership_type }
  from '../../shared/redux/modules/member.js'
import { toggle_member_mode } from '../../shared/redux/modules/mode.js'
import { change_tab } from '../redux/modules/active_tab.js'
import { pick } from 'ramda'
import TabBar from '../components/my_details/tab_bar.js'

class MyDetails extends React.Component {
  componentDidMount () {
    this.props.fetch_member_user()
  }

  update_membership_type_click (e) {
    const { update_membership_type } = this.props
    update_membership_type(e.target.value)
  }

  render () {
    return (
      <TabBar {...this.props} update_membership_type_click={(e) => this.update_membership_type_click(e)}/>
    )
  }
}

export default connect(pick(['active_tab', 'mode', 'my_details']),
  { fetch_member_user
  , update_member_user
  , change_tab
  , toggle_member_mode
  , deactivate_member
  , reactivate_member
  , update_membership_type
  })(MyDetails)
