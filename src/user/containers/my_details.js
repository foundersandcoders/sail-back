import React from 'react'
import { connect } from 'react-redux'
import
  { fetch_user_details
  , submit_user_details
  } from '../redux/modules/my_details.js'
import { toggle_member_mode } from '../../shared/redux/modules/mode.js'
import { change_tab } from '../redux/modules/active_tab.js'
import { pick } from 'ramda'
import TabBar from '../components/my_details/tab_bar.js'

class MyDetails extends React.Component {
  componentDidMount () {
    this.props.fetch_user_details()
  }

  render () {
    return (
      <TabBar {...this.props} />
    )
  }
}

export default connect(pick(['active_tab', 'mode']),
  { fetch_user_details
  , change_tab
  , submit_user_details
  , toggle_member_mode
  })(MyDetails)
