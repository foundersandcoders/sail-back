'use strict'

var React = require('react')
var Field = require('./field.js')
var to_title_case = require('app/to_title_case')

module.exports = (
  { submit_handler
  , inputs
  , options
  , ...props
  }
) =>
  <form onSubmit={submit_handler} className='search-options flex'>
    {inputs.map((name) =>
      <Field
        {...props}
        options={(options || [])[name]}
        key={name}
        id={name}
        className='paying-in-search'
        name={to_title_case(name)}
        mode='edit'
      />
    )}
    <input type='submit' />
  </form>

