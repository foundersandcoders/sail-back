import React from 'react'
import { map, compose, join, over, lensIndex, toUpper, head, split, zip } from 'ramda'

import { Tabs, Tab } from 'react-bootstrap'

import ContactDetails from './contact_details.js'
import MembershipDetails from './membership_details.js'
import AccountDetails from './account_details.js'


export default ({...props, active_tab, change_tab }) => {
  const tab = ([ key, component ]) =>
    <Tab eventKey={key} key={key} title={title_from_key(key)}>
      {component(props)}
    </Tab>

  return (
    <Tabs activeKey={active_tab} onSelect={change_tab} >
      {map(tab, zip(keys, components) )}
    </Tabs>
  )
}


const keys = [ 'contact_details', 'membership_details', 'account_details' ]
const components = [ ContactDetails, MembershipDetails, AccountDetails ]

const first_to_upper =
  compose(join(''), over(lensIndex(0), toUpper))

const take_first =
 compose(head, split('_'))

const title_from_key =
  compose(first_to_upper, take_first)
