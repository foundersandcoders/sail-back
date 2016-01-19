const React = require('react')

const Buttons = (
  { edit_member_click
  , reactivate_member_click
  , deactivate_member_click
  , update_member_click
  , cancel_member_click
  , activation_status
  , mode
  }
) =>
  mode === 'view'
    ? <ViewButton edit_member_click={edit_member_click} />
    : <EditButtons
        {...
          { reactivate_member_click
          , deactivate_member_click
          , update_member_click
          , cancel_member_click
          , activation_status
          }
        }
      />

const ViewButton = (
  { edit_member_click
  }
) =>
  <button
    className='member-info-edit-button'
    onClick={edit_member_click}
    type='button'
  >
    Edit
  </button>

const EditButtons = (
  { reactivate_member_click: reactivate
  , deactivate_member_click: deactivate
  , update_member_click
  , cancel_member_click
  , activation_status
  }
) =>
  <div>
    <button
      className='member-activation-control'
      type='button'
      onClick={activation_status === 'activated' ? reactivate : deactivate }
    >
      { activation_status === 'activated' ? 'Delete' : 'Reactivate' }
    </button>
    <button
      className='member-cancel-button'
      type='button'
      onClick={cancel_member_click}
    >
      Cancel
    </button>
    <button
      className='member-save-button'
      type='submit'
    >
      Save
    </button>
  </div>

module.exports = Buttons
