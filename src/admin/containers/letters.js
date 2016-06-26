// TODO put active view or something similar in state
// TODO style buttons

import React from 'react'
import { connect } from 'react-redux'

import { send_newsletter_post
       , send_sub_reminder_post
       , active_view
       } from '../redux/modules/letters/letters.js'

import PostMembersSection from '../dumb_components/letters/post_members_section.js'
import SubLettersSection from '../dumb_components/letters/sub_letters_section.js'

const Letters = ({ letters, send_newsletter_post, send_sub_reminder_post, active_view }) => {
  return (
    <div className='top-letter-container'>
      <button onClick={send_newsletter_post}>Post Members</button>
      <button onClick={send_sub_reminder_post}>Subscription Reminders</button>
      <div>
        {letters.post_members.members.length > 0
          ? <PostMembersSection letters={letters} active_view={active_view}/>
          : null
        }
        {letters.sub_reminders.reminderLetters.length > 0
          ? <SubLettersSection letters={letters} active_view={active_view} />
          : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { letters: state.letters }
}

export default
  connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post, active_view })(Letters)
