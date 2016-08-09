import React from 'react'


export default ({fields, handleSubmit, reactivate_member, update_member_user, ...props}) => {
  return (
    <form onSubmit={handleSubmit(update_member_user)}>
      { fields.activation_status.value === 'activated'
          ? <button type='button' onClick={props.deactivate_member}>
              End Membership
            </button>
          : <div>
              <p>
                We are sorry to see you go. Please let us know why you are leaving.
              </p>
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
