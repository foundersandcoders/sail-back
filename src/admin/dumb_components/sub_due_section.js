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

  const ob = converge(unapply(mergeAll),
    [ check_tests('invalid date', date_tests)
    , check_tests('required', required_tests)
    ])(values)

    console.log(ob)
    // This seems to suggest validation is working as expected although the rendered messages don't correspond, and only seem to reflect the state of the 'start' date.
    // dates should be of form (02/02/2016) and cannot accept 2017 which will be a problem
    // shall i change the date test to allow 2017 or should i make a different test?
    // Also it seems to accept anything from 1,2,3,4,5,...,2016 for the year so i will add in a check that the year is greater than 1900

    return ob
}
