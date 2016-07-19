const { createAction } = require('redux-actions')
const { get_body } = require('app/http')
const { merge, compose, objOf, map, props, pick, reduce, liftN, unapply, ifElse, prop, assoc, concat }
  = require('ramda')

const { sub_reminder, sub_reminder_SO, subscription_due } = require('./bodies.js')

export const SEND_NEWSLETTER_POST =
  'SEND_NEWSLETTER_POST'
export const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'
export const TOGGLE_RECIPIENT_LIST =
  'TOGGLE_RECIPIENT_LIST'
export const SEND_SUBSCRIPTION_DUE_POST =
  'SEND_SUBSCRIPTION_DUE_POST'
export const SHOW_LETTER =
  'SHOW_LETTER'

type State = typeof initialState

import type { Action, Reducer } from 'redux'

const initialState =
  { post_members: { members: [], shown: false }
  , sub_letters: { reminderLetters: [], shown: false, shown_letter_index: 0 }
  , active_tab: ''
  }

const reducer: Reducer<State, Action>
 = (state = initialState, { type, payload }) => {
   const ids = pick([ 'id', 'first_name', 'last_name', 'title' ])
   const injectLetterContent = body => compose(objOf('letter_content'), body)
   const shape = body => map(liftN(3, unapply(reduce(merge, {})))(injectLetterContent(body), addresses, ids))
   const changeTab = assoc('active_tab', type)

   switch (type) {
   case SEND_NEWSLETTER_POST:
     const new_post_members = { ...state.post_members, members: payload.results }
     return changeTab({ ...state, post_members: new_post_members })
   case SEND_SUB_REMINDER_POST:
     const new_sub_letters = { ...state.sub_letters, reminderLetters: shape(subReminderBody)(payload.results) }
     return changeTab({ ...state, sub_letters: new_sub_letters })
   case SEND_SUBSCRIPTION_DUE_POST:
     const new_sub_due_letters = { ...state.sub_letters, reminderLetters: shape(subscription_due)(payload.results) }
     return changeTab({ ...state, sub_letters: new_sub_due_letters })
   case TOGGLE_RECIPIENT_LIST:
     const section = payload.section
     return { ...state, [section]: { ...state[section], shown: payload.shown } }
   case SHOW_LETTER:
     return { ...state, sub_letters: { ...state.sub_letters, shown_letter_index: payload } }
   default:
     return state
   }
 }

export default reducer

export const show_letter =
  createAction(SHOW_LETTER)

export const send_newsletter_post =
  createAction(SEND_NEWSLETTER_POST, () => get_body('api/post_members'))

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post_sub_reminders'))

export const toggle_recipient_list =
  createAction(TOGGLE_RECIPIENT_LIST, (section, shown) => ({ section, shown }))

export const send_subscription_due_post =
  createAction(SEND_SUBSCRIPTION_DUE_POST, () => get_body('api/subscription-due-post'))


const addressProps = [ 'address1', 'address2', 'address3', 'address4', 'county', 'postcode' ]
const build_address = (member) =>
  concat([`${member.title} ${member.first_name || member.initials} ${member.last_name}`], props(addressProps)(member))

const addresses = compose(objOf('address'), build_address)

const subReminderBody = ifElse(prop('standing_order'), sub_reminder_SO, sub_reminder)
