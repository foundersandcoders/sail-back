import React from 'react'

import LetterHeader from './letter_header.js'
import LetterAddresses from './letter_addresses.js'
import LetterBody from './letter_body.js'
import LetterFooter from './letter_footer.js'

export default ({ letter }) =>
  <div className='main-container letter-page'>
    <LetterHeader />
    <LetterAddresses address={letter.address} />
    <LetterBody letter={letter} />
  </div>
