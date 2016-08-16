import React from 'react'
import Field from '../../../shared/dumb_components/field.js'

export default ({fields, handleSubmit, reactivate_member, update_member_user, deactivate_member }) => {
  const end_membership_button = () =>
    <button type='button' onClick={deactivate_member}>
      End Membership
    </button>

  const end_membership_fields = () =>
    <div>
      <p>
        Sorry to say goodbye.  It would help us if you could let us know why you are leaving.
      </p>
      <Field
        {...fields.user_notes}
        name='Departing notes'
        mode='edit'
      />
      <div className='member-view-edit-buttons'>
        <button className='member-view-save-button' type='submit'>
          Confirm
        </button>
        <button className='member-view-cancel-button' type='button' onClick={reactivate_member}>
          Cancel
        </button>
      </div>
    </div>

  return (
    <form onSubmit={handleSubmit(update_member_user)}>
      { fields.activation_status.value === 'activated'
          ? end_membership_button()
          : end_membership_fields()
      }
    </form>
  )
}
