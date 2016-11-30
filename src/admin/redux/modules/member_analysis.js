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

const initialState = { members_by_gift_aid_status: []
                     , members_by_deliverer: []
                     , members_120_overdue: []
                     , deliverers: []
                     , no_matches: false
                     }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    const update = lens => value => state => (set(lens, value, state): State)
    const active_tab = assoc('active_tab', type)
    const members_by_gift_aid_status = lensPath([ 'members_by_gift_aid_status' ])
    const members_by_deliverer = lensPath([ 'members_by_deliverer' ])
    const members_120_overdue = lensPath([ 'members_120_overdue' ])
    const deliverers = lensPath([ 'deliverers' ])
    const no_matches = lensPath([ 'no_matches' ])
    switch (type) {
    case CHANGE_TAB:
      return active_tab(initialState)
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
    case LIST_120_OVERDUE:
      return isEmpty(payload)
        ? compose(update(no_matches)(true), update(members_120_overdue)([]))(state)
        : compose(update(no_matches)(false), update(members_120_overdue)(payload))(state)
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

export default reducer
