module.exports.policies = {

	'*': ['isAuthenticated', 'isAdmin'],

    PrivateController: {
        '*': ['isAuthenticated', 'isAdmin']
    },

    PublicController: {
        '*': true
    },

    SignUpProcessController: {
        '*': true
    }
};