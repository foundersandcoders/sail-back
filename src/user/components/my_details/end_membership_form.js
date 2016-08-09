import React from 'react'
import Field from '../../../shared/dumb_components/field.js'
import { options } from '../../../shared/form_fields/member.js'

export default ({fields, handleSubmit, reactivate_member, update_member_user, ...props}) => {
  return (
    <form onSubmit={handleSubmit(update_member_user)}>
      { fields.activation_status.value === 'activated'
          ? <button type='button' onClick={props.deactivate_member}>
              End Membership
            </button>
          : <div>
              <p>
                Sorry to say goodbye.  It would help us if you could select the reason why you are leaving. And if you wish, add a comment
              </p>
              <Field
                {...fields.deletion_reason}
                name={fields.deletion_reason.name}
                options={options.deletion_reason}
                description='Please givea a reason'
                mode='edit'
                />
              <textarea></textarea>
              <button type='submit' >
                Confirm
              </button>
              <button type='button' onClick={reactivate_member}>
                Cancel
              </button>
          </div>
      }
    </form>
  )
}
