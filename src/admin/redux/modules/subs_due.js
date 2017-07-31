/* @flow */
const { createAction } = require('redux-actions')
const { post_body } = require('app/http')
const { format_due_date } = require('app/format_date')
const { formatPounds } = require('app/monies')
const { map } = require('ramda')


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
// to [[1, 'Wayne Rooney'], ...]
const shape_members =
  map(member =>
    [ member.id
    , name_from_member(member)
    , formatPounds(member.amount)
    , format_due_date(member.due_date)
    , member.news_type
  ])

const name_from_member =
  member =>
    `${member.first_name || member.title || ''} ${member.last_name || member.primary_email}`
