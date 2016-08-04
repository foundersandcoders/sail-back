import { createAction } from 'redux-actions'
import { get_body, put_body } from 'app/http'
import format_date from 'app/format_date'
import standardise from 'app/standardise_date'
import { lensProp, over, toString, compose, map } from 'ramda'

import { TOGGLE_MEMBER_MODE } from '../../../shared/redux/modules/mode.js'
const FETCH_USER_DETAILS =
  'FETCH_USER_DETAILS'
const SUBMIT_USER_DETAILS =
  'SUBMIT_USER_DETAILS'

const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_DETAILS:
      const user = prepare_for_form(payload)
      return {...state, ...user, initial_values: {...user}}
    case SUBMIT_USER_DETAILS:
      return { ...state, user_details: update_data(toString)(format_date)(payload) } //TODO input response from db into form
    case TOGGLE_MEMBER_MODE:
      return { ...state, ...state.initial_values }
    default:
      return state
  }
}

const update = lens => fn => over(lens, fn)

const prepare_for_form = (member) =>
  ({ ...wrap_values(member)
  , other:
    { subscription_amount: member.subscription_amount
    , payments: member.payments
    }
  })

const wrap_values = map((v) => (v && { value: String(v) }))

const update_data = id_transform => date_transform =>
  compose(update(lensProp('id'))(id_transform), update(lensProp('due_date'))(date_transform))


export const fetch_user_details =
  createAction(FETCH_USER_DETAILS, () => get_body('/api/account'))

export const submit_user_details =
  createAction(SUBMIT_USER_DETAILS, (data) => {
    const shaped_data = update_data(Number)(standardise)(data)
    return put_body(shaped_data, '/api/account')
  })
