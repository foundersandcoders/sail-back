/* @flow */
const { createAction } = require('redux-actions')
const { get_body, post, post_body } = require('app/http')

const
  { lensPath, over, not, indexBy, map, propOr, merge, zipWith, ifElse, gte
  , cond, where, objOf, zip, set, lift, assoc, dissoc, prop, converge, omit
  , sortBy, lensProp, reverse, filter, compose: R_compose }
  = require('ramda')
const { pipe, compose } = require('sanctuary')

const { standing, lates, newsletter_alert, newsletter_reminder, subscription_due } =
  require('./bodies.js')

import { PATH_UPDATE } from '../../../../shared/redux/modules/route.js'
export const SEND_SUB_REMINDER =
  'SEND_SUB_REMINDER'
export const SEND_NEWSLETTER =
  'SEND_NEWSLETTER'
export const SEND_NEWSLETTER_REMINDER =
  'SEND_NEWSLETTER_REMINDER'
export const COMPOSE_CUSTOM =
  'COMPOSE_CUSTOM'
export const GET_BOUNCED =
  'GET_BOUNCED'
export const SUB_DUE_TAB =
  'SUB_DUE_TAB'
const SEND_WELCOME =
  'SEND_WELCOME'
const TOGGLE_LIST =
  'TOGGLE_LIST'
const TOGGLE_CONTENT =
  'TOGGLE_CONTENT'
const SUBMIT_EMAIL =
  'SUBMIT_EMAIL'
const SUBMIT_CUSTOM_EMAIL =
  'SUBMIT_CUSTOM_EMAIL'
const SEND_SUBSCRIPTION_DUE_EMAIL =
  'SEND_SUBSCRIPTION_DUE_EMAIL'
const PREVIEW_CUSTOM =
  'PREVIEW_CUSTOM'
const EDIT_CUSTOM =
  'EDIT_CUSTOM'

import type { Action, Reducer } from 'redux'

type State = { emails: { [key: string]: { overdue: number } }
             , custom_emails: { }
             , email_sent: boolean
             , bounced: [ ]
             , invalid_emails: [ ]
             }

const initialState = { emails: { }
                     , custom_emails: { }
                     , email_sent: false
                     , bounced: [ ]
                     , invalid_emails: [ ]
                     }

const reducer : Reducer<State, Action>
  = (state = initialState, { type, payload }) => {
    const newState = omit(['custom_emails', 'email_sent' ])(state)
    const update = lens => value => (set(lens, value, newState) : State)
    const emails = lensPath([ 'emails' ])
    const sent = lensPath([ 'email_sent' ])
    const list_hidden = lensPath([ 'list_hidden' ])
    const new_emails = template => shape =>
      update(emails)(map(compose(Email, template), shape(payload.results)))
    const change_tab = assoc('active_tab', type)
    switch (type) {
      case SEND_SUB_REMINDER:
        return change_tab(new_emails(template_subs)(primaries))
      case SEND_NEWSLETTER:
        return change_tab(new_emails(newsletter_alert)(shape_newsletters))
      case SEND_NEWSLETTER_REMINDER:
        return change_tab(new_emails(newsletter_reminder)(shape_newsletters))
      case COMPOSE_CUSTOM:
        return change_tab({ ...newState, custom_emails: { members: payload.results } })
      case TOGGLE_LIST:
        return (over(list_hidden, not, state): State)
      case TOGGLE_CONTENT:
        return toggle_show(payload)(state)
      case SEND_WELCOME:
        return update(sent)(true)
      case SUBMIT_EMAIL:
        return email_response(state)(payload)
      case GET_BOUNCED:
        return change_tab({ ...newState, bounced: sort_by_date(payload.results.items) })
      case SUBMIT_CUSTOM_EMAIL:
        return email_response(state)(payload)
      case SEND_SUBSCRIPTION_DUE_EMAIL:
        return new_emails(subscription_due)(shape_newsletters)
      case SUB_DUE_TAB:
        return change_tab({...newState, emails: {}})
      case PREVIEW_CUSTOM:
          return { ...state, custom_emails: { ...state.custom_emails, preview: payload, mode: type } }
      case EDIT_CUSTOM:
        return { ...state, custom_emails: { ...state.custom_emails, mode: type } }
      case PATH_UPDATE:
        return initialState
      default:
        return state
    }
  }

export default reducer

const sort_by_date = pipe([map(over(lensProp('created_at'), Date.parse)), sortBy(prop('created_at')), reverse])

const Email = content => (
  { content: content.split('\n')
  , shown: false
  }
)

const email_response = state => res => (
  { ...state
  , email_sent: Boolean(res.results)
  , invalid_emails: R_compose(map(prop('address')), filter(result => result.error))(res.results)
  }
)

const time_check = pipe([gte, objOf('overdue'), where])

const templating =
  compose(cond, zip(map(time_check, [60, 90, Infinity])))

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
  createAction(SEND_NEWSLETTER_REMINDER, () => get_body('api/newsletter-alert'))

export const send_subscription_due_email =
  createAction(SEND_SUBSCRIPTION_DUE_EMAIL, body => post_body({...body, news_type: 'online'}, 'api/subscription-due'))

export const compose_custom =
  createAction(COMPOSE_CUSTOM, () => get_body('api/custom-email'))

export const toggle_list =
  createAction(TOGGLE_LIST)

export const toggle_content =
  createAction(TOGGLE_CONTENT)

export const submit_email =
  createAction(SUBMIT_EMAIL, email => post_body({ email }, '/api/submit-email'))

export const get_bounced =
  createAction(GET_BOUNCED, () => get_body('/api/get-bounced'))

export const sub_due_tab =
  createAction(SUB_DUE_TAB)

export const preview_custom =
  createAction(PREVIEW_CUSTOM)

export const edit_custom =
  createAction(EDIT_CUSTOM)

export const submit_custom_email =
  createAction(SUBMIT_CUSTOM_EMAIL, (members, form) => {
    const format_message = form => member => (
      [ form[0]
      , 'Friends of Chichester Harbour'
      , `Dear ${member.first_name || member.title} ${member.last_name},`
      , form[1]
      ]
    )
    const template = format_message(form)
    const emailBodies = map(compose(objOf('content'), template), members)
    const emailsArr = zipWith(merge, members, emailBodies)
    const setEmailKey = map(compose(indexBy, prop), ['primary_email', 'secondary_email'])
    const shapedEmails = compose(dissoc('null'), converge(merge, setEmailKey))(emailsArr)
    return post_body({ email: shapedEmails }, '/api/submit-email')
  })
