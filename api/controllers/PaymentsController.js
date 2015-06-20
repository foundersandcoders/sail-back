/**
 * PaymentsController
 *
 *
 *  Braintree:
 *      - client side (https://developers.braintreepayments.com/javascript+ruby/start/hello-client)
 *      - server side (https://developers.braintreepayments.com/ios+node/start/hello-server)
 *
**/

var is         = require("torf");
var Stripe     = require("stripe")("sk_test_rJI1JQQM57MTQYKldOf0qXZv");
var braintree  = require("braintree");
var Validation = require('../../assets/js/vdom/services/validate.js');

// sandbox credentials
var BraintreeGateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "rk34hgxrsz8z28y9", // process.env.BRAINTREE_MERCHANT_ID
    publicKey: "nhxtvjg55pd84txj", // process.env.BRAINTREE_PUBLIC_KEY
    privateKey: "f96014be14f9b260c692e46a4d8ea1ca" // process.env.BRAINTREE_PRIVATE_KEY
});

module.exports = {
    charge: function (req, res) {

        var payment    = req.body;
        payment.date   = new Date();
        payment.member = req.session.user.id;

        Validation("payment", payment, function (errorValidation) {

            if (errorValidation) {
                return res.badRequest({error: errorValidation});
            }

            Payments
            .create(payment)
            .exec(function (error, item) {

                if(error) {
                    return res.badRequest({error: error});
                } else {
                    return res.send(item);
                }
            });
        });
    },
	makeStripePayment: function (req, res) {

		var stripeToken = req.body.token;

		var paymentStripe = {
			amount: 51, // amount in cents, again {req.body.amount}
			currency: "gbp",
			source: req.body.token,
			description: "Example charge" // {req.body.description}
		};

		Stripe.charges.create(paymentStripe)
		.then(function (chargeCreated) {

			return Member.findOne(req.session.user || "471663");
		})
		.then(function (memberFound) {

			if(!is.ok(memberFound)) {

				throw new Error ("Member not found!");
			} else {

				var paymentRecord = {
					amount: paymentStripe.amount,
					type: 'CASHCARDCREDIT',
					description: paymentStripe.description,
					reference: req.body.reference,
					date: new Date(),
					category: 'payment',
					member: memberFound.id
				}

				return Payment.create(paymentRecord);
			}
		})
		.then(function (paymentCreated) {

			res.send(paymentCreated);
		})
		.catch(function (err) {

			res.badRequest(err);
		});
	},
    clientToken: function (req, res) {

        BraintreeGateway
        .clientToken
        .generate({
            merchantAccountId: "rk34hgxrsz8z28y9"
        }, function (err, response) {

            if (err) {
                res.badRequest({error: err}); 
            } else {
                res.send({token: response.clientToken});
            }
        });
    },
    /**
     *  Payment
     *
     *  
     *
    **/
    makePaypalPayment: function (req, res) {

        Validation("payment", req.body, function (errorValidation) {

            if(errorValidation) {
                return res.badRequest({error: errorValidation});
            }

            BraintreeGateway
            .transaction
            .sale({
                amount: req.body.amount || "0",
                paymentMethodNonce: req.body.payment_method_nonce
            }, function (err, result) {

                if (err) {
                    res.badRequest({error: err});
                } else {

                    Members
                    .findOne(req.session.user.id)
                    .then(function (member) {

                        // console.log("RESULT", result);

                        var paymentRecord = {
                            category: "payment",
                            description: "Payment by " + result.transaction.paymentInstrumentType,
                            type: "PAYPAL",
                            amount: result.transaction.amount,
                            member: member.id,
                            date: new Date()
                        };

                        return Payments.create(paymentRecord);
                    }).then(function (payment) {

                        // console.log("PAYMENT", payment);

                        res.redirect("/");
                    }).catch(function (err) {

                        // console.log("ERROR", err);

                        res.badRequest({error: err});
                    });
                }
            });
        });
    }
};
