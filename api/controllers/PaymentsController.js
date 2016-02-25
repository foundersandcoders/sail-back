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

// ATTENTION: sandbox credentials: need real credentials and must be kept PRIVATE
var BraintreeGateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'rk34hgxrsz8z28y9', // process.env.BRAINTREE_MERCHANT_ID
  publicKey: 'nhxtvjg55pd84txj', // process.env.BRAINTREE_PUBLIC_KEY
  privateKey: 'f96014be14f9b260c692e46a4d8ea1ca' // process.env.BRAINTREE_PRIVATE_KEY
})

module.exports = {
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
    BraintreeGateway
      .clientToken
      .generate({
        merchantAccountId: 'rk34hgxrsz8z28y9'
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

      BraintreeGateway
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
                  type: 'PAYPAL',
                  amount: result.transaction.amount,
                  member: member.id,
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
      ( 'select * from payments p' +
        '  where exists (' +
        '    select 1 from payments p2' +
        '      where p2.reference = ?' +
        '        AND p2.member = p.member' +
        '        AND p2.date >= p.date' +
        '  )' +
        '  order by p.date'
      , [req.params.ref]
      , function (err, results) {
          if (err) res.badRequest({ error: err })
          else res.send(results)
        }
      )
  }
}
