'use strict'
var R = require('ramda')
var aSync = require('async')

// Set the folowing to randomString so app doesn't crash in environments where
// mailgun api key is not provided, for example testing and travis.
// if the environment is not production, and the developer is not connected to the mock database, we don't want to send emails
// otherwise we want to send emails if the mailgun key is provided
var apiKey
if (process.env.NODE_ENV === 'heroku') {
  apiKey = process.env.MAILGUN
} else if (sails.config.connections.localMySql.database !== 'foch_testing') {
  apiKey = 'randomString'
} else {
  apiKey = process.env.MAILGUN || 'randomString'
}

var domain = 'friendsch.org'
var mailgun = require('mailgun-js')({ apiKey, domain })

module.exports = {

  sendSubscribe: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    return mailgun.messages().send(module.exports._createEmail(data, 'Welcome to Friends of Chichester Harbour', 'subscribe'),
      error => error ? callback(error, null) : callback(null, 'Email sent')
    )
  },

  sendEmail: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    return mailgun.messages().send(data, function (error) {
      if (error) {
        console.error(error)
        return callback(error, null)
      }
      return callback(null, 'Email sent')
    })
  },

  sendPassword: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    return mailgun.messages().send(module.exports._createEmail(data, 'Forgot password', 'forgotPass'),
      (error) => {
        if (error) {
          console.error('MAILGUN ERROR: ', error)
          return callback(error, undefined)
        } else {
          console.log('EMAIL SENT TO: ', data.email)
          return callback(undefined, 'Email sent')
      }
    })
  },
  _templateEngine: function (data, type) {
    var html

    if (type === 'subscribe') {
      html = [ 'We are delighted that you have decided to become a member of the '
               + 'Friends of Chichester Harbour and would like to extend a warm welcome. '
               + 'Your Membership Number is ' + data.id + '. If you are paying by bank transfer, '
               + 'standing order or cheque, booking an Event or have a query, please help us '
               + 'by quoting your Membership Number as a reference You’ll find lots more '
               + 'information about us on our website www.friendsch.org. The Friends are run '
               + 'entirely by volunteers and we will always try to answer any query directed '
               + 'to one of the contacts listed below. Please do not respond to messenger@friendsch.org '
               + 'which is an automated system.'
             , 'chairman@friendsch.org'
             , 'editor@friendsch.org'
             , 'events@friendsch.org'
             , 'membership@friendsch.org'
             , 'secretary@friendsch.org'
             , 'treasurer@friendsch.org'
             , 'I hope that we’ll get a chance to meet in person at our AGM or one of '
             + 'our social events (or maybe on a work party if you are feeling energetic?)'
             , 'Oliver Chipperfield'
             , 'Chair'
             , 'Friends of Chichester Harbour'
           ].join('\n\n')
    } else if (type === 'forgotPass') {
      html = [ 'From Friends of Chichester Harbour'
             , 'We have received a request saying that you have forgotten your password. '
             + 'Your new password is: ' + data.password + '. Once you have signed in using it you can '
             + 'change it to a more memorable one if you wish by clicking Change Password. '
             , 'Please do not reply to messenger@friendsch.org which is an automated address – '
             + 'if you have any query please contact membership@friendsch.org.'
             ].join('\n\n')
    }

    return html
  },
  _createEmail: function (data, subject, type) {
    return {
      text: module.exports._templateEngine(data, type),
      from: 'messenger@friendsch.org',
      to: data.email,
      subject
    }
  },
  submitEmail: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    var shapeEmailBody = recipient =>
      recipient.content.slice(1).join('\n\n')

    var grabSubjects = recipient =>
      recipient.content[0]

    var email_values = (v, k) =>
      [ k, shapeEmailBody(v), grabSubjects(v), 'messenger@friendsch.org' ]

    var emails = R.compose(
      R.values,
      R.mapObjIndexed(R.compose(R.zipObj([ 'to', 'text', 'subject', 'from' ]), email_values))
    )(data.email)

    // If there is an error the following callback (cb) is meant to be called with the error
    // as the first argument. However this makes the whole async.parallel process so no
    // emails are sent. Therefore cb will always be called as if there were no errors, but
    // when there is an error the object passed to cb will have the key 'error' rather than
    // 'result'.

    var sendEmail = email => cb => {
      var address = email.to
      mailgun.messages().send(email, (error, results) =>
        error ? cb(null, { address, error: error.message }) : cb(null, { results: JSON.stringify(results), address })
      )
    }

    return aSync.parallel(emails.map(sendEmail), (error, results) =>
      error ? callback(error, null) : callback(null, results)
    )
  },
  getBounced: function (callback) {
    return mailgun.get(`/${domain}/bounces`, {}, function (error, results) {
      return error ? callback(error, null) : callback(null, results)
    })
  }
}
