const { createAction, handleAction } = require('redux-actions')
const { get_body, post } = require('app/http')
const { lensPath, over, not, indexBy, map, prop, merge, ifElse, flip, gte,
  cond, assoc, where, objOf, zip } =
      require('ramda')
const { K, compose, pipe } = require('sanctuary')

const { PATH_UPDATE } = require('./route.js')

const SEND_WELCOME =
  'SEND_WELCOME'
const SEND_REMINDER =
  'SEND_REMINDER'
const TOGGLE_CONTENT =
  'TOGGLE_CONTENT'

export default (state = {}, { type, payload }) => {
  const update = merge(state)
  switch (type) {
    case SEND_REMINDER:
      return update(map(template_emails, shape_reminders(payload.results)))
    case TOGGLE_CONTENT:
      return update(toggle_show(payload)(state))
    case SEND_WELCOME:
      return update({ email_sent: true })
    default:
      return state
  }
}

const time_check = pipe([gte, objOf('overdue'), where])

const templating = compose(cond, zip([ time_check(60), time_check(90), K(true)]))

const placeholder = compose(K, objOf('content'))

const missing_standing_order = templating(
  [ placeholder('30 day SO'), placeholder('60 day SO'), placeholder('90 day SO')]
)

const late_payment = templating(
  [ placeholder('30 day late'), placeholder('60 day late'), placeholder('90 day late')]
)

const template_emails = ifElse
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

const shape_reminders = compose(map(add_overdue), indexBy(prop('primary_email')))

const toggle_show = address => state => {
  const shown_lens = lensPath([ address, 'shown' ])
  return over(shown_lens, not, state)
}

export const send_welcome =
  createAction(SEND_WELCOME, email => post({ email }, '/api/members/welcome'))

export const send_reminder =
  createAction(SEND_REMINDER, () => get_body('api/reminders'))

export const toggle_content =
  createAction(TOGGLE_CONTENT)

