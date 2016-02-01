'use strict'

var React = require('react')
var Field = require('./field.js')
var to_title_case = require('app/to_title_case')

module.exports = props =>
  <form onSubmit={props.submit_handler} className='search-options flex'>
    {props.inputs.map((name) =>
      <Field
        {...props}
        options={props.options[name]}
        key={name}
        id={name}
        className='paying-in-search'
        name={to_title_case(name)}
        mode='edit'
      />
    )}
    <input type='submit' />
  </form>

