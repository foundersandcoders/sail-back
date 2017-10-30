/* @flow */
import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { get_body } from 'app/http'
const { set, assoc, lensPath, map, isEmpty, compose } = require('ramda')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
export const CHANGE_TAB =
  'CHANGE_TAB'
const LIST_BY_GIFT_AID_STATUS =
  'LIST_BY_GIFT_AID_STATUS'
export const DELIVERERS_TAB =
  'DELIVERERS_TAB'
const LIST_BY_DELIVERER =
  'LIST_BY_DELIVERER'
const LIST_120_OVERDUE =
  'LIST_120_OVERDUE'
const LIST_BY_EMAIL_BOUNCED =
  'LIST_BY_EMAIL_BOUNCED'
const GET_NUMBERS_REPORT =
  'GET_NUMBERS_REPORT'
const LIST_BY_MEMBERSHIP =
  'LIST_BY_MEMBERSHIP'
const CHANGE_FILTER =
  'CHANGE_FILTER'

const initialState = { members_by_gift_aid_status: []
                     , members_by_deliverer: []
                     , members_120_overdue: []
                     , members_by_email_bounced: []
                     , members_by_membership: []
                     , filtered_members_by_membership: []
                     , deliverers: []
                     , no_matches: false
                     , show_only: 'all' // ['all', 'activated', 'deactivated']
                     }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    const update = lens => value => state => (set(lens, value, state): State)
    const active_tab = assoc('active_tab', type)
    const members_by_gift_aid_status = lensPath([ 'members_by_gift_aid_status' ])
    const members_by_deliverer = lensPath([ 'members_by_deliverer' ])
    const members_120_overdue = lensPath([ 'members_120_overdue' ])
    const members_by_email_bounced = lensPath([ 'members_by_email_bounced' ])
    const members_by_membership = lensPath([ 'members_by_membership' ])
    const filtered_members_by_membership = lensPath([ 'filtered_members_by_membership' ])
    const deliverers = lensPath([ 'deliverers' ])
    const no_matches = lensPath([ 'no_matches' ])
    const numbers_report = lensPath([ 'numbers_report' ])
    switch (type) {
    case CHANGE_TAB:
      return active_tab(initialState)
    case CHANGE_FILTER:
      const filterFunc = member => member.activation_status === payload
      const filtered_members =
        payload === 'all'
          ? state.members_by_membership
          : state.members_by_membership.filter(filterFunc)

      return {...state, filtered_members_by_membership: filtered_members, show_only: payload}
    case DELIVERERS_TAB:
      return active_tab(update(deliverers)(extract_deliverers(payload.results))(initialState))
    case LIST_BY_DELIVERER:
      return isEmpty(payload)
        ? compose(update(no_matches)(true), update(members_by_deliverer)([]))(state)
        : compose(update(no_matches)(false), update(members_by_deliverer)(payload))(state)
    case LIST_BY_GIFT_AID_STATUS:
      return isEmpty(payload)
        ? compose(update(no_matches)(true), update(members_by_gift_aid_status)([]))(state)
        : compose(update(no_matches)(false), update(members_by_gift_aid_status)(payload))(state)
    case LIST_BY_MEMBERSHIP:
      return isEmpty(payload)
        ? compose(update(no_matches)(true), update(members_by_membership)([]))(state)
        : compose(
            update(no_matches)(false),
            update(members_by_membership)(payload),
            update(filtered_members_by_membership)(payload)
          )(state)
    case LIST_120_OVERDUE:
      return isEmpty(payload)
        ? compose(update(no_matches)(true), update(members_120_overdue)([]))(state)
        : compose(update(no_matches)(false), update(members_120_overdue)(payload))(state)
    case LIST_BY_EMAIL_BOUNCED:
      return isEmpty(payload)
        ? compose(update(no_matches)(true), update(members_by_email_bounced)([]))(state)
        : compose(update(no_matches)(false), update(members_by_email_bounced)(payload))(state)
    case GET_NUMBERS_REPORT:
      return update(numbers_report)(payload)(state)
    case PATH_UPDATE:
      return initialState
    default:
      return state
    }
  }

const extract_deliverers = map(v => v.deliverer === null ? 'No Deliverer' : v.deliverer)

export const change_tab =
  createAction(CHANGE_TAB)

export const list_by_gift_aid_status =
  createAction(LIST_BY_GIFT_AID_STATUS, status => get_body(`/api/list-gift-aid/${status}`))

export const deliverers_tab =
  createAction(DELIVERERS_TAB, () => get_body('/api/list-deliverers'))

export const list_by_deliverer =
  createAction(LIST_BY_DELIVERER, deliverer => get_body(`/api/list-by-deliverer/${deliverer}`))

export const list_120_overdue =
  createAction(LIST_120_OVERDUE, () => get_body('/api/list-120-overdue'))

export const list_by_email_bounced =
  createAction(LIST_BY_EMAIL_BOUNCED, status => get_body(`/api/list-email-bounced/${status}`))

export const list_by_membership =
  createAction(LIST_BY_MEMBERSHIP, membership => get_body(`/api/list-by-membership/${membership}`))

export const get_numbers_report =
  createAction(GET_NUMBERS_REPORT, () => get_body('api/get-numbers-report'))

export const change_filter =
  createAction(CHANGE_FILTER, (filter) => filter)

export default reducer
