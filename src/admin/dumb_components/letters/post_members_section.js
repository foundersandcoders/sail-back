import React from 'react'
import LetterRecipients from './letter_recipients.js'

export default ({ letters, toggle_recipient_list, shown }) => (
  <div>
    <button
      className='letters-toggle'
      onClick={toggle_recipient_list}>
      {shown ? 'Hide Members' : 'Show Members'}
    </button>
    {shown && <PostMembers letters={letters.post_members.members} />}
  </div>
)

const PostMembers = ({ letters }) => (
  <div>
    <LetterRecipients letters={letters} />
  </div>
)
