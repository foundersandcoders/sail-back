import React from 'react'

export default ({ list_by_email_bounced }) =>
  <div className='member-analysis-form-container'>
    <h2>Select Email Bounced Status</h2>
    <form className='member-analysis-form' onSubmit={e => {
      e.preventDefault()
      list_by_email_bounced(e.target[0].value)
    }}
    >
      <select className='member-analysis-dropdown'>
        <option value='true'>True</option>
        <option value='false'>False</option>
        <option value='null'>Unknown</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>
