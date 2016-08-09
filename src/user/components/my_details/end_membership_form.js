import React from 'react'


export default ({fields, reactivate_member, ...props}) => {
  return (
    <form>
      { fields.activation_status.value === 'activated'
          ? <button type='button' onClick={props.deactivate_member}>
              End Membership
            </button>
          : <div>
              <p>
                We are sorry to see you go. Please let us know why you are leaving.
              </p>
              <textarea></textarea>
              <button type='button' onClick={() => {console.log('submit the form')} }>
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
