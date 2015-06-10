module.exports.routes = {

		'GET /testing': {
			view: 'pages/testing'
		},


	// -------------------------------------------------------------------------
	// SignIn process
	// -------------------------------------------------------------------------
		'GET /': {
			view: 'pages/home'
		},
		'GET /signin': {
			view: 'pages/signin'
		},
		'POST /signin': {
			controller: 'Public',
			action: 'ServiceSignIn'
		},
		'POST /forgotPassword': {
			controller: 'Public',
			action: 'forgotPassword'
		},
	// -------------------------------------------------------------------------
	// SignUp process
	// -------------------------------------------------------------------------
		'GET /signup': {
			controller: 'SignUpProcess',
			action: 'showForm'
		},
		'POST /signup': {
			controller: 'SignUpProcess',
			action: 'create'
		},
		'GET /activate' : {
			controller: 'SignUpProcess',
			action: 'activate'
		},
	// -------------------------------------------------------------------------
	// Private
	// -------------------------------------------------------------------------
		'GET /admin': {
			controller: 'Private',
			action: 'showAdmin'
		},
		'GET /addmember': {
			controller: 'Private',
			action: 'showMemberForm'
		},
		'POST /addmember': {
			controller: 'Private',
			action: 'addmember'
		},
		'GET /members/:id': {
			controller: 'Private',
			action: 'showMember'
		},
		'GET /maintenance': {
			controller: 'Private',
			action: 'showMaintenance'
		},
		'POST /upload': {
			controller: 'Private',
			action: 'upload'
    	},
    	'POST /payment': {
    		controller: 'Payments',
    		action: 'makeStripePayment'
    	},
        'GET /client_token': {
            controller: 'Payments',
            action: 'clientToken'
        },
        'POST /paypal_payment': {
            controller: 'Payments',
            action: 'makePaypalPayment'
        }
}
