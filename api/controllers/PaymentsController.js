/**
 * PaymentsController
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var is     = require("torf");
var Stripe = require("stripe")("sk_test_rJI1JQQM57MTQYKldOf0qXZv");



module.exports = {

	makePayment: function (req, res) {



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
	}
};