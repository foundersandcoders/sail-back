import React from 'react'

export default ({ confirmation, which_text, which_delete, reset }) =>
  <div>
    <h3>You have made a Gift Aid Declaration</h3>
    <p>
      <i>
        If you no longer pay an amount of UK Income Tax and/or Capital Gains Tax
        at least equal to your gifts this year to the Friends of Chichester Harbour
        plus your gifts this year to other charities for whom you have made a Gift
        Aid Declaration then you should cancel your Gift Aid Declaration since you
        become responsible for paying any difference.
      </i>
    </p>
    <button onClick={which_delete()} className={confirmation ? 'green' : ''}>
      {which_text()}
    </button>
    {confirmation && <button onClick={reset} className='red'>Keep Gift Aid</button>}
  </div>
