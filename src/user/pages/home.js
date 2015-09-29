'use strict'

var React = require('react')

var Navigation = require('../../shared/navigation.js')

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation user='User'/>
        <h1>Welcome User!</h1>
      </div>)}})
