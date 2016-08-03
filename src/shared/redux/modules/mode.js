/* @flow */
const { createAction, handleAction } = require('redux-actions')
const { UPDATED_MEMBER } = require('../../../admin/redux/modules/member.js')

const TOGGLE_MEMBER_MODE = 'TOGGLE_MEMBER_MODE'

import type { Action, Reducer } from 'redux'

type State = 'view' | 'edit'

const reducer: Reducer<State, Action> =
  (mode = 'view', { type, payload }) => {
    switch (type) {
      case TOGGLE_MEMBER_MODE:
        return mode === 'view' ? 'edit' : 'view'
      case UPDATED_MEMBER:
        return payload ? 'view' : 'edit'
      default:
        return mode
    }
  }

export const toggle_member_mode = createAction(TOGGLE_MEMBER_MODE)

export default reducer
