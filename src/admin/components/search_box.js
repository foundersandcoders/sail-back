'use strict'

var React = require('react')

var SearchBox = React.createClass({

  render: function () {
    return (
	<div className='search-component'>
	<div className='search-container'>
	<select id='member-status' defaultValue='activated'>
	<option value='activated'>Active</option>
	<option value='deactivated'>Deleted</option>
	</select>
	<input className='input-member' id='search-field-id' placeholder='Number' />
	<input className='input-member' id='search-field-email' placeholder='Email' />
	<input className='input-member' id='search-field-lastName' placeholder='Surname' />
	<button className='button-two member' id='search-button'>Search</button>
      </div>
      </div>
    )
  }
})

module.exports = SearchBox
