const { reduxForm } = require('redux-form')
const { prop } = require('ramda')
const React = require('react')
const Field = require('../components/field.js')
const Buttons = require('./edit_member_buttons.js')
const { options, field_order, fieldStructure, read_only } =
  require('../form_fields/member.js')
const { array_only_keys } = require('app/sort')
const { __, contains, assoc, filter, compose } = require('ramda')

const PersonalFields = (
  { fields: fs
  , Buttons
  , button_props
  , handleSubmit
  , mode
  , className
  , buttons_first
  }
) => {
  const buttons =
    <Buttons
      { ...assoc('fields', fs, button_props)
      }
    />
  const make_fieldset = (field_list) =>
    <fieldset
      key={field_list}
      className={'member-column-' + field_list}
    >
      { array_only_keys(fieldStructure[field_list], fs[field_list])
        .map((field) =>
          <Field
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
  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className='member-info-controls'>
        { buttons_first ? buttons : '' }
        { fs.edit ? make_fieldset('edit') : '' }
      </div>
      <div className={className}>
        { array_only_keys(field_order, fs).map(make_fieldset) }
      </div>
      { buttons_first ? '' : buttons }
    </form>
  )
}

const label_from_id = (id) =>
  id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': '

module.exports = reduxForm(
  { form: 'member' }
)(PersonalFields)
