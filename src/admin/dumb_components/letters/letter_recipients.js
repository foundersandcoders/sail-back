import React from 'react'

export default ({ letters, show_letter, clickable }) =>
  <div className='letter-recipients'>
    <h2>Letter Recipients</h2>
    <ul>
      {letters.map((letter, i) =>
          <li
            onClick={clickable ? () => show_letter(i) : null}
            className={clickable ? 'clickable-letter-recipient' : ''}
            key={letter.first_name + i}
          >
          {`${letter.first_name || letter.title} ${letter.last_name}`}
        </li>
      )}
    </ul>
  </div>
