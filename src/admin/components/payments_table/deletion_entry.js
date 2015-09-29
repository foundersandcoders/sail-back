var request = require('xhr')
var React = require('react')

module.exports = React.createClass({
  delete: function () {
    this.props.remove_payment(this.props.id) },

   render: function () {
    return (<button onClick={this.delete}>x</button>)}})

