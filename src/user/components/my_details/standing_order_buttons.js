import React from 'react'

export default ({ confirmation, which_text, which_delete, reset }) =>
  <div>
    <h3>Subscription is paid by standing order</h3>
    <button onClick={which_delete()} className={confirmation ? 'green' : ''}>
      {which_text()}
    </button>
    {confirmation && <button onClick={reset} className='red'>Keep Standing Order</button>}
  </div>
