const xhr = require('xhr')

export default store => next => action => {
  if (action.type === 'TIMEOUT') return next(action)
  xhr.get('/admin', (err, res, body) => {
    if (res.statusCode >= 400) window.location.href = window.location.origin
  })
  return next(action)
}
