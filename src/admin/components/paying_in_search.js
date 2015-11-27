'use strict'

var React = require('react')

module.exports = props =>
  <div>
    <form onSubmit={props.submit_handler}>
      {props.inputs.map((name, i) =>
        <div key={i}>
          <span>Enter desired {name}: </span>
          <input name={name} />
        </div>)}
      <input type='submit' />
    </form>
  </div>

