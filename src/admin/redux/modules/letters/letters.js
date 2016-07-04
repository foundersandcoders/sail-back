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
  , ifElse
  , prop
} = require('ramda')

const { sub_reminder } = require('./bodies.js')
const { sub_reminder_SO } = require('./bodies.js')

const SEND_NEWSLETTER_POST =
  'SEND_NEWSLETTER_POST'
const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'
const TOGGLE_RECIPIENT_LIST =
  'TOGGLE_RECIPIENT_LIST'

type State = typeof initialState

import type { Action, Reducer } from 'redux'

const initialState = {
  post_members: { members: [], shown: false }
  , sub_reminders: { reminderLetters: [], shown: false }
  , letters_view: false
}

const reducer: Reducer<State, Action>
 = (state = initialState, { type, payload }) => {
   switch (type) {
   case SEND_NEWSLETTER_POST:
     const new_post_members = { ...state.post_members, members: payload.results }
     return { ...state, post_members: new_post_members, letters_view: false}
   case SEND_SUB_REMINDER_POST:
     const ids = pick([ 'id', 'first_name', 'last_name' ])
     const emails = compose(objOf('email_content'), bodyPicker)
     const shape = map(liftN(3, unapply(reduce(merge, {})))(emails, addresses, ids))
     const new_sub_reminders = { ...state.sub_reminders, reminderLetters: shape(payload.results) }
     return { ...state, sub_reminders: new_sub_reminders, letters_view: true}
   case TOGGLE_RECIPIENT_LIST:
     const section = payload.section
     return { ...state, [section]: { ...state[section], shown: payload.shown } }
   default:
     return state
   }
 }

export default reducer

export const send_newsletter_post =
  createAction(SEND_NEWSLETTER_POST, () => get_body('api/post_members'))

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post_sub_reminders'))

export const toggle_recipient_list =
  createAction(TOGGLE_RECIPIENT_LIST, (section, shown) => ({ section, shown }))

const addressProps = [ 'address1', 'address2', 'address3', 'address4', 'county', 'postcode' ]
const addresses = compose(objOf('address'), props(addressProps))

const bodyPicker = ifElse(prop('standing_order'), sub_reminder_SO, sub_reminder)
