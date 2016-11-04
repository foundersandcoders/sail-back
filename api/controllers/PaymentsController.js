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

// ATTENTION: sandbox credentials: need real credentials and must be kept PRIVATE
var gateway = braintree.connect({
  environment: braintree.Environment[process.env.BRAINTREE_ENV || 'Sandbox'],
  merchantId: process.env.BRAINTREE_MERCHANT_ID || 'hbjzcsxhcgkxmcdb',
  publicKey: process.env.BRAINTREE_PUBLIC_KEY || 'td75qh4v93n9rq8q',
  privateKey: process.env.BRAINTREE_PRIVATE_KEY || '08960cdddfd8cfa7be506377a155680b'
})

module.exports = {

  clientToken: function (req, res) {
    gateway
      .clientToken
      .generate({
        merchantAccountId: process.env.BRAINTREE_MERCHANT_ACCOUNT_ID || 'friendsofchichesterharbour'
          // https://developers.braintreepayments.com/reference/request/client-token/generate/node#merchant_account_id
      }, function (err, response) {
        if (err) {
          console.log('token err', err)
          res.badRequest({
            error: err
          })
        } else {
          res.send({
            token: response.clientToken
          })
        }
      })
  },

  makePayment: function (req, res) {
    gateway
      .transaction
      .sale({
        amount: req.body.amount,
        paymentMethodNonce: req.body.nonce,
        options: {
          submitForSettlement: true
        },
        descriptor: {
          name: 'fch*friendsch.org',
          phone: '01243512301',
          url: 'friendsch.org'
        }
      }, function (error, result) {
        if (error) {
          console.log('braintree transaction error: ', error)
          res.send({
            braintree_error: error
          })
        } else if (result.success) {
          // if successful payment, update the db
          var formattedPayment = formatPaymentForDB(req, result.transaction, req.body.type)
          Validation('payment', formattedPayment, function (errorValidation) {
            if (errorValidation) {
              console.log('validation error: ', errorValidation)
              return res.badRequest({
                error: errorValidation
              })
            }

            Payments
              .create(formattedPayment)
              .exec(function (error, item) {
                if (error) {
                  console.log('database entry error: ', error)
                  return res.badRequest({
                    error: error
                  })
                } else {
                  var formatted = Object.assign({}, item, {
                    success: true
                  })
                  return res.send(formatted)
                }
              })
          })
        } else {
          console.log('transaction not successful: ', result)
          res.send(result)
        }
      })
  },

  payingInReport: function (req, res) {
    Payments.query(queries.paying_in, [req.params.ref, req.params.ref], function (err, results) {
      if (err) {
        res.badRequest({
          error: err
        })
      } else {
        res.send(results)
      }
    })
  },

  nonChequeReport: function (req, res) {
    Payments.query(queries.non_cheque, [req.query.after, req.query.before, req.params.type], function (err, results) {
      if (err) {
        res.badRequest({
          error: err
        })
      } else {
        res.send(results)
      }
    })
  },

  addDonation: function (req, res) {
    console.log('in here ', req.body)
    Payments
      .create({
        member: req.session.user.id,
        description: 'Donation made on website',
        amount: parseFloat(req.body.amount) * 100,
        date: new Date(),
        category: 'donation'
      })
      .exec(function (err, success) {
        if (err) return res.badRequest(err)
        return res.send(success)
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
