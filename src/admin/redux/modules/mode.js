const { createAction, handleAction } = require('redux-actions')
const { UPDATED_MEMBER } = require('./member.js')

const TOGGLE_MEMBER_MODE = 'TOGGLE_MEMBER_MODE'

const reducer = (mode = 'view', { type }) => {
  switch (type) {
    case TOGGLE_MEMBER_MODE:
      return mode === 'view' ? 'edit' : 'view'
    case UPDATED_MEMBER:
      return 'view'
    default:
      return mode
  }
}

const toggle_member_mode = createAction(TOGGLE_MEMBER_MODE)

module.exports = reducer
module.exports.toggle_member_mode = toggle_member_mode
