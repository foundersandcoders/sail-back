var { handleAction } = require('redux-actions')

const fetch_handler = (member = {}, action) => {
  switch (action.type) {
    case 'member_fetched':
      return (
        { ...action.payload
        }
      )
    default:
      return member
  }
}

module.exports = fetch_handler
