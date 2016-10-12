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
  creditCardPayment: function (req, res) {
    gateway.transaction.sale({
      amount: req.body.amount,
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (error, result) {
      if (error) {
        console.log('Braintree Error: ', error)
        res.badRequest({ error })
      } else if (result.success) {
        // if successful payment, update the db
        console.log('braintree result: ', result)
        addPaymentToDB(req, res, formatPaymentForDB(result.transaction, req.session.user.id))
      } else {
        res.send({ result })
      }
    })
  },

  charge: function (req, res) {
    var payment = req.body
    payment.date = new Date()
    payment.member = req.session.user.id

    Validation('payment', payment, function (errorValidation) {
      if (errorValidation) {
        return res.badRequest({error: errorValidation})
      }

      Payments
        .create(payment)
        .exec(function (error, item) {
          if (error) {
            return res.badRequest({error: error})
          } else {
            return res.send(item)
          }
        })
    })
  },
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
  makePaypalPayment: function (req, res) {
    Validation('payment', req.body, function (errorValidation) {
      if (errorValidation) {
        return res.badRequest({error: errorValidation})
      }

      gateway
        .transaction
        .sale({
          amount: req.body.amount || '0',
          paymentMethodNonce: req.body.payment_method_nonce
        }, function (err, result) {
          if (err) {
            res.badRequest({error: err})
          } else {
            Members
              .findOne(req.session.user.id)
              .then(function (member) {
                // console.log("RESULT", result)

                var paymentRecord = {
                  category: 'payment',
                  description: 'Payment by ' + result.transaction.paymentInstrumentType,
                  type: 'paypal',
                  amount: result.transaction.amount,
                  member: member.id,
                  reference: req.body.reference,
                  date: new Date()
                }

                return Payments.create(paymentRecord)
              }).then(function (payment) {
              // console.log("PAYMENT", payment)

              return res.redirect('/')
            }).catch(function (err) {
              // console.log("ERROR", err)

              return res.badRequest({error: err})
            })
          }
        })
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

function formatPaymentForDB (transaction, member_id) {
  //TODO: use monies.js
  var payment = {}
  payment.amount = parseFloat(transaction.amount) * 100
  payment.date = new Date()
  payment.category = 'payment'
  payment.type = 'credit card'
  payment.member = member_id
  payment.reference = transaction.id
  return payment
}

function addPaymentToDB (req, res, payment) {
  Validation('payment', payment, function (errorValidation) {
    if (errorValidation) {
      return res.badRequest({error: errorValidation})
    }

    Payments
      .create(payment)
      .exec(function (error, item) {
        if (error) {
          return res.badRequest({error: error})
        } else {
          console.log('successsfulll', item)
          return res.send(item)
        }
      })
  })
}
