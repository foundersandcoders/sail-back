const { reduxForm } = require('redux-form')
const { prop } = require('ramda')
const React = require('react')
const FieldComponent = require('../components/field.js')
const Buttons = require('./edit_member_buttons.js')
const { fields, fieldStructure, options } = require('./fields.js')
const { __, contains } = require('ramda')

const PersonalFields = (
  { fields: fs
  , edit_member_click
  , deactivate_member_click
  , cancel_member_click
  , activation_status
  , handleSubmit
  , mode
  , className
  }
) =>
  <form
    onSubmit={handleSubmit}
    className={className}
  >
    <Buttons
      {...
        { edit_member_click
        , deactivate_member_click
        , cancel_member_click
        , activation_status
        , mode
        }
      }
    />
    { Object.keys(fs).map((field_list) =>
      <fieldset key={field_list} className={'col-1 member-column-' + field_list}>
        { Object.keys(fs[field_list]).map((field) =>
          <FieldComponent
            {...fs[field_list][field]}
            id={field}
            name={label_from_id(field)}
            options={options[field]}
            mode={mode}
            key={field}
          />
        )}
      </fieldset>
    ) }
  </form>

const label_from_id = (id) =>
  id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': '

const get_sub_fields = (sub, member) =>
  Object.keys(member).filter(contains(__, fieldStructure[sub]))
        .reduce((fields, key) =>
          ({...fields, [key]: member[key] && String(member[key]) }), {})

const get_sub_forms = (member) =>
  ['personal', 'address', 'membership'].reduce((form, sub) =>
    ({...form, [sub]: get_sub_fields(sub, member)}), {})

const map_state_to_props = ({ member }) =>
  Object.keys(member).length && { initialValues: get_sub_forms(member) }

module.exports = reduxForm(
  { form: 'personal' }
  , map_state_to_props
)(PersonalFields)
