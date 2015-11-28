'use strict'

var React = require('react')
var Field = require('./field.js')
var to_title_case = require('app/to_title_case')

module.exports = props =>
  <form onSubmit={props.submit_handler}>
    {props.inputs.map((name, i) =>
      <Field
          {...props}
          key={i}
          id={name}
          className='paying-in-search'
          name={to_title_case(name)}
          mode='edit' />
    )}
    <input type='submit' />
  </form>

