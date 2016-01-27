const React = require('react')
const { compose, curry, map, dissoc } = require('ramda')
const { types, type_order } = require('../form_fields/charge_form.js')

var PaymentsTable = require('../components/payments_table')
const ChargeForm = require('./charge_form.js')

var MemberPayments = (
  { payments
  , category
  , payment_defaults
  , switch_charge_type
  , charge_type
  , add_payment
  , remove_payment
  , update_field
  }
) =>
  <div>
    <div className='inner-section-divider-medium'></div>
    <div className='inner-section-divider-medium'></div>
    <PaymentsTable
      payments={payments}
      remove_payment={remove_payment}
    />
    { charge_type
      ? <ChargeForm
          fields={types[charge_type]}
          type={charge_type}
          initialValues={with_amount(charge_type, payment_defaults)}
          onSubmit={add_payment}
        />
      : ''
    }
    <div className='flex payment-buttons'>
      { map
        ( (type) =>
            <button
              onClick={(_) => switch_charge_type(type)}
            >
              { '+ ' + type }
            </button>
          , type_order
        )
      }
      <a href="#/" className="flex-button">
        <button className="btn-primary">Home</button>
      </a>
    </div>
  </div>

const with_amount = (type, defaults) => {
  const amount = defaults.subscription_amount
  return type === 'subscription' ? defaults : dissoc('amount', defaults)
}

module.exports = MemberPayments
