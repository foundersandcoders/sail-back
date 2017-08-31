const { createAction } = require('redux-actions')
const { get_body, post_body } = require('app/http')
const { merge, compose, objOf, map, props, pick, reduce, liftN, unapply, ifElse, prop, assoc, concat }
  = require('ramda')

const { sub_reminder, subscription_due } = require('./bodies.js')

import { PATH_UPDATE } from '../../../../shared/redux/modules/route.js'
export const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'
export const TOGGLE_RECIPIENT_LIST =
  'TOGGLE_RECIPIENT_LIST'
export const SUBSCRIPTION_DUE_POST_TAB =
  'SUBSCRIPTION_DUE_POST_TAB'
export const SEND_SUBSCRIPTION_DUE_POST =
  'SEND_SUBSCRIPTION_DUE_POST'
export const SHOW_LETTER =
  'SHOW_LETTER'

type State = typeof initialState

import type { Action, Reducer } from 'redux'

const initialState =
  { post_members: []
  , sub_letters: []
  , active_tab: ''
  , shown: false
  , shown_letter_index: 0
  }

const reducer: Reducer<State, Action>
 = (state = initialState, { type, payload }) => {
   const ids = pick([ 'id', 'first_name', 'last_name', 'title' ])
   const injectLetterContent = body => compose(objOf('letter_content'), body)
   const shape = body => map(liftN(3, unapply(reduce(merge, {})))(injectLetterContent(body), addresses, ids))
   const changeTab = compose(assoc('active_tab', type), assoc('shown', false), assoc('shown_letter_index', 0))

   switch (type) {
   case SEND_SUB_REMINDER_POST:
     return changeTab({ ...state, sub_letters: shape(sub_reminder)(payload.results) })
   case SEND_SUBSCRIPTION_DUE_POST:
     return { ...state, sub_letters: shape(subscription_due)(payload.results) }
   case SUBSCRIPTION_DUE_POST_TAB:
     return changeTab({...state, sub_letters: []})
   case TOGGLE_RECIPIENT_LIST:
     return { ...state, shown: !state.shown }
   case SHOW_LETTER:
     return { ...state, shown_letter_index: payload }
   case PATH_UPDATE:
     return initialState
   default:
     return state
   }
 }

export default reducer

export const show_letter =
  createAction(SHOW_LETTER)

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post-sub-reminders'))

export const toggle_recipient_list =
  createAction(TOGGLE_RECIPIENT_LIST)

export const send_subscription_due_post =
  createAction(SEND_SUBSCRIPTION_DUE_POST, body => post_body({...body, news_type: 'post'}, 'api/subscription-due-correspondence'))

export const subscription_due_post_tab =
  createAction(SUBSCRIPTION_DUE_POST_TAB)

const addressProps = [ 'address1', 'address2', 'address3', 'address4', 'county', 'postcode' ]

const build_address = (member) =>
  concat
    ( [`${member.title} ${member.first_name || member.initials || ''} ${member.last_name}`]
    , props(addressProps)(member)
    )

const addresses = compose(objOf('address'), build_address)
