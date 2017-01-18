/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
const request = require('xhr')

const SIGN_UP = 'SIGN_UP'
const DUPLICATE_EMAIL = 'DUPLICATE_EMAIL'
import { PREVIOUS_PAGE } from './page.js'


const initialState = { duplicate_email: false }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type }) => {
    switch (type) {
      case SIGN_UP:
        return state
      case DUPLICATE_EMAIL:
        return { ...state, duplicate_email: true }
      case PREVIOUS_PAGE:
        return { ...state, duplicate_email: false }
      default:
        return state
    }
  }
const signup = (user, dispatch) => {
  var handle_response = (err, res, body) => {
    if (res && res.statusCode === 200) {
      // window.location.pathname = res.headers.location
      // window.location = window.location.origin + '/user#/statements'
      return window.location.replace('/user#/welcome-screen')
    }
    return body.error.match(/email/) && dispatch({ type: DUPLICATE_EMAIL })
  }

  return request({
    method: 'POST',
    uri: '/signup',
    json: user
  }, handle_response)
}

export const sign_up = createAction(SIGN_UP, signup)

export default reducer
