import React, { createClass } from 'react'
import { connect } from 'react-redux'
import { compose, props, map, concat } from 'ramda'

import { receive_paying_in } from '../redux/modules/paying_in.js'

import Table from '../components/table'

const temp = [ 'member', 'surname', 'date', 'subscription', 'donation', 'event', 'payments', 'payment', 'balance' ]

const temp_x = map(props(temp))

const PayingIn = (
  { receive_paying_in
  , paying_in
  }
) =>
  <div className='main-container'>
    <form onSubmit={compose(receive_paying_in, get_form_value, prev_def)}>
      <input />
      <button type='submit'></button>
    </form>
    { paying_in.payments && <Table data={ [ temp, concat(temp_x(paying_in.payments), [props(temp, paying_in.totals)]) ] } /> }
  </div>

const get_form_value = ({ target }) => target.children[0].value
const prev_def = (e) => { e.preventDefault(); return (e) }

module.exports =
  connect(({ paying_in }) => ({ paying_in }), { receive_paying_in })(PayingIn)

