var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return { confirmation: false }
  },

  delete: function () {
    const update_fn = this.props.type === 'payment'
      ? () => this.props.remove_payment(this.props.id)
      : this.props.delete
    update_fn()
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
    const button_text =
      { payment: 'X'
      , reset: 'Reset'
      , revoke: 'Revoke Gift Aid'
      }
    return this.state.confirmation ? 'Confirm' : button_text[this.props.type]
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
