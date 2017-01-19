import React from 'react'

export default ({ list_by_gift_aid_status }) =>
  <div className='member-analysis-form-container'>
    <h2>Select Gift Aid Status</h2>
    <form className='member-analysis-form' onSubmit={e => {
      e.preventDefault()
      list_by_gift_aid_status(e.target[0].value)
    }}
    >
      <select className='member-analysis-dropdown'>
        <option value='true'>Signed</option>
        <option value='false'>Not Signed</option>
        <option value='null'>Unknown</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>
