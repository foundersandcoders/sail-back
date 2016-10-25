/* @flow */
import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { get_body } from 'app/http'
import { prop } from 'ramda'

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const LIST_GIFT_AID =
  'LIST_GIFT_AID'

const initialState = false
type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
    case LIST_GIFT_AID:
      console.log('list gift aid payload', payload)
      return initialState
    case PATH_UPDATE:
      return initialState
    default:
      return state
    }
  }

export const list_gift_aid =
  createAction(LIST_GIFT_AID, () => get_body('/api/list-gift-aid'))

export default reducer
