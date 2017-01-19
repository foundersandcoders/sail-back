import React from 'react'

export default ({ list_by_deliverer, member_analysis: { deliverers } }) =>
  <div className='member-analysis-form-container'>
    <h2>Search for Deliverer</h2>
    <form className='member-analysis-form' onSubmit={e => {
      const deliverer = e.target[0].value === 'No Deliverer' ? 'null' : e.target[0].value
      e.preventDefault()
      list_by_deliverer(deliverer)
    }}
    >
      <select className='member-analysis-dropdown'>
        {deliverers.map((deliverer, i) =>
          <option key={i}>{deliverer}</option>)
        }
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>
