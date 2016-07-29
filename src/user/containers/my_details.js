import React from 'react'
import { connect } from 'react-redux'

import { fetch_user_details, change_tab } from '../redux/modules/my_details.js'

import TabBar from '../components/my_details/tab_bar.js'

class MyDetails extends React.Component {

  componentDidMount () {
    this.props.fetch_user_details()
  }

  render () {
    return (
      <div>
        {TabBar(this.props)}
      </div>
    )
  }
}
const mapStateToProps = ({ my_details: { active_tab, user_details }}) => (
  { active_tab
  , user_details
  }
)

export default connect(mapStateToProps, { fetch_user_details, change_tab })(MyDetails)
