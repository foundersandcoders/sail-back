/* @flow */
import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { get_body } from 'app/http'
const { set, assoc, lensPath, map, isEmpty } = require('ramda')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
export const GIFT_AID_TAB =
  'GIFT_AID_TAB'
const LIST_BY_GIFT_AID_STATUS =
  'LIST_BY_GIFT_AID_STATUS'
export const DELIVERERS_TAB =
  'DELIVERERS_TAB'
const LIST_BY_DELIVERER =
  'LIST_BY_DELIVERER'

const initialState = { members_by_gift_aid_status: []
                     , members_by_deliverer: []
                     , deliverers: []
                     , no_matches: false
                     }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    const update = state => lens => value => (set(lens, value, state): State)
    const active_tab = assoc('active_tab', type)
    const members_by_gift_aid_status = lensPath([ 'members_by_gift_aid_status' ])
    const members_by_deliverer = lensPath([ 'members_by_deliverer' ])
    const deliverers = lensPath([ 'deliverers' ])
    const no_matches = lensPath([ 'no_matches' ])
    switch (type) {
    case GIFT_AID_TAB:
      return active_tab(initialState)
    case DELIVERERS_TAB:
      return active_tab(update(initialState)(deliverers)(extract_deliverers(payload.results)))
    case LIST_BY_DELIVERER:
      return isEmpty(payload) ? update(state)(no_matches)(true) : update(state)(members_by_deliverer)(payload)
    case LIST_BY_GIFT_AID_STATUS:
      return isEmpty(payload) ? update(state)(no_matches)(true) : update(state)(members_by_gift_aid_status)(payload)
    case PATH_UPDATE:
      return initialState
    default:
      return state
    }
  }

const extract_deliverers = map(v => v.deliverer === null ? 'No Deliverer' : v.deliverer)

export const gift_aid_tab =
  createAction(GIFT_AID_TAB)

export const list_by_gift_aid_status =
  createAction(LIST_BY_GIFT_AID_STATUS, status => get_body(`/api/list-gift-aid/${status}`))

export const deliverers_tab =
  createAction(DELIVERERS_TAB, () => get_body('/api/list-deliverers'))

export const list_by_deliverer =
  createAction(LIST_BY_DELIVERER, deliverer => get_body(`/api/list-by-deliverer/${deliverer}`))

export default reducer
