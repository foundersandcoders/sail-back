const { concat, contains, prop, equals, not, propOr, compose, test, curry
  , both, keys, assoc, converge, merge, complement } =
    require('ramda')
const { exists, selected, check_tests, date } = require('app/validate')

const subscription = ['date', 'amount']
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

  const required_tests =
    { date: exists
    , amount: exists
    , type: selected
    , reference: (field) => both(ref_required, () => exists(field))
    }

  return converge
    ( merge
    , [ check_tests('required', required_tests)
      , check_tests('invalid date', date)
      ]
    )(values)
}

module.exports =
  { types
  , type_order
  , options: { type: payment_category_options }
  , validate
  }
