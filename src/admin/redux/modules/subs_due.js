/* @flow */
const { createAction } = require('redux-actions')
const { post_body } = require('app/http')
const { format_due_date } = require('app/format_date')
const { formatPounds } = require('app/monies')
const { map } = require('ramda')
const { full_name, can_email } = require('app/member')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'

const UPDATE_SUBS_DUE =
  'UPDATE_SUBS_DUE'

const initialState = { members: null }

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_SUBS_DUE:
        return { members: shape_members(payload.results) }
      default:
        return state
    }
  }

export default reducer

export const update_subs_due =
  createAction(UPDATE_SUBS_DUE, body => post_body(body, 'api/subscription-due'))


// from [{id: 1, first_name: 'Wayne', last_name: 'Rooney', ...}, ...]
// to [[1, 'Wayne Rooney', ...], ...]
const shape_members =
  map(member =>
    [ member.id
    , full_name(member)
    , formatPounds(member.amount)
    , format_due_date(member.due_date)
    , can_email(member) ? 'Email' : 'Letter'
    , formatPounds(member.balance_due * 100)
  ])
