import React from 'react'

import LetterHeader from './letter_header.js'
import LetterAddresses from './letter_addresses.js'
import LetterBody from './letter_body.js'

export default ({ letters }) => {
  if (!letters) { return <p>No Member Chosen</p> }
  return (
    <div className='main-container letter-page'>
      <LetterHeader />
      <LetterAddresses letters={letters} />
      <LetterBody letters={letters} />
    </div>
  )
}
