import React from 'react'

export default ({ list_by_membership }) =>
  <div className='member-analysis-form-container'>
    <h2>Select Membership</h2>
    <form className='member-analysis-form' onSubmit={e => {
      e.preventDefault()
      list_by_membership(e.target[0].value)
    }}
    >
      <select className='member-analysis-dropdown'>
        <option value='annual-single'>Annual Single</option>
        <option value='annual-double'>Annual Double</option>
        <option value='annual-family'>Annual Family</option>
        <option value='annual-corporate'>Annual Corporate</option>
        <option value='annual-group'>Annual Group</option>
        <option value='life-single'>Life Single</option>
        <option value='life-double'>Life Double</option>
        <option value='accounts'>Accounts</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>
