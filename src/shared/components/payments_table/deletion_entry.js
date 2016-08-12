var request = require('xhr')
var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return { confirmation: false } },

  delete: function () {
    this.props.remove_payment(this.props.id)
    this.setState({ confirmation: false }) },

  attempt_delete: function () {
    this.setState({ confirmation: true }) },

  which_delete: function () {
    return this.state.confirmation ? this.delete : this.attempt_delete },

  which_text: function () {
    return this.state.confirmation ? 'Confirm' : 'X' },

   render: function () {
    return (<button
      className={'small-button ' + (this.state.confirmation ? 'red' : '') }
      onClick={this.which_delete()}>{this.which_text()}</button>)}})

