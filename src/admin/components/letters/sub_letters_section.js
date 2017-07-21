import React from 'react'
import { isEmpty } from 'ramda'

import LetterRecipients from './letter_recipients.js'
import StandingOrderLetter from './standing_order_letter.js'

export default ({ toggle_recipient_list, shown, ...props }) => {
  return (
    <div>
      <button
        className='letters-toggle'
        onClick={toggle_recipient_list}>
        {shown ? 'Hide Recipients' : 'Show Recipients'}
      </button>
      {shown && LetterView(props)}
    </div>
  )
}

const LetterView = (props) =>
  isEmpty(props.sub_letters)
    ? <h1>There are no reminder letters to print out.</h1>
    : SubLetters(props)

const SubLetters = ({ sub_letters, shown_letter_index, ...props }) =>
  <div>
    <p className='sub-letters-header'>
      {'Click on a member\'s name to view the letter that they will receive. Print preview to see all of the letters.'}
    </p>
    <LetterRecipients clickable recipients={sub_letters} {...props}/>
    <div className='letter-list-container'>
      <ul className='letter-list'>
      {sorter(shown_letter_index, sub_letters).map((letter, i) => (
        <div>
          <li key={i}>
            <StandingOrderLetter letter={letter}/>
          </li>
          <p className='page-break'>...</p>
        </div>
      ))}
      </ul>
    </div>
  </div>

const sorter = (i, array) => [array[i]].concat(array.slice(0, i), array.slice(i+1))
