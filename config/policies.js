module.exports.policies = {
  '*': ['isAuthenticated', 'isAdmin'],

  PrivateController: {
    '*': ['isAuthenticated', 'isAdmin'],
    'showAdminHome': 'isAdmin',
    'showUserHome': 'isAuthenticated'
  },

  MembersController: {
    '*': ['isAuthenticated', 'isAdmin'],
    'accountPage': 'isAuthenticated',
    'accountInfo': 'isAuthenticated',
    'showMyEvents': 'isAuthenticated',
    'getMyEvents': 'isAuthenticated',
    'updateAccountInfo': 'isAuthenticated'
  },

  UserController: {
    '*': 'isAuthenticated'
  },

  PaymentsController: {
    '*': ['isAuthenticated', 'isAdmin'],
    'clientToken': 'isAuthenticated',
    // 'makePaypalPayment': 'isAuthenticated',
    'charge': 'isAuthenticated',
    'payingInReport': 'isAdmin',
    // 'creditCardPayment': 'isAuthenticated'
    'makePayment': 'isAuthenticated'
  },

  EventsController: {
    '*': ['isAuthenticated', 'isAdmin'],
    'showView': true,
    'getCurrentEvents': true,
    'singleEventInfo': true,
    'showViewEvent': true
  },

  BookingRecordsController: {
    '*': ['isAuthenticated', 'isAdmin'],
    'book': 'isAuthenticated',
    'testTransaction': true
  },

  PublicController: {
    '*': true
  },

  SignUpProcessController: {
    '*': true
  }
}
