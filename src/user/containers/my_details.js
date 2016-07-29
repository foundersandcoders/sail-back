import React from 'react'
import { connect } from 'react-redux'

import { change_tab } from '../redux/modules/my_details.js'


import TabBar from '../components/my_details/tab_bar.js'


const MyDetails = (props) =>
  <div>
    {TabBar(props)}
  </div>

const mapStateToProps = ({ my_details: { active_tab }}) => (
  { active_tab }
)

export default connect(mapStateToProps, { change_tab })(MyDetails)
