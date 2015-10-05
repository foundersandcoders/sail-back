'use strict'

var React = require('react')

var Field = React.createClass({
  onChange: function (e) {
    this.props.onChange(e)
  },
  render: function () {
    if (this.props.value && this.props.mode !== 'edit') {
      return (
        <p>
        <span className='info'>{this.props.name}</span>
        <span id={'view-member-' + this.props.id}>{this.props.value}</span>
        </p>
      )
    } else if (this.props.mode === 'edit') {
      return (
        <div>
          <span className='info'>{this.props.name}</span>
          <input type={ this.props.name.match(/[dD]ate/) ? 'date' : 'text' }
            value={this.props.value}
            id={this.props.id}
            onChange={this.props.onChange} />
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
})

module.exports = Field
