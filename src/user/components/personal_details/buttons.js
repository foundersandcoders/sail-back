const React = require('react')

const Buttons = ({ mode, toggle_member_mode }) =>
  mode === 'view'
    ? <ViewButton toggle_member_mode={toggle_member_mode}/>
    : <EditButtons toggle_member_mode={toggle_member_mode}/>

const ViewButton = ({ toggle_member_mode }) =>
  <button
    className='member-view-edit-button'
    onClick={toggle_member_mode}
    type='button'
  >
    Edit
  </button>

const EditButtons = ({ toggle_member_mode }) =>
  <div className='member-view-edit-buttons'>
    <button className='member-view-save-button' type='submit'>
      Save
    </button>
    <button className='member-view-cancel-button' type='button' onClick={toggle_member_mode}>
      Cancel
    </button>
  </div>

const NoButtons = () =>
  <div></div> //eslint-disable-line

module.exports = { Buttons, NoButtons }
