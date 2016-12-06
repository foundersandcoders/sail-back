import React from 'react'

export default ({ recipients, show_letter, clickable }) =>
  <div className='letter-recipients'>
    <h2>Letter Recipients</h2>
    <ul>
      {recipients.map((recipient, i) =>
          <li
            onClick={clickable ? () => show_letter(i) : null}
            className={clickable ? 'clickable-letter-recipient' : ''}
            key={recipient.first_name + i}
          >
          {`${recipient.first_name || recipient.title} ${recipient.last_name}`}
        </li>
      )}
    </ul>
  </div>
