/**
 * Email service
 *
 */

var mandrill    = require('mandrill-api');
mandrill_client = new mandrill.Mandrill(process.env.MANDRILL);

module.exports = {
	/**
	 * Creates and email and sends it through Mandrill.
	 * @param  {Object} - data in the form {code: 'String', email: 'String'}
	 * @return {}
	 */
	sendSubscribe: function (data, callback) {

		var email = module.exports._createEmail(data, 'subscribe');

		module.exports._sendEmail(email, function (err, result) {
			callback(err, result);
		});
	},
	sendPassword: function (data, callback) {

		var email = module.exports._createEmail(data, 'forgotPass');

		module.exports._sendEmail(email, function (err, result) {
			callback(err, result);
		});
	},
	_sendEmail: function (data, callback) {

		if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
			
			mandrill_client.messages.send({'message': data}, function (result) {
				/*
					[{
						"email": "recipient.email@example.com",
						"status": "sent",
						"reject_reason": "hard-bounce",
						"_id": "abc123abc123abc123abc123abc123"
					}]
				*/

				sails.log.info("Email: ", result);

				callback(undefined, result);
			}, function (err) {

				sails.log.error('A mandrill error occurred: ' + err.name + ' - ' + err.message);
				callback(err, undefined);
			});
		} else if (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'development') {

			callback(undefined, data);
		} else {

			callback("No NODE_ENV was supplied, no email send.", undefined);			
		}
	},
	/**
	 *	Creates an email given data and type of email
	 *
	 */
	_createEmail: function (data, type) {
		var message = {
			"html": module.exports._templateEngine(data, type),
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
	_templateEngine: function (data, type) {

		var html

		if(type === 'subscribe') {
			html = [
				'<p>We have received a request to create a new account to become a member on your email.</p>',
				'<p>Please follow the link below to activate your account securely:</p>',
				module.exports._createLink(data),
				'<p>If you have received this message in error, please ignore it as someone has incorrectly<br/>',
				'entered your email. If this persists, please let us know.</p>',
				'<p>Thank you - and welcome!</p>'
			].join('');
		} else if (type === 'forgotPass') {
			html = [
				'<p>We have received a forgot password request.</p>',
				'<p>This is the new password: ' + data.password + '</p>'
			].join('');
		}

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