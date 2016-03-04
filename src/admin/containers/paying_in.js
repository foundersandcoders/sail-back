import React, { createClass } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import { receive_paying_in } from '../redux/modules/paying_in.js'

const PayingIn = (
  { receive_paying_in
  }
) =>
  <div className='main-container'>
    <form onSubmit={compose(receive_paying_in, get_form_value, prev_def)}>
      <input />
      <button type='submit'>HI</button>
    </form>
  </div>

const get_form_value = ({ target }) => target.children[0].value
const prev_def = (e) => { e.preventDefault(); return (e) }

module.exports = connect(() => ({}), { receive_paying_in })(PayingIn)

