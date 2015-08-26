'use strict'

var React = require('react')

var Field = React.createClass({
  render: function () {
    if (this.props.value) {

      return (
	  <p>
	  <span className='info'>{this.props.name}</span>
	  <span id={'view-member-' + this.props.id}>{this.props.value}</span>
	  </p>

      )
    } else {
      return (<div></div>)
    }
  }
})

module.exports = Field
