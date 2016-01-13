const React = require('react')
const { reduxForm: redux_form } = require('redux-form')
const { prop } = require('ramda')
const FieldComponent = require('../field.js')
const { fields, fieldStructure } = require('./fields.js')
const { __, contains } = require('ramda')

const PersonalFieldsA = (
  { fields: fs
  , handleSubmit
  , load
  , submitting
  , mode
  , className
  }) =>
    <div className={className}>
      { Object.keys(fs).map((field_list, i) =>
        <fieldset key={i} className='col-1'>
          { Object.keys(fs[field_list]).map((field, i) =>
            <FieldComponent
              {...fs[field_list][field]}
              id={field}
              name={label_from_id(field)}
              mode={mode}
              key={i} />
          )}
        </fieldset>
      ) }
    </div>

const label_from_id = (id) =>
  id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': '

const get_sub_fields = (sub, member) =>
  Object.keys(member).filter(contains(__, fieldStructure[sub]))
        .reduce((fields, key) =>
          ({...fields, [key]: member[key] && String(member[key]) }), {})

const get_sub_forms = (member) =>
  ['personal', 'address', 'membership'].reduce((form, sub) =>
    ({...form, [sub]: get_sub_fields(sub, member)}), {})

module.exports = redux_form(
  { form: 'personal'
  , fields: fields
  }
  , (
      { member }
    ) =>
      Object.keys(member).length && { initialValues: get_sub_forms(member) }
)(PersonalFieldsA)
