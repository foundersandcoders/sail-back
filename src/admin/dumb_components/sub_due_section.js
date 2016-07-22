import React from 'react'

const { check_tests, date, exists } = require('app/validate')
import SubDueForm from './sub_due_form.js'
import { assoc, reduce, unapply, converge, mergeAll, reverse, split, compose, join, map } from 'ramda'

const format_date = compose(join('-'), reverse, split('/'))

export default ({ fetch_sub_due, component, checker, ...props }) => {
  const send_request = (data) => {
    fetch_sub_due(map(format_date, data))
  }
  return (
    <div>
      {checker
        ? component(props)
        : <SubDueForm
            fields={fields}
            onSubmit={send_request}
            validate={validate}
          />
      }
    </div>
  )
}

const fields =
[ 'start'
, 'end'
]

const validate = values => {
  const date_tests = reduce
    ( (tests, key) =>
      assoc(key, date, tests)
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
