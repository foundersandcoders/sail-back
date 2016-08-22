const React = require('react')

const Buttons = ({ mode, ...props }) =>
  mode === 'view'
    ? <ViewButton {...props}/>
    : <EditButtons {...props}/>

const ViewButton = ({ edit_member_click }) =>
  <button
    className='member-view-edit-button'
    onClick={edit_member_click}
    type='button'
  >
    Edit
  </button>

const EditButtons = ({ cancel_member_click }) =>
  <div className='member-view-edit-buttons'>
    <button className='member-view-save-button' type='submit'>
      Save
    </button>
    <button className='member-view-cancel-button' type='button' onClick={cancel_member_click}>
      Cancel
    </button>
  </div>

module.exports = Buttons
