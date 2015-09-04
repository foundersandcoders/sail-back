/*global
  Members
*/

'use strict'

var is = require('torf')
var passport = require('passport')
var ForgotPass = require('../services/ForgotPass.js')
var Mailgun = require('../services/Email_mailgun')

module.exports = {

  showHome: function (req, res) {
    res.view('pages/home', {user: req.session.user})
  },

  showSignIn: function (req, res) {
    if (req.session.user) {
      res.redirect('/')
    } else {
      res.view('pages/signin', {user: req.session.user})
    }
  },

  ServiceSignIn: function (req, res) {
    passport.authenticate('local', function (err, member, info) {
      if ((err) || (!member)) {
        res.status(401).end()
      } else {
        req.session.user = member
        req.session.authenticated = true
        req.member = member
        res.location('/').end()
      }
    })(req, res)
  },

  ServiceSignOut: function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  },

  forgotPassword: function (req, res) {
    // random string that will be
    // used to generate a password
    var randomString = ''

    var query = [
      {primary_email: req.body['email']},
      {secondary_email: req.body['email']}
    ]

    Members
      .findOne(query)
      .then(function (member) {
        if (!is.ok(member)) {
          throw new Error('Email not recognised.')
        } else {
          randomString = ForgotPass.randomString()
          var hashPassword = ForgotPass.hash(randomString)
          return Members.update({id: member.id}, {password: hashPassword})
        }
      })
      .then(function (memberUpdated) {
        Mailgun.sendPassword({
          password: randomString,
          email: req.body['email']
        }, function (error, result) {
          if (is.ok(error)) {
            res.serverError({emailSent: false, error: error})
          }

          if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
            res.send({emailSent: true, error: undefined, password: randomString})
          } else {
            res.send({emailSent: true, error: undefined})
          }
        })
      })
      .catch(function (error) {
        res.badRequest({emailSent: false, error: 'Email not recognised'})
      })
  }
}
