import React from 'react'

export default ({ letters }) => (
  <div className='letter-recipients'>
    <h2>Letter Recipients</h2>
    <ul>
      {letters.map((letter) =>
        <li key={letter.id + letter.first_name}>
          {`${letter.first_name} ${letter.last_name}`}
        </li>
      )}
    </ul>
  </div>
)
