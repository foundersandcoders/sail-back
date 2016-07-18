import React from 'react'
import LetterRecipients from './letter_recipients.js'
import StandingOrderLetter from './standing_order_letter.js'

export default ({ letters, toggle_recipient_list, ...other }) => {
  const reminders = letters.sub_reminders
  return (
    <div>
      <button
        className='letters-toggle'
        onClick={() => toggle_recipient_list('sub_reminders', !reminders.shown)}>
        {reminders.shown ? 'Hide Letters' : 'Show Letters'}
      </button>
      {reminders.shown && <SubLetters reminders={reminders} {...other} />}
    </div>
  )
}

const SubLetters = ({ reminders, ...other }) => (
  <div>
    <p className='sub-letters-header'>
      {'The following sample letter will be printed out for these recipients.'} <br/>
      {'Click on a member\'s name to view the letter that they will receive. Print preview to see all of the letters.'}
    </p>
    <LetterRecipients clickable letters={reminders.reminderLetters} {...other}/>
    <div className='letter-list-container'>
      <ul className='letter-list'>
      {sorter(reminders.shown_letter_index, reminders.reminderLetters).map((letter, i) => (
        <li key={i}>
          <StandingOrderLetter letter={letter}/>
        </li>
      ))}
      </ul>
    </div>
  </div>
)

const sorter = (i, array) => [array[i]].concat(array.slice(0, i), array.slice(i+1))
