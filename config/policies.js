module.exports.policies = {

    PrivateController: {
        '*': 'sessionAuth'
    },

    PublicController: {
        '*': true
    },

    SignUpProcessController: {
        '*': true
    }
};