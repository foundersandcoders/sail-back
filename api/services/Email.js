/**
 * Email service
 *
 */

var mandrill    = require('mandrill-api');
mandrill_client = new mandrill.Mandrill('secret');

module.exports = {
	/**
	 * Creates and email and sends it through Mandrill.
	 * @param  {Object} - data in the form {code: 'String', email: 'String'}
	 * @return {}
	 */
	sendSubscribe: function (data, callback) {

		var email = module.exports._createEmail(data);

		switch(process.env.NODE_ENV){
			case 'testing':
				callback(null, email);
				break;
			case 'development':
				callback(null, email);
				break;
			case 'staging':
				module.exports._sendEmail(email, function (err, result) {
					callback(err, result);
				});
				break;
			case 'production':
				module.exports._sendEmail(email, function (err, result) {
					callback(err, result);
				});
				break;
			default:
				sails.log.error("No NODE_ENV was supplied, no email send.");
				// module.exports._sendEmail(email);
		};
	},
	_sendEmail: function (data, callback) {
		mandrill_client.messages.send({'message': data}, function (result) {
			/*
				[{
					"email": "recipient.email@example.com",
					"status": "sent",
					"reject_reason": "hard-bounce",
					"_id": "abc123abc123abc123abc123abc123"
				}]
			*/
			callback(null, result);
		}, function (err) {

			sails.log.error('A mandrill error occurred: ' + err.name + ' - ' + err.message);
			callback(err, null);
		});
	},
	_createEmail: function (data) {
		var message = {
			"html": module.exports._templateEngine(data),
			"subject": "Welcome to Friends of Chichester Harbour",
			"from_email": "messenger@friendsch.org",
			"from_name": "Friends of Chichester Harbour",
			"to": [{
				"email": data.email,
				// "name": "",
				"type": "to"
			}],
			// "headers": {
			// 	"Reply-To": "hello@dwyl.io"
			// },
			"important": false,
			"track_opens": true,
			"track_clicks": true,
			"tags": [
				"registration"
			]
		};

		return message;
	},
	_templateEngine: function (data) {
		var html = [
				'<p>We have received a request to create a new account for Africanity on your email.</p>',
				'<p>Please follow the link below to activate your account securely:</p>',
				module.exports._createLink(data),
				'<p>If you have received this message in error, please ignore it as someone has incorrectly<br/>',
				'entered your email. If this persists, please let us know.</p>',
				'<p>Thank you - and welcome!</p>'
			].join('');

		return html;
	},
	_createLink: function (data) {
		var link = '<a ' 
				 + 'mc:disable-tracking '
				 + 'href="'+ process.env.NODE_URL +'/activate'
				 + '?code='+ data.code +'">'
				 + process.env.NODE_URL +'/activate'
				 + '?code='+ data.code 
				 +'</a>';

		return link;
	}
};