const { createAction } = require('redux-actions')
const { get_body } = require('app/http')
const { compose, objOf, map, props } = require('ramda')

const SEND_NEWSLETTER_POST =
  'SEND_NEWSLETTER_POST'
const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'

const initialState = []

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case SEND_NEWSLETTER_POST:
    return payload.results
  case SEND_SUB_REMINDER_POST:
  // console.log('reducer reached', map(addressArr, payload.results))
    console.log('reducer reached', objOf('email_content', inject(payload.results[0])))
    return payload.results
  default:
    return state
  }
}

export default reducer

export const send_newsletter_post =
  createAction(SEND_NEWSLETTER_POST, () => get_body('api/post_members'))

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post-sub-reminders'))

// const indexById = R.indexBy(R.prop('id'))
//
// const members = {
//   address1: '14 Palmers Road',
//   address2: 'GlobeTowns',
//   address3: 'Bethnal Green',
//   address4: 'Meath Gardens',
//   postcode: 'E1 0SY',
//   county: null,
//   amount: 37,
//   due_date: '2017-01-01T00:00:00.000Z',
//   first_name: 'Wil',
//   id: 471663,
//   last_name: 'Fisher',
//   overdue: 1229,
//   standing_order: null,
//   title: 'Mr'
// }

const addressProps = [ 'address1', 'address2', 'address3', 'address4', 'county', 'postcode' ]
const addressArr = compose(objOf('address'), props(addressProps))

const inject = (members) => {
  const getOverdue = (days) => {
    if (days > 90) return 90
    return days > 60 ? 60 : 30
  }
  const template = `Dear ${members.first_name || members.title + ' ' + members.last_name },
  We notice that your Standing Order which is normally paid on ${members.due_date}
  each year has not been paid this year and £${members.amount} has now been unpaid
  for over ${getOverdue(members.overdue)} days. We assume that this is probably an
  administrative error and would be very grateful if you could look into it.
  If, alternatively, your intention is to cancel your membership of the Friends
  we’d be grateful if you could let the Membership Secretary
  (Pam Marrs, 42 Bracklesham Road, Hayling Island PO11 9SJ) know that that is your intention.
  If you have already sorted the problem out, our apologies and please ignore this letter.
  Sincerely,
  Richard Evans,
  Treasurer FoCH`
  return template
}
