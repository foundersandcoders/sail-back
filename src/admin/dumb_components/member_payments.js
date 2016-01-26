const React = require('react')
const { connect } = require('react-redux')
const { update_field } = require('../redux/modules/payment_defaults.js')
const { compose, curry, map } = require('ramda')
const { types, type_order } = require('../form_fields/charge_form.js')

var PaymentsTable = require('../components/payments_table')
const ChargeForm = require('./charge_form.js')

var MemberPayments = (
  { payments
  , category
  , switch_charge_type
  , charge_type
  , add_payment
  }
) =>
  <div>
    <div className='inner-section-divider-medium'></div>
    <div className='inner-section-divider-medium'></div>
    <PaymentsTable
      payments={payments}
    />
    { charge_type
      ? <ChargeForm
          fields={types[charge_type]}
          type={charge_type}
          onSubmit={add_payment}
        />
      : ''
    }
    <div className='flex payment-buttons'>
      { map
        ( (type) =>
            <button onClick={(_) => switch_charge_type(type)} />
          , type_order
        )
      }
      <a href="#/" className="flex-button">
        <button className="btn-primary">Home</button>
      </a>
    </div>
  </div>

const stateToProps = ({ payment_defaults, payments }) => (
  { ...payment_defaults
  , payments
  }
)

module.exports = connect(stateToProps)(MemberPayments)
