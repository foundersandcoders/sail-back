import React from 'react'

export default ({ confirmation, which_text, which_delete, reset }) =>
  <div>
    <p><b>Would you like to revoke your Gift Aid declaration?</b></p>
    <button onClick={which_delete()} className={confirmation ? 'red' : ''}>
      {which_text()}
    </button>
    {confirmation && <button onClick={reset} className='green'>Keep Gift Aid</button>}
  </div>
