/**
* Payments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: 'alter',
	attributes: {
		member: {
			model: 'Members'
		},
		type: {
			type: 'STRING',
			enum: ['payment', 'subscription', 'donation', 'event'],
			required: true
		},
		paymentType: {
			model: 'PaymentTypes'
		},
		description: {
			type: 'STRING'
		},
		amount: {
			type: 'FLOAT'
		},
		reference: {
			model: 'References'
		},
		notes: {
			type: 'STRING'
		},
		date: {
			type: 'DATE'
		}
	}
};