const Task = require('data.task')

const { FETCHED_MEMBER } = require('./member.js')

const reducer = (payments = [], { type, payload }) => {
  switch (type) {
    case FETCHED_MEMBER:
      return payload.other.payments
    default:
      return payments
  }
}

module.exports = reducer

