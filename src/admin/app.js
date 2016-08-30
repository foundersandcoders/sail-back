'use strict'

var React = require('react')
var Navigation = require('./navigation.js')

var App = React.createClass({

  render: function () {
    var add_details = this.props.add_details || id
    return (
      <div>
        <Navigation user={this.props.user}/>
        { React.Children.map(this.props.children, add_details) }
      </div>
    )
  }
})

function id (arg) { return arg }

module.exports = App
