/**
* Payments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  types: {
    payment_type: function (type) {
      return type.match(/standing|bacs|harbour/) || this.reference
    },
  },
  attributes: {
    member: {
      model: 'Members',
      index: true
    },
    category: {
      type: 'STRING',
      enum: ['payment', 'subscription', 'donation', 'event'],
      required: true
    },
    type: {
      model: 'PaymentTypes',
      payment_type: true,
      enum:
        [ 'harbour office'
        , 'standing order'
        , 'bacs'
        , 'cash'
        , 'cheque'
        , 'caf'
        , 'refund'
        , 'paypal'
        ]
    },
    description: {
      type: 'STRING'
    },
    amount: {
      type: 'FLOAT'
    },
    reference: {
      model: 'References',
      index: true
    },
    notes: {
      type: 'STRING'
    },
    date: {
      type: 'DATE',
      required: true,
      index: true
    }
  }
}
