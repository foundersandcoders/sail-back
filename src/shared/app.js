'use strict'

var React = require('react')

var App = React.createClass({

  render: function () {
    var add_details = this.props.add_details || id
    return (
      <div>
        { React.Children.map(this.props.children, add_details) }
      </div>
    )
  }
})

function id (arg) { return arg }

module.exports = App
