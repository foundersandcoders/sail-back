/*global
  Members, Payments
*/

/**
 * PaymentsController
 *
 *
 *  Braintree:
 *      - client side (https://developers.braintreepayments.com/javascript+ruby/start/hello-client)
 *      - server side (https://developers.braintreepayments.com/ios+node/start/hello-server)
 *
 **/

var braintree = require('braintree')
var Validation = require('../services/validate.js')
var queries = require('../queries/payments.js')
var { sendEmail } = require('../services/email_mailgun.js')
var get_balance = require('app/get_balance')
var end_membership_email_footer = require('app/end_membership_email_footer')

// ATTENTION: sandbox credentials: need real credentials and must be kept PRIVATE
var gateway = braintree.connect({
  environment: braintree.Environment[process.env.BRAINTREE_ENV || 'Sandbox'],
  merchantId: process.env.BRAINTREE_MERCHANT_ID || 'hbjzcsxhcgkxmcdb',
  publicKey: process.env.BRAINTREE_PUBLIC_KEY || 'td75qh4v93n9rq8q',
  privateKey: process.env.BRAINTREE_PRIVATE_KEY || '08960cdddfd8cfa7be506377a155680b'
})

module.exports = {

  clientToken: function (req, res) { //eslint-disable-line
    return gateway
      .clientToken
      .generate({
        merchantAccountId: process.env.BRAINTREE_MERCHANT_ACCOUNT_ID || 'friendsofchichesterharbour'
          // https://developers.braintreepayments.com/reference/request/client-token/generate/node#merchant_account_id
      }, function (err, response) {
        if (err) {
          console.error('Error creating braintree token.')
          return res.badRequest({
            error: err
          })
        }
        return res.send({token: response.clientToken})
      })
  },

  makePayment: function (req, res) {
    return gateway
      .transaction
      .sale({
        amount: req.body.amount,
        paymentMethodNonce: req.body.nonce,
        options: {
          submitForSettlement: true
        },
        descriptor: {
          name: 'fch*friendsch.org',
          url: 'friendsch.org'
        }
      }, function (error, result) {
        if (error) {
          console.error('Braintree transaction error')
          return res.send({
            braintree_error: error
          })
        } else if (result.success) {
          // if successful payment, update the db
          var formattedPayment = formatPaymentForDB(req, result.transaction, req.body.type)
          return Validation('payment', formattedPayment, function (errorValidation) {
            if (errorValidation) {
              console.error('DB validation error')
              return res.badRequest({
                error: errorValidation
              })
            }

            return Payments
              .create(formattedPayment)
              .exec(function (error, item) {
                if (error) {
                  console.error('Payment database entry error')
                  return res.badRequest({
                    error: error
                  })
                } else {
                  var formatted = Object.assign({}, item, {
                    success: true
                  })
                  return sendEmail({
                    to: req.session.user.primary_email,
                    from: 'messenger@friendsch.org',
                    subject: 'Payment Confirmation',
                    text: 'Thank you for your Credit Card/PayPal payment.\n\nTreasurer\n\nFriends of Chichester Harbour' + end_membership_email_footer
                  }, function () {
                    return res.send(formatted)
                  })
                }
              })
          })
        } else {
          console.error('Braintree transaction not successful')
          return res.send(result)
        }
      })
  },

  payingInReport: function (req, res) {
    Payments.query(queries.paying_in, [req.params.ref, req.params.ref], function (err, results) {
      if (err) {
        return res.badRequest({
          error: err
        })
      } else {
        return res.send(results)
      }
    })
  },

  nonChequeReport: function (req, res) {
    Payments.query(queries.non_cheque, [req.query.after, req.query.before, req.params.type], function (err, results) {
      if (err) {
        return res.badRequest({
          error: err
        })
      } else {
        return res.send(results)
      }
    })
  },

  addDonation: function (req, res) {
    var memberId = req.session.user.id
    return Payments
      .create({
        member: memberId,
        description: 'Donation made on website',
        amount: parseFloat(req.body.amount) * 100,
        date: new Date(),
        category: 'donation'
      })
      .exec(function (err, success) {
        if (err) return res.badRequest(err)
        Members
          .findOne(memberId)
          .populate('events_booked')
          .populate('membership_type')
          .populate('payments')
          .exec(function (err, member) {
            if (err) return res.serverError(err)
            var balance_due = get_balance(member.payments)
            return res.send(Object.assign({}, { balance_due }, success))
          })
      })
  },

  getBalanceDue: function (req, res) {
    return Members
      .findOne(req.session.user.id)
      .populate('payments')
      .exec(function (err, member) {
        if (err) return res.badRequest(err)
        var balance_due = get_balance(member.payments)
        return res.send({ balance_due })
      })
  }
}

function formatPaymentForDB (req, transaction, type) {
  return {
    category: 'payment',
    description: 'Payment by ' + type,
    type: type,
    amount: parseFloat(transaction.amount) * 100,
    member: req.session.user.id,
    reference: transaction.id,
    date: new Date()
  }
}
