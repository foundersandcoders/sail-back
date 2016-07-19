const { createAction } = require('redux-actions')
const { get_body } = require('app/http')
const { merge, compose, objOf, map, props, pick, reduce, liftN, unapply, ifElse, prop, assoc, omit }
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

// TODO ABSTRACT OUT SHOWN_LETTER_INDEX AND MAKE POST_MEMBERS AND SUB_LETTERS INTO JUST ARRAYS

const initialState =
  { post_members: { members: [] }
  , sub_letters: { reminderLetters: [], shown_letter_index: 0 }
  , active_tab: ''
  , shown: false
  , shown_letter_index: 0
  }

const reducer: Reducer<State, Action>
 = (state = initialState, { type, payload }) => {
  //  const update = omit([ 'post_members', 'sub_letters' ])
  //  const newState = update(state)
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
    //  const section = payload.section
    //  return { ...state, [section]: { ...state[section], shown: payload.shown } }
    console.log(payload);
     return { ...state, shown: !state.shown }
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
  createAction(TOGGLE_RECIPIENT_LIST)

export const send_subscription_due_post =
  createAction(SEND_SUBSCRIPTION_DUE_POST, () => get_body('api/subscription-due-post'))

const addressProps = [ 'address1', 'address2', 'address3', 'address4', 'county', 'postcode' ]

const addresses = compose(objOf('address'), props(addressProps))

const subReminderBody = ifElse(prop('standing_order'), sub_reminder_SO, sub_reminder)
