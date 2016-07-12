/*global
  sails
*/

'use strict'
var R = require('ramda')
var aSync = require('async')

var Mailgun = require('mailgun').Mailgun
var mg = new Mailgun(process.env.MAILGUN)

module.exports = {
  /**
   * Creates and email and sends it through Mailgun.
   * @param  {Object} - data in the form {code: 'String', email: 'String'}
   * @return {}
   */
  sendSubscribe: function (data, callback) {
    var text = module.exports._templateEngine(data, 'subscribe')

    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    mg.sendText('messenger@friendsch.org', [data.email], 'Welcome to Friends of Chichester Harbour', text, function (error) {
      if (error) {
        callback(error, undefined)
      } else {
        callback(undefined, 'Email sent')
      }
    })
  },
  sendPassword: function (data, callback) {
    var text = module.exports._templateEngine(data, 'forgotPass')

    if (process.env.NODE_ENV === 'testing') {
      return callback(undefined, 'Email sent')
    }

    mg.sendText('messenger@friendsch.org', [data.email], 'Forgot password', text, function (error) {
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

    var addresses = R.map(x => ({address:x}), R.keysIn(data.email))

    var emailArray = R.zipWith(R.merge)(addresses)(R.values(data.email))

    var sendEmail = (recipient, cb) => {
      var { address, content } = recipient
      var emailBody = content.slice(1).join('\n\n')
      var subject = content[0]
      mg.sendText('messenger@friendsch.org', address, subject, emailBody, error =>
        error ? cb(error, null) : cb(null, address)
      )
    }

    var asyncArray = emailArray.map(recipient => cb =>
      sendEmail(recipient, cb))

    aSync.parallel(asyncArray, (error, results) =>
      error ? callback(error, null) : callback(null, results)
    )
  }
}
