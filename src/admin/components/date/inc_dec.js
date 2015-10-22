var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <button onClick={this.props.increment} className='inc-dec'> + </button>
        <button onClick={this.props.decrement} className='inc-dec'> - </button>
      </div>)} })
