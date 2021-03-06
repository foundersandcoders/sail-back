const React = require('react')
const { map, assoc } = require('ramda')
const { types, type_order } = require('../form_fields/charge_form.js')

const PaymentsTable = require('../../shared/components/payments_table')
const ChargeForm = require('./charge_form.js')

var MemberPayments = (
  { payments
  , payment_defaults
  , switch_charge_type
  , charge_type
  , add_payment
  , remove_payment
  }
) =>
  <div>
    <div className='inner-section-divider-medium'></div>
    <div className='inner-section-divider-medium'></div>
    <PaymentsTable
      payments={payments}
      remove_payment={remove_payment}
    />
    {charge_type &&
      <ChargeForm
        fields={types[charge_type]}
        type={charge_type}
        initialValues={with_amount(charge_type, payment_defaults)}
        switch_charge_type={switch_charge_type}
        onSubmit={add_payment}
      />
    }
    {!charge_type &&
      <div className='payment-buttons'>
        { map
          (type =>
            <button
              onClick={() => switch_charge_type(type)}
              key={type}
            >
              { '+ ' + type }
            </button>
            , type_order
          )
        }
        <div>
          <a href='#/'>
            <button className='btn-primary'>Home</button>
          </a>
        </div>
      </div>
    }
  </div>

const with_amount = (type, defaults) => type === 'subscription' ? defaults : assoc('amount', '', defaults)

module.exports = MemberPayments
