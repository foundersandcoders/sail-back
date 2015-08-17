/*global
  Members, MembershipTypes
*/

var is = require('torf')
var uuid = require('uuid')
var Mailgun = require('../services/Email_mailgun')
var Validation = require('../../assets/js/vdom/services/validate.js')

module.exports = {
  showForm: function (req, res) {
    if (req.session && req.session.member) {
      res.redirect('/')
    } else {
      res.view('pages/signup')
    }
  },
  /**
   *	Create member on signup. In order to create a member:
   *
   *	title,
   *	initials,
   *	last_name,
   *	address (5 lines)
   *	postcode
   *	membership_type
   *	gift_aid_signed
   *	newsPost/newsOnline
   *	due_date
   *	registered/unregistered
   */
  create: function (req, res) {
    if (req.session.user) {
      return res.redirect('/')
    }

    var newMember = req.body
    newMember.registered = 'registered'
    newMember.id = uuid.v4()
    newMember.date_joined = new Date()

    Validation('member', newMember, function (error, value) {
      if (error) {
        return res.badRequest({error: error})
      }

      Members
        .findOne({primary_email: newMember.primary_email})
        .then(function (memberFind) {
          if (is.ok(memberFind)) {
            throw new Error('Email has already an account. Sign in.')
          } else {
            return MembershipTypes.findOne(newMember.membership_type)
          }
        })
        .then(function (membership) {
          var chargeSubscription = {
            category: 'subscription',
            description: membership.description,
            amount: membership.amount,
            notes: 'Sign up subscription',
            date: new Date()
          }

          newMember.payments = chargeSubscription

          return Members.create(newMember)
        })
        .then(function (member) {
          // sails.log.info('Member created: ', member)

          // set up session 
          req.session.user = member

          Mailgun.sendSubscribe({email: member['primary_email']}, function (error, result) {
            if (is.ok(error)) {
              // handle error
              res.serverError({error: 'Was not able to send email!'})
              return
            } else {
              res.redirect('/')
            }
          })
        })
        .catch(function (error) {
          res.badRequest({error: error.message})
        })
    })
  },
  activate: function (req, res) {}
}
