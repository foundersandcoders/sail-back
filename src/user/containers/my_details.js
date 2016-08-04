import React from 'react'
import { connect } from 'react-redux'
import { fetch_member_user, update_member_user } from '../../shared/redux/modules/member.js'
import { toggle_member_mode } from '../../shared/redux/modules/mode.js'
import { change_tab } from '../redux/modules/active_tab.js'
import { pick } from 'ramda'
import TabBar from '../components/my_details/tab_bar.js'

class MyDetails extends React.Component {
  componentDidMount () {
    this.props.fetch_member_user()
  }

  render () {
    return (
      <TabBar {...this.props} />
    )
  }
}

export default connect(pick(['active_tab', 'mode']),
  { fetch_member_user
  , update_member_user
  , change_tab
  , toggle_member_mode
  })(MyDetails)
