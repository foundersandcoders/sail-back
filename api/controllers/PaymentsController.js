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
  environment: braintree.Environment.Sandbox,
  merchantId: 'hbjzcsxhcgkxmcdb', // process.env.BRAINTREE_MERCHANT_ID
  publicKey: 'td75qh4v93n9rq8q', // process.env.BRAINTREE_PUBLIC_KEY
  privateKey: '08960cdddfd8cfa7be506377a155680b' // process.env.BRAINTREE_PRIVATE_KEY
})

module.exports = {
  clientToken: function (req, res) {
    gateway
      .clientToken
      .generate({
        merchantAccountId: 'hbjzcsxhcgkxmcdb'
      }, function (err, response) {
        if (err) {
          res.badRequest({error: err})
        } else {
          res.send({token: response.clientToken})
        }
      })
  },
  /**
   *  Payment
   *
   *
   *
  **/
  creditCardPayment: function (req, res) {
    var nonceFromTheClient = req.body.nonce

    gateway
      .transaction
      .sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if (err) {
          console.log('Braintree Error: ', error);
          res.badRequest({ error });
        } else if (result.success) {
          // if successful payment, update the db
          var formattedPayment = formatPaymentForDB(req, result.transaction, 'bacs') // TODO: Change to credit card once merged
          Validation('payment', formattedPayment, function (errorValidation) {
            if (errorValidation) {
              return res.badRequest({error: errorValidation})
            }

            Payments
              .create(formattedPayment)
              .exec(function (error, item) {
                if (error) {
                  return res.badRequest({error: error})
                } else {
                  return res.send(item)
                }
              })
          })
        } else {
          res.send(result)
        }
      });
  },
  // This controller is exactly the same as crediCardPayment controller except for the payment `type` passed into formatPaymentForDB()
  makePaypalPayment: function (req, res) {
    var nonceFromTheClient = req.body.nonce

    gateway
      .transaction
      .sale({
        amount: req.body.amount || '0',   // TODO: Why default to zero?
        paymentMethodNonce: nonceFromTheClient
      }, function (err, result) {
        if (err) {
          res.badRequest({error: err})
        } else {
          var formattedPayment = formatPaymentForDB(req, result.transaction, 'paypal')

          Validation('payment', formattedPayment, function (errorValidation) {
            if (errorValidation) {
              return res.badRequest({error: errorValidation})
            }
          // add payment to db
          Payments
            .create(formattedPayment)
            .exec(function (error, item) {
              if (error) {
                return res.badRequest({ error })
              } else {

                return res.send(item)
              }
            })
          })
        }
      })
  },

  payingInReport: function (req, res) {
    Payments.query
      ( queries.paying_in
      , [req.params.ref, req.params.ref]
      , function (err, results) {
          if (err) res.badRequest({ error: err })
          else res.send(results)
        }
      )
  },

  nonChequeReport: function (req, res) {
    Payments.query
      ( queries.non_cheque
      , [req.query.after, req.query.before, req.params.type]
      , function (err, results) {
          if (err) res.badRequest({ error: err })
          else res.send(results)
        }
      )
  }
}

function formatPaymentForDB (req, transaction, type) {
  return {
    category: 'payment',
    description: 'Payment by ' + transaction.paymentInstrumentType.split('_').join(' '),
    type: type,
    amount: parseFloat(transaction.amount) * 100,
    member: req.session.user.id,
    reference: transaction.id,
    date: new Date()
  }
}
