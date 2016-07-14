/* @flow */
const { createAction } = require('redux-actions')
const { get_body, post } = require('app/http')
const { lensPath, over, not, indexBy, map, propOr, merge, ifElse, gte,
  cond, where, objOf, zip, set, lift, assoc, dissoc } =
      require('ramda')
const { K, compose, pipe } = require('sanctuary')

const { PATH_UPDATE } = require('../route.js')
const { standing, lates, newsletter_alert, newsletter_reminder } =
  require('./bodies.js')

const SEND_WELCOME =
  'SEND_WELCOME'
const SEND_SUB_REMINDER =
  'SEND_SUB_REMINDER'
const SEND_NEWSLETTER =
  'SEND_NEWSLETTER'
const SEND_NEWS_REMINDER =
  'SEND_NEWSLETTER_REMINDER'
const COMPOSE_CUSTOM =
  'COMPOSE_CUSTOM'
const TOGGLE_LIST =
  'TOGGLE_LIST'
const TOGGLE_CONTENT =
  'TOGGLE_CONTENT'
const SUBMIT_EMAIL =
  'SUBMIT_EMAIL'
const GET_BOUNCED =
  'GET_BOUNCED'

import type { Action, Reducer } from 'redux'

type State = { emails: { [key: string]: { overdue: number } } }

const initialState = { emails: { } }

const reducer : Reducer<State, Action>
  = (state = initialState, { type, payload }) => {
    const newState = compose(dissoc('custom_emails'), dissoc('email_sent'))(state)
    const update = lens => value => (set(lens, value, newState) : State)
    const emails = lensPath([ 'emails' ])
    const sent = lensPath([ 'email_sent' ])
    const list_hidden = lensPath([ 'list_hidden' ])
    const new_emails = template => shape =>
      update(emails)(map(compose(Email, template), shape(payload.results)))
    switch (type) {
      case SEND_SUB_REMINDER:
        return new_emails(template_subs)(primaries)
      case SEND_NEWSLETTER:
        return new_emails(newsletter_alert)(shape_newsletters)
      case SEND_NEWS_REMINDER:
        return new_emails(newsletter_reminder)(shape_newsletters)
      case COMPOSE_CUSTOM:
        return { ...newState, custom_emails: { members: payload.results }}
      case TOGGLE_LIST:
        return (over(list_hidden, not, state): State)
      case TOGGLE_CONTENT:
        return toggle_show(payload)(state)
      case SEND_WELCOME:
        return update(sent)(true)
      case SUBMIT_EMAIL:
        return email_response(state)(payload.body)
      case GET_BOUNCED:
        console.log('in bounced ');
        return state
      default:
        return state
    }
  }

export default reducer

const Email = content => (
  { content: content.split('\n')
  , shown: false
  }
)

const email_response = state => resBody => resBody
  ? { ...state, email_sent: 'success' }
  : { ...state, email_sent: resBody.error.recipient }

const time_check = pipe([gte, objOf('overdue'), where])

const templating =
  compose(cond, zip(map(time_check, [60, 90, Infinity])))

const placeholder = compose(K)(objOf('content'))

const missing_standing_order = templating(standing)

const late_payment = templating(lates)

const template_subs = ifElse
  ( propOr(false, 'standing_order')
  , missing_standing_order
  , late_payment
  )

const indexByProp = compose(indexBy, propOr(''))

const greeting = member => assoc
  ( 'greeting'
  , member.first_name || member.title + ' ' + member.last_name
  , member
  )

const [ primaries, secondaries ] =
  map
    ( compose(map(map(map(greeting), dissoc('null'))), indexByProp)
    , [ 'primary_email', 'secondary_email' ]
    )

const shape_newsletters = lift(merge)(primaries, secondaries)

const toggle_show = (address: string) => (state: State): State => {
  const shown_lens = lensPath([ 'emails', address, 'shown' ])
  return over(shown_lens, not, state)
}

export const send_welcome =
  createAction(SEND_WELCOME, email => post({ email }, '/api/members/welcome'))

export const send_sub_reminder =
  createAction(SEND_SUB_REMINDER, () => get_body('api/reminders'))

export const send_newsletter =
  createAction(SEND_NEWSLETTER, () => get_body('api/newsletter-alert'))

export const send_newsletter_reminder =
  createAction(SEND_NEWS_REMINDER, () => get_body('api/newsletter-alert'))

export const compose_custom =
  createAction(COMPOSE_CUSTOM, () => get_body('api/newsletter-alert'))

export const toggle_list =
  createAction(TOGGLE_LIST)

export const toggle_content =
  createAction(TOGGLE_CONTENT)

export const submit_email =
  createAction(SUBMIT_EMAIL, email => post({ email }, '/api/submit-email'))

export const get_bounced =
  createAction(GET_BOUNCED)
