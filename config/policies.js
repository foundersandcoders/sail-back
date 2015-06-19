module.exports.policies = {

    '*': ['isAuthenticated', 'isAdmin'],

    PrivateController: {
        '*': ['isAuthenticated', 'isAdmin']
    },

    MembersController: {
        '*': ['isAuthenticated', 'isAdmin'],
        'accountPage': 'isAuthenticated',
        'accountInfo': 'isAuthenticated',
    },

    PublicController: {
        '*': true
    },

    SignUpProcessController: {
        '*': true
    }
};