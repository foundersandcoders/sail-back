import React from 'react'
import Field from '../../../shared/dumb_components/field.js'
import { options } from '../../../shared/form_fields/member.js'

export default ({fields, handleSubmit, reactivate_member, update_member_user, my_details: { notes }, ...props}) => {
  return (
    <form onSubmit={handleSubmit(update_member_user)}>
      { fields.activation_status.value === 'activated'
          ? <button type='button' onClick={props.deactivate_member}>
              End Membership
            </button>
          : <div>
              <p>
                Sorry to say goodbye.  It would help us if you could let us know why you are leaving.
              </p>
                <Field
                  {...fields.user_notes}
                  name='Departing notes'
                  payload='Enter comment here'
                  mode='edit'
                  />
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
