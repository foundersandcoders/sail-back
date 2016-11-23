const React = require('react')
const { reduxForm } = require('redux-form')
const { array_order_keys } = require('app/sort')
const { map } = require('ramda')
const { types, options, validate } = require('../form_fields/charge_form.js')
const Field = require('../../shared/dumb_components/field.js')

const ChargeForm = (
  { fields
  , type
  , handleSubmit
  , switch_charge_type
  }
) =>
  <form
    onSubmit={handleSubmit}
  >
    <div className='flex charge_form_fields'>
      { map
        ( (f) =>
          <Field
            {...fields[f]}
            mode='edit'
            className='charge-field'
            name={f}
            options={options[f]}
            key={f}
          />
        , array_order_keys(types[type], fields)
        )
      }
    </div>

    <div className='charge-form-buttons'>

      <button
        type='submit'
        className='flex-button btn-primary charge-field-button'
      >
        Save
      </button>

      <button
        type='button'
        onClick={() => switch_charge_type('')}
        className='flex-button charge-field-button'
      >
      Cancel
      </button>

    </div>
  </form>

module.exports = reduxForm(
  { form: 'charge-form'
  , fields: []
  , validate
  }
)(ChargeForm)
