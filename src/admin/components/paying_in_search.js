'use strict'

var React = require('react')

module.exports = React.createClass({
  propTypes: {
    submit_handler: React.PropTypes.func,
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.props.submit_handler}>
          {this.props.inputs.map((name, i) =>
            <div key={i}>
              <span>Enter desired {name}: </span>
              <input
                  name={name} />
            </div> ) }
          <input type='submit' />
        </form>
      </div>) } })
