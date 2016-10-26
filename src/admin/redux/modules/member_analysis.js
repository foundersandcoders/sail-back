/* @flow */
import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { get_body } from 'app/http'
import { set, assoc, lensPath } from 'ramda'

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
export const LIST_GIFT_AID =
  'LIST_GIFT_AID'
export const LIST_BY_DELIVERER =
  'LIST_BY_DELIVERER'

const initialState = { gift_aid_members: []
                     , members_by_deliverer: []
                     }

type State = typeof initialState

// TODO: make change tab actions

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    const update = lens => value => (set(lens, value, state))
    const active_tab = assoc('active_tab', type)
    const gift_aid_members = lensPath([ 'gift_aid_members' ])
    const members_by_deliverer = lensPath([ 'members_by_deliverer' ])
    switch (type) {
    case LIST_GIFT_AID:
      return active_tab(update(gift_aid_members)(payload))
    case LIST_BY_DELIVERER:
      console.log(payload)
      return active_tab(update(members_by_deliverer)(payload))
    case PATH_UPDATE:
      return initialState
    default:
      return state
    }
  }

export const list_gift_aid =
  createAction(LIST_GIFT_AID, () => get_body('/api/list-gift-aid'))

export const list_by_deliverer =
  createAction(LIST_BY_DELIVERER, deliverer => get_body(`/api/list-by-deliverer/${deliverer}`))

export default reducer
