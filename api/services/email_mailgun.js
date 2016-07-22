/*global
  sails
*/

'use strict'
var R = require('ramda')
var aSync = require('async')

var apiKey = process.env.MAILGUN
var domain = 'sandboxba3153df65354c40ae1a00b269fecdb5.mailgun.org'
var mailgun = require('mailgun-js')({ apiKey, domain });

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

    var text = module.exports._templateEngine(data, 'subscribe')
    var from = 'messenger@friendsch.org'
    var to = data.email
    var subject = 'Welcome to Friends of Chichester Harbour'

    mailgun.messages().send({ text, from, to, subject }, (error, results) =>
      error ? callback(error, null) : callback(null, 'Email sent')
    )
  },
  sendPassword: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    var text = module.exports._templateEngine(data, 'forgotPass')
    var from = 'messenger@friendsch.org'
    var to = data.email
    var subject = 'Forgot password'

    mailgun.messages().send({ text, from, to, subject }, (error, results) => {
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
      html = [
        'Welcome to Friends of Chichester Harbour.'
      ].join('')
    } else if (type === 'forgotPass') {
      html = [
        'We have received a forgot password request.',
        'This is the new password: ' + data.password
      ].join('')
    }

    return html
  },
  _createLink: function (data) {
    var link = '<a '
    'mc:disable-tracking ' +
      'href="' + process.env.NODE_URL + '/activate' +
      '?code=' + data.code + '">' +
      process.env.NODE_URL + '/activate' +
      '?code=' + data.code +
      '</a>'

    return link
  },
  submitEmail: function (data, callback) {
    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    var shapeEmailBody = recipient =>
      recipient.content.slice(1).join('\n\n')

    var grabSubjects = recipient =>
      recipient.content[0]

    var toKey = R.compose(R.map(R.objOf('to')), R.keys)
    var textKey = R.compose(R.map(R.objOf('text')), R.values, R.map(shapeEmailBody))
    var subjectKey = R.compose(R.map(R.objOf('subject')), R.values, R.map(grabSubjects))

    var emailsData = R.converge(R.zipWith(R.merge), [R.converge(R.zipWith(R.merge), [toKey, textKey]), subjectKey])(data.email)
    var emails = R.map(R.assoc('from', 'messenger@friendsch.org'), emailsData)

    var sendEmail = (email, cb) => {
      var address = email.to
      mailgun.messages().send(email, (error, results) =>
        error ? cb({error: JSON.stringify(error), address}, null) : cb(null, {results: JSON.stringify(results), address})
      )
    }

    var asyncArray = emails.map(recipient => cb =>
      sendEmail(recipient, cb))

    aSync.parallel(asyncArray, (error, results) =>
      error ? callback(error, null) : callback(null, results)
    )
  },
  getBounced: function (callback) {
    mailgun.get(`/${domain}/bounces`, {}, function(error, results) {
      error ? callback(error, null) : callback(null, results)
    })
  }
}
