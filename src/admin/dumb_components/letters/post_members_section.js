import React from 'react'
import LetterRecipients from './letter_recipients.js'

export default ({ letters, toggle_recipient_list }) => (
  <div>
    <button onClick={() => toggle_recipient_list('post_members', !letters.post_members.shown)}>
      {letters.post_members.shown ? 'Hide Members' : 'Show Members'}
    </button>
    {letters.post_members.shown
      ? <PostMembers letters={letters.post_members.members} />
    : null
    }
  </div>
)

const PostMembers = ({ letters }) => (
  <div>
    <LetterRecipients letters={letters} />
  </div>
)
