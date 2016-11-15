import React from 'react'

export default ({ confirmation, which_text, which_delete, reset }) =>
  <div>
    <h3>Newsletters are hand delivered</h3>
    <p>
      Currently Newsletters are posted (or hand delivered) to you three times a year –
      and it’s also available for you to read Online on the Friends website. If you opted
      to read it online it would help us reduce postage and printing costs. If you would
      like to take that option please select Online instead of Post.
    </p>
    <button onClick={which_delete()} className={confirmation ? 'green' : ''}>
      {which_text()}
    </button>
    {confirmation && <button onClick={reset} className='red'>Cancel</button>}
  </div>
