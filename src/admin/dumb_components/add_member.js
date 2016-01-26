const { reduxForm } = require('redux-form')
const { prop } = require('ramda')
const React = require('react')
const FieldComponent = require('../components/field.js')
const Buttons = require('./edit_member_buttons.js')
const { options, field_order, fieldStructure, read_only } =
  require('./fields.js')
const { array_order_keys } = require('app/sort')
const { __, contains, assoc } = require('ramda')

const PersonalFields = (
  { fields: fs
  , Buttons
  , button_props
  , handleSubmit
  , mode
  , className
  }
) =>
  <form
    onSubmit={handleSubmit}
    className={className}
  >
    { array_order_keys(field_order, fs).map((field_list) =>
      <fieldset key={field_list} className={'col-1 member-column-' + field_list}>
        { array_order_keys(fieldStructure[field_list], fs[field_list])
          .map((field) =>
            <FieldComponent
              {...fs[field_list][field]}
              id={field}
              name={label_from_id(field)}
              options={options[field]}
              mode={contains(field, read_only) ? 'view' : mode}
              key={field}
            />
          )
        }
      </fieldset>
    ) }
    <Buttons
      { ...assoc('fields', fs, button_props)
      }
    />
  </form>

const label_from_id = (id) =>
  id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': '

module.exports = reduxForm(
  { form: 'member' }
)(PersonalFields)
