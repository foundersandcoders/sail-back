import React from 'react'
import { connect } from 'react-redux'
import
  { fetch_user_details
  , submit_user_details
  , change_tab
  , toggle_edit_mode
  } from '../redux/modules/my_details.js'

import { prop } from 'ramda'


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

export default connect(prop('my_details'),
  { fetch_user_details
  , change_tab
  , submit_user_details
  , toggle_edit_mode
  })(MyDetails)
