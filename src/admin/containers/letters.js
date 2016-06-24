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
    <button onClick={send_newsletter_post}>Show All Post Members</button>
    <button onClick={send_sub_reminder_post}>Print Subscription Reminders</button>
      <div>
        {letters.post_members.length > 0
          ? <LetterRecipients letters={letters.post_members} />
          : null
        }
        {letters.sub_reminders.length > 0
          ? generateSubLetters(letters.sub_reminders)
          : null
        }
      </div>
  </div>
)

const SubLettersSection = ({ letters, active_view }) => (
  <div>
    <button onClick={() => active_view('sub_reminders', !letters.sub_reminders.shown)}>
      {letters.sub_reminders.shown ? 'Hide Letters' : 'Show Letters'}
    </button>
    {letters.sub_reminders.shown
      ? <SubLetters letters={letters} />
    : null
  }
  </div>
)

const SubLetters = ({ letters }) => (
  <div>
    <p className='sub-letters-header'>
      The following sample letter will be printed out for these recipients.
    </p>
    <LetterRecipients letters={letters.sub_reminders.reminderLetters} />
    <div className='letter-list-container'>
      <ul className='letter-list'>
      {letters.sub_reminders.reminderLetters.map((letter, i) => (
        <li key={i}>
          <StandingOrderLetter letter={letter}/>
        </li>
      ))}
      </ul>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return { letters: state.letters }
}

export default
  connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post, active_view })(Letters)
