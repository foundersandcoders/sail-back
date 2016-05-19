/* @flow */
const { createAction } = require('redux-actions')

export const PATH_UPDATE = 'PATH_UPDATE'

import type { Action } from 'redux'

const reducer
  : (s: {}, a: Action) => {}
  = (state = {}, { type, payload }) => {
  switch (type) {
    case PATH_UPDATE:
      return payload
    default:
      return state
  }
}

export const pathDidUpdate = createAction(PATH_UPDATE)

export default reducer

