import React from 'react'
import LetterRecipients from './letter_recipients.js'
import StandingOrderLetter from './standing_order_letter.js'

export default ({ toggle_recipient_list, shown, ...other }) => {
  return (
    <div>
      <button
        className='letters-toggle'
        onClick={toggle_recipient_list}>
        {shown ? 'Hide Letters' : 'Show Letters'}
      </button>
      {shown && <SubLetters {...other} />}
    </div>
  )
}

const SubLetters = ({ sub_letters, shown_letter_index, ...other }) =>
  <div>
    <p className='sub-letters-header'>
      {'The following sample letter will be printed out for these recipients.'} <br/>
      {'Click on a member\'s name to view the letter that they will receive. Print preview to see all of the letters.'}
    </p>
    <LetterRecipients clickable recipients={sub_letters} {...other}/>
    <div className='letter-list-container'>
      <ul className='letter-list'>
      {sorter(shown_letter_index, sub_letters).map((letter, i) => (
        <li key={i}>
          <StandingOrderLetter letter={letter}/>
        </li>
      ))}
      </ul>
    </div>
  </div>

const sorter = (i, array) => [array[i]].concat(array.slice(0, i), array.slice(i+1))
