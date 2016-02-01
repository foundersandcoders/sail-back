const React = require('react')
const { reduxForm } = require('redux-form')
const { array_order_keys } = require('app/sort')
const { map } = require('ramda')
const { types, options, validate } = require('../form_fields/charge_form.js')
const Field = require('../components/field.js')

const ChargeForm = (
  { fields
  , type
  , handleSubmit
  }
) =>
  <form
    onSubmit={handleSubmit}
    className='flex'
  >
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
    <button
      type='submit'
      className='charge-field flex-button'
    >
      Save
    </button>
  </form>

module.exports = reduxForm(
  { form: 'charge-form'
  , fields: []
  , validate
  }
)(ChargeForm)
