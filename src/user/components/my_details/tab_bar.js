import React from 'react'
import { map, compose, join, over, lensIndex, toUpper, head, split, zip } from 'ramda'

import { Tabs, Tab } from 'react-bootstrap'

import EditDetails from './edit_details.js'
import MembershipDetails from './membership_details.js'


export default ({ ...props, change_tab }) => {
  const tab = ([ key, component ]) =>
    <Tab eventKey={key} key={key} title={title_from_key(key)} disabled={props.mode === 'edit'}>
      {component(props)}
    </Tab>

  return (
    <Tabs activeKey={props.active_tab} onSelect={change_tab} >
      {map(tab, zip(keys, components))}
    </Tabs>
  )
}

const keys = [ 'contact_details', 'membership_details' ]
const components = [ EditDetails, MembershipDetails ]

const first_to_upper =
  compose(join(''), over(lensIndex(0), toUpper))

const take_first =
 compose(head, split('_'))

const title_from_key =
  compose(first_to_upper, take_first)
