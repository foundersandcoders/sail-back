const UPDATE_FIELD = 'UPDATE_FIELD'
const { createAction } = require('redux-actions')

const initial_state =
  { date: ''
  , reference: ''
  , type: ''
  }

function payment_defaults (state = initial_state, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return action.payload.field.match(/^date|reference|type$/)
        ? { ...state, [action.payload.field]: action.payload.value }
        : state
    default:
      return state
  }
}

exports = module.exports = payment_defaults

exports.update_field = createAction(UPDATE_FIELD)

module.exports = payment_defaults
