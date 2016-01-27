const { createAction } = require('redux-actions')

const PATH_UPDATE = 'PATH_UPDATE'

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PATH_UPDATE:
      return payload
    default:
      return state
  }
}

const pathDidUpdate = createAction(PATH_UPDATE)

module.exports = reducer

Object.assign
  ( module.exports
  , { PATH_UPDATE
    , pathDidUpdate
    }
  )
