/*global
  Members, MembershipTypes
*/

var is = require('torf')
// var Mailgun = require('../services/email_mailgun')
var Validation = require('../services/validate.js')

module.exports = {
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
    // if (req.session.user) {
    //   return res.redirect('/')
    // }

    var newMember = req.body
    newMember.registered = 'registered'
    newMember.date_joined = new Date()

    Validation('member', newMember, function (error, value) { //eslint-disable-line
      if (error) {
        return res.badRequest({error: error})
      }

// TODO: take account membership type into account when adding chargeSubscription

      Members
        .findOne({primary_email: newMember.primary_email})
        .then(function (memberFind) {
          if (is.ok(memberFind)) {
            throw new Error('The email address provided already has an account.')
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
          res.location('/user').end()

          // Mailgun.sendSubscribe({email: member.primary_email}, function (error, result) { // eslint-disable-line
          //   if (is.ok(error)) {
          //     // handle error
          //     res.serverError({error: 'Was not able to send email!'})
          //     return
          //   } else {
          //     res.location('/user').end()
          //     res.redirect('/user')
          //   }
          // })
        })
        .catch(function (error) {
          res.badRequest({error: error.message})
        })
    })
  },
}
