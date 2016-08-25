import React from 'react'

export default class GiftAidButton extends React.Component {
  constructor (props) {
    super (props)
    this.state = { confirmation: false }
  }

  cancel () {
    this.props.update_member_user(
      { gift_aid_cancelled: true
      , date_gift_aid_cancelled: new Date().toISOString()
      , gift_aid_signed: false
      , date_gift_aid_signed: null
      }
    )
  }

  attempt_cancel () {
    this.setState({ confirmation: true })
  }

  reset () {
    this.setState({ confirmation: false })
  }

  which_cancel () {
    return this.state.confirmation ? this.cancel.bind(this) : this.attempt_cancel.bind(this)
  }

  which_text () {
    return this.state.confirmation ? 'Confirm' : 'Cancel Gift Aid'
  }

  render () {
    return (
      <div>
        <p><b>Would you like to revoke your Gift Aid declaration?</b></p>
        <button onClick={this.which_cancel()} className={this.state.confirmation ? 'red' : ''}>
          {this.which_text()}
        </button>
        {this.state.confirmation && <button onClick={this.reset.bind(this)} className='green' >Keep Gift Aid</button>}
      </div>
    )
  }
}
