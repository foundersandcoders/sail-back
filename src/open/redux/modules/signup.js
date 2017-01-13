/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
const request = require('xhr')

const SIGN_UP = 'SIGN_UP'

const initialState = {}

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case SIGN_UP:
        console.log('sign up payload', payload)
        return state
      default:
        return state
    }
  }
const signup = user => {
  var handle_response = (err, res, body) => { //eslint-disable-line
    console.log('res headers', res.headers)
    if (res && res.statusCode === 200) {
      // window.location.pathname = res.headers.location
      // window.location = window.location.origin + '/user#/statements'
      window.location.replace('/user#/statements')
    }
    return
  }

  request({
    method: 'POST',
    uri: '/signup',
    json: user
  }, handle_response)
}

export const sign_up = createAction(SIGN_UP, signup)

export default reducer
