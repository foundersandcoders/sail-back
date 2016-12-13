/* global Members */

'use strict'

var is = require('torf')
var passport = require('passport')
var ForgotPass = require('../services/ForgotPass.js')
var Mailgun = require('../services/email_mailgun')

module.exports = {

  showHome: function (req, res) {
    res.view('pages/open', {user: req.session.user})
  },

  ServiceSignIn: function (req, res) {
    passport.authenticate('local', function (err, member) {
      if ((err) || (!member) || member.activation_status === 'deactivated') {
        res.status(401).end()
      } else {
        req.session.user = member
        req.session.authenticated = true
        req.member = member
        var redirect_to = req.session.user.privileges === 'admin' ? '/admin' : '/user'
        res.location(redirect_to).end()
      }
    })(req, res)
  },

  adminSignout: function (req, res) {
    req.session.destroy(function () {
      res.redirect('/')
    })
  },

  memberSignout: function (req, res) {
    req.session.destroy(function () {
      res.redirect('http://friendsch.org/')
    })
  },

  forgotPassword: function (req, res) {
    // random string that will be
    // used to generate a password
    var randomString = ''

    var query = [
      {primary_email: req.body.email},
      {secondary_email: req.body.email}
    ]

    Members
      .findOne(query)
      .then(function (member) {
        if (!is.ok(member)) {
          throw new Error('Email not recognised.')
        } else {
          randomString = ForgotPass.randomString()
          // the updating object needs to include the id value
          // this values needs to be supplied to the beforeUpdate lifecycle method in Members model
          return Members.update({ id: member.id }, { new_password: randomString, id: member.id, registered: 'registered' })
        }
      })
      .then(function () {
        Mailgun.sendPassword({
          password: randomString,
          email: req.body.email
        }, function (error) {
          if (is.ok(error)) {
            return res.serverError({emailSent: false, error: error})
          }

          if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
            return res.send({emailSent: true, error: undefined, password: randomString})
          } else {
            return res.send({emailSent: true, error: undefined})
          }
        })
      })
      .catch(function () {
        return res.badRequest({emailSent: false, error: 'Email not recognised'})
      })
  }
}
