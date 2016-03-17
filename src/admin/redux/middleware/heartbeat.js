const xhr = require('xhr')
const throttle = require('lodash.throttle')

export default store => next => action => {
  relogin_timedout()
  return next(action)
}

const check_admin = cb => throttle(() => xhr.get('/admin', cb), 1000)

const relogin_timedout = check_admin((err, res, body) => {
    if (res.statusCode >= 400) window.location.href = window.location.origin
})
