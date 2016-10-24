/*global
  sails
*/

'use strict'
var R = require('ramda')
var aSync = require('async')

var apiKey = process.env.MAILGUN
var domain = 'sandboxba3153df65354c40ae1a00b269fecdb5.mailgun.org'
var mailgun = require('mailgun-js')({ apiKey, domain })

module.exports = {
  /**
   * Creates and email and sends it through Mailgun.
   * @param  {Object} - data in the form {code: 'String', email: 'String'}
   * @return {}
   */
  sendSubscribe: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    mailgun.messages().send(module.exports._createEmail(data, 'Welcome to Friends of Chichester Harbour', 'subscribe'),
      error => error ? callback(error, null) : callback(null, 'Email sent')
    )
  },
  sendPassword: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    mailgun.messages().send(module.exports._createEmail(data, 'Forgot password', 'forgotPass'),
      (error) => {
        if (error) {
          sails.log.error('MAILGUN ERROR: ', error)
          callback(error, undefined)
        } else {
          sails.log.info('EMAIL SENT TO: ', data.email)
          callback(undefined, 'Email sent')
      }
    })
  },
  _templateEngine: function (data, type) {
    var html

    if (type === 'subscribe') {
      html = [ 'We are delighted that you have decided to become a member of the Friends '
             + 'of Chichester Harbour and would like to extend a warm welcome. You’ll find '
             + 'lots more information about us on our website www.friendsch.org. The Friends '
             + 'are run entirely by volunteers and we will always try to answer any query '
             + 'directed to one of the contacts listed below. Please do not respond to '
             + 'messenger@friendsch.org which is an automated system.'
             , 'chairman@friendsch.org'
             , 'editor@friendsch.org'
             , 'events@friendsch.org'
             , 'membership@friendsch.org'
             , 'secretary@friendsch.org'
             , 'treasurer@friendsch.org'
             , 'I hope that we’ll get a chance to meet in person at our AGM or one of '
             + 'our social events (or maybe on a Work Party if you are feeling energetic?)'
             , 'Mark Stanton'
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

    aSync.parallel(emails.map(sendEmail), (error, results) =>
      error ? callback(error, null) : callback(null, results)
    )
  },
  getBounced: function (callback) {
    mailgun.get(`/${domain}/bounces`, {}, function (error, results) {
      return error ? callback(error, null) : callback(null, results)
    })
  }
}
