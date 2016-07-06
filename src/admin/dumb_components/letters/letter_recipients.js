import React from 'react'

export default ({ letters }) =>
  <div className='letter-recipients'>
    <h2>Letter Recipients</h2>
    <ul>
      {letters.map((letter, i) =>
        <li key={letter.first_name + i}>
          {`${letter.first_name || letter.title} ${letter.last_name}`}
        </li>
      )}
    </ul>
  </div>
