const { concat } = require('ramda')

const subscription = ['amount', 'date']
const event = concat(subscription, ['notes'])
const donation = event
const payment = concat(donation, ['type', 'reference'])

const payment_category_options =
  [ 'Cash', 'Cheque', 'Standing Order', 'HO', 'CAF' ]

const types =
  { subscription
  , event
  , donation
  , payment
  }

const type_order =
  [ 'subscription'
  , 'event'
  , 'donation'
  , 'payment'
  ]

module.exports =
  { types
  , type_order
  , options: { type: payment_category_options }
  }
