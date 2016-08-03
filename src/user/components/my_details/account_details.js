import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fields, fieldStructure } from '../../../admin/form_fields/member.js'

export default (props) =>
  <ViewMember
    {...props}
    fields={fields}
    Buttons={button}
    mode='view'
    onSubmit={() => console.log('clicked')}
  />

  const ViewMember = reduxForm(
    { form: 'user'
    , validate
    , fields: []
    }
  )(MemberFields)

const button = () => <button>Click</button>
