import React from 'react'
import { isEmpty, assoc, reduce, unapply, converge, mergeAll, map } from 'ramda'
const { check_tests, date_max, exists } = require('app/validate')
const standardise_date = require('app/standardise_date')

import Table from '../../shared/components/table/index.js'

import SubDueForm from './sub_due_form.js'
import { fields } from '../form_fields/sub_due_form.js'


// renders table displaying the members that have been updated
const subs_due_table = (members) => isEmpty(members)
  ? <h3 className='table-header'>No members where updated</h3>
  : (<div><h3 className='table-header'>The following members were updated</h3>
      <Table className='subs-due-table'
        data={[[ 'Member No', 'Name', 'Amount', 'Due Date', 'Email/Letter', 'Balance Due'], members]}
      />
    </div>)


export default ({ update_subs_due, members }) => {
  const send_request = (data) => {
    update_subs_due(map(standardise_date, data))
  }

  return (
    <div className='subs-due'>
      <h1>Update Subscriptions Due</h1>
      <SubDueForm fields={fields} onSubmit={send_request} validate={validate} button_text="Update Members" />
      {members === null || subs_due_table(members)}
    </div>
  )
}



const validate = values => {
  const date_tests = reduce
    ( (tests, key) =>
      assoc(key, date_max, tests)
    , {}
    , fields
    )

  const required_tests = reduce
    ( (tests, key) =>
      assoc(key, exists, tests)
    , {}
    , fields
  )

  return converge(unapply(mergeAll),
    [ check_tests('invalid date', date_tests)
    , check_tests('required', required_tests)
    ])(values)
}
