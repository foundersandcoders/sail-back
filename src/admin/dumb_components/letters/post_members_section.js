import React from 'react'
import LetterRecipients from './letter_recipients.js'

export default ({ toggle_recipient_list, shown, ...other }) =>
  <div>
    <button
      className='letters-toggle'
      onClick={toggle_recipient_list}>
      {shown ? 'Hide Members' : 'Show Members'}
    </button>
    {shown && <PostMembers {...other} />}
  </div>

const PostMembers = ({ post_members }) =>
  <div>
    <LetterRecipients recipients={post_members} />
  </div>
