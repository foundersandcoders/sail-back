import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import { change_tab } from '../redux/modules/my_details.js'

const MyDetails = ({ active_tab, change_tab }) =>
  <div>
    <Tabs activeKey={active_tab} onSelect={change_tab} id="controlled-tab-example">
      <Tab eventKey={'contact_details'} title="contact_details">Tab 1 content</Tab>
      <Tab eventKey={'membership_details'} title="membership_details">Tab 2 content</Tab>
      <Tab eventKey={'account_details'} title="account_details" >Tab 3 content</Tab>
    </Tabs>
    <h1> My details view </h1>
  </div>

const mapStateToProps = ({ my_details: { active_tab }}) => (
  { active_tab }
)

export default connect(mapStateToProps, { change_tab })(MyDetails)
