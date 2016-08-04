const React = require('react')

const Buttons = (
  { edit_member_click
  , cancel_member_click
  , mode
  }
) =>
  mode === 'view'
    ? <ViewButton edit_member_click={edit_member_click} />
    : <EditButtons
        {...
          { cancel_member_click
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
  { cancel_member_click
  }
) =>
  <div
    className='member-edit-buttons'
  >
    <button
      className='member-save-button'
      type='submit'
    >
      Save
    </button>
    <button
      className='member-cancel-button'
      type='button'
      onClick={cancel_member_click}
    >
      Cancel
    </button>
  </div>

module.exports = Buttons
