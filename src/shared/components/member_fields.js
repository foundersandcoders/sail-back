const React = require('react')
const Field = require('./field.js')
const { options
      , field_order
      , fieldStructure
      , user_field_structure
      , add_member_field_order
      , addMemberfieldStructure
      , sign_up_fields
      } = require('../form_fields/member.js')
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
  , userViewClass
  , memberView
  , member_view_fields
  , addMember
  , memberSignup
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

  const make_fieldset = field_structure => field_list =>
    <fieldset
      key={field_list}
      className={'member-column-' + field_list}
    >
      { array_only_keys(field_structure[field_list], fs)
        .map((field) =>
          <Field
            {...fs[field]}
            id={field}
            name={field === 'id' ? 'Membership Number: ' : label_from_id(field)}
            options={memberSignup && field === 'membership_type' ? options[field].filter(option => !option.match(/group|corporate|accounts/)) : options[field]}
            mode={contains(field, read_only) ? 'view' : mode}
            key={field}
            className={userViewClass}
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
        { fs.deletion_reason ? make_fieldset(fieldStructure)('edit') : '' }
      </div>
      <div className={className}>
        { memberView
          ? make_fieldset(user_field_structure)(member_view_fields)
          : addMember
            ? add_member_field_order.map(make_fieldset(addMemberfieldStructure))
            : memberSignup
              ? make_fieldset({ sign_up_fields })('sign_up_fields')
              : field_order.map(make_fieldset(fieldStructure))
        }
      </div>
      { buttons_first ? '' : buttons }
    </form>
  )
}

module.exports = PersonalFields
