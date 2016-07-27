/* @flow */
const xhr = require('xhr')
const throttle = require('lodash.throttle')

import type { MiddlewareAPI, Dispatch, Action } from 'redux'

export default (_: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  relogin_timedout()
  return next(action)
}

const check_user = cb => throttle(() => xhr.get('/user', cb), 1000)

const relogin_timedout = check_user((err, res, body) => {
    if (res.statusCode >= 400) window.location.href = window.location.origin
})
