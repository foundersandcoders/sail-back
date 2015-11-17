'use strict'

var React = require('react')

module.exports = React.createClass({
  propTypes: {
    submit_handler: React.PropTypes.func,
  },
  render: function () {
    return (
      <div>
        <span>Enter desired reference: </span>
        <form onSubmit={this.props.submit_handler}>
          <input />
          <input type='submit' />
        </form>
      </div>) } })
