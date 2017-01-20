import React from 'react'
import { pipe, prop, pick, values, join, over, lensProp, concat, ifElse, test, toString, replace } from 'ramda'

import format_date from 'app/format_date.js'
import to_title_case from 'app/to_title_case.js'
import { formatPounds } from 'app/monies'
import { format_due_date } from 'app/format_date.js'
import get_balance from 'app/get_balance'

const SingleResult = (member, fields) => {
  return (
    <a id='member-tag' href={`#/members/${member.id}`}>
      <div className='row'>
        {fields.map((field, i) => {
          return <div className={'col'} key={i}><p>{convert_field[field](member)}</p></div>
        })}
      </div>
    </a>
  )
}

export default (props) => {
  const data = typeof props.results === 'string' ? JSON.parse(props.results) : props.results
  return (
    <div className={`search-result ${props.className}`}>
      <div className='search-table-section-member'>
        <div className='search-table-section-member-header'>
          {props.fields.map((field, i) =>
            <div key={i} className={'col'}><p>{format_string(field)}</p></div>
          )}
        </div>
        {props.error && <div className='search-error'>No results</div>}
        <div className='search-table-section-member-rows'>
          {data.map((member, i) =>
            <div key={i} className='search-row'>
              {SingleResult(member, props.fields)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const format_payment = payment => {
  const time = payment.date.getTime()
  if (!time) return ''
  return format_date(time) + ' - ' + formatPounds(payment.amount)
}

const return_date_obj = date => new Date(date)

const add_date_obj_to_payment = over(lensProp('date'), return_date_obj)

const get_most_recent_payment = (most_recent, payment) =>
  payment.date.getTime() > most_recent.date.getTime() ? payment : most_recent

const is_payment = (payment) => { return payment.category === 'payment' }

const last_subscription = (payments) => {
  const most_recent_payment = payments
    .filter(is_payment)
    .map(add_date_obj_to_payment)
    .reduce(get_most_recent_payment, { date: { getTime: () => 0 } })
  return format_payment(most_recent_payment)
}

const format_string = string => to_title_case(string.replace(/-|_/g, ' '))

const convert_field = {
  id: prop('id'),
  name: pipe(pick([ 'last_name', 'first_name' ]), values, join(' ')),
  title: prop('title'),
  initials: prop('initials'),
  postcode: prop('postcode'),
  primary_email: prop('primary_email'),
  membership_type: pipe(prop('membership_type'), format_string),
  last_payment: pipe(prop('payments'), last_subscription),
  due_date: pipe(prop('due_date'), format_due_date),
  date_joined: pipe(prop('date_joined'), format_date),
  work_phone: prop('work_phone'),
  address1: prop('address1'),
  balance_due: pipe(prop('payments'), get_balance, toString, ifElse(test(/-/), replace('-', '-£'), concat('£')))
}
