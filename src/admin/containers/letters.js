import React from 'react'
import { connect } from 'react-redux'

import { send_newsletter_post, send_sub_reminder_post } from '../redux/modules/letters/letters.js'

import StandingOrderLetter from '../dumb_components/standing_order_letter.js'

const Letters = ({ letters, send_newsletter_post, send_sub_reminder_post }) => (
  <div className='top-letter-container'>
    <button onClick={send_newsletter_post}>Post Members</button>
    <button onClick={send_sub_reminder_post}>Send Subscription Reminder</button>
      {letters.post_members.length > 0
        ? <ul>
          {letters.post_members.map((member, i) => <li key={i}>{member.first_name}</li>)}
        </ul>
        : null
      }


    {letters.sub_reminders.length > 0
      ? generateSubLetters(letters.sub_reminders)
      : null
    }
  </div>
)

const generateSubLetters = (subLetters) => (
  <div>
    <ul className='letter-recipients'>
      {subLetters.map((letter) =>
        <li key={letter.id + letter.first_name}>
          {`${letter.first_name} ${letter.last_name}`}
        </li>
      )}
    </ul>
    <ul className='letter-list'>
    {subLetters.map((letter, i) => (
      <li key={i}>
        <StandingOrderLetter letter={letter}/>
      </li>
    ))}
    </ul>
  </div>
)


const mapStateToProps = (state) => {
  return { letters: state.letters }
}

export default connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post })(Letters)
