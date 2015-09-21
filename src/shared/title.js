'use strict'

var React = require('react')

var Title = React.createClass({
  render: function () {
    return (
      <h2>{this.props.opts.title}</h2>  
    ) 
  }
})

module.exports = Title
