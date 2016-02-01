const { concat, contains, prop, equals, not, propOr, compose, test, curry
  , both, keys, assoc } =
    require('ramda')
const { exists, selected, check_tests } = require('app/validate')

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

const validate = (values) => {
  const ref_required = compose(test(/ash|eque/), propOr('', 'type'))

  const tests =
    { date: exists
    , amount: exists
    , type: selected
    , reference: (field) => both(ref_required, exists(field))
    }

  return check_tests(tests, values)
}

module.exports =
  { types
  , type_order
  , options: { type: payment_category_options }
  , validate
  }
