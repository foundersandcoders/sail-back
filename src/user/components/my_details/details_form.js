import React from 'react'
import { reduxForm } from 'redux-form';
import Field from '../../../admin/components/field.js'

const my_details_form = ({fields, handleSubmit, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {fieldList.map(field =>
        <Field
          {...fields[field]}
          id={field}
          mode='edit'
          key={field}
          />
      )}
      <button type='submit'>Update Details</button>
    </form>
  )
}

const fieldList =
[ 'title'
, 'initials'
, 'first_name'
, 'last_name'
, 'primary_email'
, 'secondary_email'
, 'address1'
, 'address2'
, 'address3'
, 'address4'
, 'county'
, 'postcode'
, 'deliverer'
, 'home_phone'
, 'work_phone'
, 'mobile_phone'
]

export default reduxForm(
  { form: 'my_details_form'
  }
)(my_details_form)
