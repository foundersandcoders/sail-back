const { createAction, handleAction } = require('redux-actions')
const { get_body, post } = require('app/http')
const { lensPath, over, not, indexBy, map, prop, merge, ifElse, flip, gte,
  cond, assoc, where, objOf, zip, set } =
      require('ramda')
const { K, compose, pipe } = require('sanctuary')

const { PATH_UPDATE } = require('./route.js')

const SEND_WELCOME =
  'SEND_WELCOME'
const SEND_SUB_REMINDER =
  'SEND_SUB_REMINDER'
const SEND_NEWSLETTER =
  'SEND_NEWSLETTER'
const SEND_NEWS_REMINDER =
  'SEND_NEWSLETTER_REMINDER'
const TOGGLE_CONTENT =
  'TOGGLE_CONTENT'

export default (state = { emails: {} }, { type, payload }) => {
  const update = lens => value => set(lens, value, state)
  const emails = lensPath(['emails'])
  const sent = lensPath(['email_sent'])
  const new_emails =
    template => shape => update(emails)(map(template, shape(payload.results)))
  switch (type) {
    case SEND_SUB_REMINDER:
      return new_emails(template_subs)(shape_sub_reminders)
    case SEND_NEWSLETTER:
      return new_emails(newsletter_alert)(shape_emails)
    case SEND_NEWS_REMINDER:
      return new_emails(newsletter_reminder)(shape_emails)
    case TOGGLE_CONTENT:
      return toggle_show(payload)(state)
    case SEND_WELCOME:
      return update(sent)(true)
    default:
      return state
  }
}

const time_check = pipe([gte, objOf('overdue'), where])

const templating = compose(cond, zip(map(time_check, [60, 90, Infinity])))

const placeholder = compose(K, objOf('content'))

const missing_standing_order = templating(
  map(placeholder, [ '30 day SO', '60 day SO', '90 day SO' ])
)

const late_payment = templating(
  map(placeholder, [ '30 day late', '60 day late', '90 day late' ])
)

const newsletter_alert = placeholder('1st newsletter email')

const newsletter_reminder = placeholder('2nd newsletter email')

const template_subs = ifElse
  ( prop('standing_order')
  , missing_standing_order
  , late_payment
  )

const add_overdue = member => {
  const { last, due_date } = member
  return assoc('overdue', days_overdue(due_date, last), member)
}

const days_overdue = (due, last) =>
  ((new Date(due) - new Date('1/1/71')) - new Date(last))/(1000 * 60 * 60 * 24)

const shape_emails = indexBy(prop('primary_email'))

const shape_sub_reminders = compose(map(add_overdue), shape_emails)

const toggle_show = address => state => {
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

export const toggle_content =
  createAction(TOGGLE_CONTENT)

