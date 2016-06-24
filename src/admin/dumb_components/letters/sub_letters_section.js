import React from 'react'
import LetterRecipients from './letter_recipients.js'
import StandingOrderLetter from './standing_order_letter.js'

export default ({ letters, active_view }) => (
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
