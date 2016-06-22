const { createAction } = require('redux-actions')
const { get_body } = require('app/http')
const {
    merge
  , compose
  , objOf
  , map
  , props
  , pick
  , reduce
  , liftN
  , unapply
} = require('ramda')

const { sub_reminder } = require('./bodies.js')

const SEND_NEWSLETTER_POST =
  'SEND_NEWSLETTER_POST'
const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'

type State = typeof initialState

import type { Action, Reducer } from 'redux'

const initialState = {
  post_members: [],
  sub_reminders: []
}

const reducer: Reducer<State, Action>
 = (state = initialState, { type, payload }) => {
   switch (type) {
   case SEND_NEWSLETTER_POST:
     return { ...state, post_members: payload.results }
   case SEND_SUB_REMINDER_POST:
     const ids = pick([ 'id', 'first_name', 'last_name' ])
     const emails = compose(objOf('email_content'), sub_reminder)
     const shape = map(liftN(3, unapply(reduce(merge, {})))(emails, addresses, ids))
     return { ...state, sub_reminders: shape(payload.results) }
   default:
     return state
   }
 }

export default reducer

export const send_newsletter_post =
  createAction(SEND_NEWSLETTER_POST, () => get_body('api/post_members'))

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post_sub_reminders'))

const addressProps = [ 'address1', 'address2', 'address3', 'address4', 'county', 'postcode' ]
const addresses = compose(objOf('address'), props(addressProps))
