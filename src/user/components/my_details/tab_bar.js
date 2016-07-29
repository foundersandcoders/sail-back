import React from 'react'

import { Tabs, Tab } from 'react-bootstrap'

import ContactDetails from './contact_details.js'


export default ({...props, active_tab, change_tab }) =>
  <Tabs activeKey={active_tab} onSelect={change_tab} id="controlled-tab-example">
    <Tab eventKey={'contact_details'} title="contact_details">{ContactDetails(props)}</Tab>
    <Tab eventKey={'membership_details'} title="membership_details"></Tab>
    <Tab eventKey={'account_details'} title="account_details" ></Tab>
  </Tabs>
