const React = require('react')
const Field = require('../../shared/dumb_components/field.js')
const { options, field_order, fieldStructure } = require('../../shared/form_fields/member.js')
const { array_only_keys } = require('app/sort')
const { contains, merge, dissoc } = require('ramda')

const PersonalFields = (
  { fields
  , required
  , Buttons
  , button_props
  , handleSubmit
  , mode
  , className
  , buttons_first
  , error
  , read_only
  , description
  , inputClassName
  }
) => {
  const fs = ((fields.membership_type && fields.membership_type.value) || '').match('life')
    ? fields
    : dissoc('life_payment_date', fields)

  const buttons =
    <Buttons
      { ...merge({ fields: fs, error }, (button_props || {}))
      }
    />

  const label_from_id = (id) =>
    id[0].toUpperCase()
    + id.slice(1).replace(/_/g, ' ')
    + (mode === 'edit' && contains(id, required) ? '*' : '')
    + ': '

  const make_fieldset = (field_list) =>
    <fieldset
      key={field_list}
      className={'member-column-' + field_list}
    >
      { array_only_keys(fieldStructure[field_list], fs)
        .map((field) =>
          <Field
            {...fs[field]}
            id={field}
            name={label_from_id(field)}
            options={options[field]}
            mode={contains(field, read_only) ? 'view' : mode}
            key={field}
            description={description}
            className={inputClassName}
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
        { fs.deletion_reason ? make_fieldset('edit') : '' }
      </div>
      <div className={className}>
        { field_order.map(make_fieldset) }
      </div>
      { buttons_first ? '' : buttons }
    </form>
  )
}

module.exports = PersonalFields
