const { concat, prop, compose, test, converge, merge, defaultTo } =
    require('ramda')
const { exists, selected, check_tests, date } = require('app/validate')

const subscription = ['date', 'amount']
const event = concat(subscription, ['notes'])
const donation = event
const payment = concat(donation, ['type', 'reference'])

const payment_category_options =
  [ 'Cash'
  , 'Cheque'
  , 'Standing Order'
  , 'Harbour Office'
  , 'BACS'
  , 'CAF'
  , 'Refund'
  ]

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
  const ref_not_required = compose
    ( test(/standing|BACS|harbour/i)
    , compose(defaultTo('cash'), prop('type'))
    )

  const required_tests =
    { date: exists
    , amount: exists
    , type: selected
    , reference: (field) => (values) =>
      ref_not_required(values) || exists(field, values)
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
