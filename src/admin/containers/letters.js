// TODO style buttons

import React from 'react'
import { connect } from 'react-redux'

import { send_newsletter_post
       , send_sub_reminder_post
       , toggle_recipient_list
       } from '../redux/modules/letters/letters.js'

import PostMembersSection from '../dumb_components/letters/post_members_section.js'
import SubLettersSection from '../dumb_components/letters/sub_letters_section.js'

const Letters = ({ letters, send_newsletter_post, send_sub_reminder_post, toggle_recipient_list, letters_view }) => {
  return (
    <div className='top-letter-container'>
      <button onClick={send_newsletter_post}>Post Members</button>
      <button onClick={send_sub_reminder_post}>Subscription Reminders</button>
      <div>
        {letters_view
          ? <PostMembersSection letters={letters} toggle_recipient_list={toggle_recipient_list}/>
          : <SubLettersSection letters={letters} toggle_recipient_list={toggle_recipient_list} />
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { letters: state.letters
    , letters_view: state.letters.letters_view
  }
)

export default
  connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post, toggle_recipient_list })(Letters)
