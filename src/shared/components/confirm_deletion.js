var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return { confirmation: false }
  },

  delete: function () {
    this.props.delete(this.props.id)
    this.setState({ confirmation: false })
  },

  attempt_delete: function () {
    this.setState({ confirmation: true })
  },

  reset: function () {
    this.setState({ confirmation: false })
  },

  which_delete: function () {
    return this.state.confirmation ? this.delete : this.attempt_delete
  },

  which_text: function () {
    return this.state.confirmation ? 'Confirm' : this.props.text
  },

  render: function () {
    const props =
      { confirmation: this.state.confirmation
      , which_text: this.which_text
      , which_delete: this.which_delete
      , reset: this.reset
      }
    return this.props.buttons(props)
  }
})
