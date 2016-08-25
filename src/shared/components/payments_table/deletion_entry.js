var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return { confirmation: false }
  },

  delete: function () {
    const update_fn = this.props.payment
      ? () => this.props.remove_payment(this.props.id)
      : () => this.props.update_member_user(
        { gift_aid_cancelled: true
        , date_gift_aid_cancelled: new Date().toISOString()
        , gift_aid_signed: false
        , date_gift_aid_signed: null
        }
      )
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
    return this.state.confirmation ? 'Confirm' : `${this.props.payment ? 'X' : 'Revoke Gift Aid' }`
  },

  render: function () {
    const props =
      { confirmation: this.state.confirmation
      , which_text: this.which_text
      , which_delete: this.which_delete
      , reset: this.reset
      }
    return this.props.payment
      ? payment_button(props)
      : gift_aid_buttons(props)
  }
})

const payment_button = ({ confirmation, which_text, which_delete }) => {
  return (
    <button
      className={'small-button ' + (confirmation ? 'red' : '') }
      onClick={which_delete()}
    >
      {which_text()}
    </button>
  )
}

const gift_aid_buttons = ({ confirmation, which_text, which_delete, reset }) => {
  return (
    <div>
      <p><b>Would you like to revoke your Gift Aid declaration?</b></p>
      <button onClick={which_delete()} className={confirmation ? 'red' : ''}>
        {which_text()}
      </button>
      {confirmation && <button onClick={reset} className='green' >Keep Gift Aid</button>}
    </div>
  )
}
