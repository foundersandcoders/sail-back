module.exports.policies = {

    '*': ['isAuthenticated', 'isAdmin'],

    PrivateController: {
        '*': ['isAuthenticated', 'isAdmin']
    },

    MembersController: {
        '*': ['isAuthenticated', 'isAdmin'],
        'accountPage': 'isAuthenticated',
        'accountInfo': 'isAuthenticated'
    },

    PaymentsController: {
        '*': ['isAuthenticated', 'isAdmin'],
        'clientToken': 'isAuthenticated',
        'makePaypalPayment': 'isAuthenticated',
        'charge': 'isAuthenticated'
    },

    EventsController: {
        '*': ['isAuthenticated', 'isAdmin'],
        'showView': true,
        'getCurrentEvents': true
    },

    BookingRecordsController: {
        '*': ['isAuthenticated', 'isAdmin'],
        'book': 'isAuthenticated'
    },

    PublicController: {
        '*': true
    },

    SignUpProcessController: {
        '*': true
    }
};