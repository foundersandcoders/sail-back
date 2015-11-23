'use strict'

var React = require('react')
var request = require('xhr')
var MemberFields = require('../components/member_fields')
var Navigation = require('../../shared/navigation.js')
var Spinner = require('../../shared/spinner.js')

var personal_ids = ['title', 'initials', 'first_name','last_name',
        'primary_email', 'secondary_email', 'news_type',
        'email_bounced', 'activation_status']

var address_ids = ['address1', 'address2', 'address3', 'address4', 'county',
       'postcode', 'deliverer', 'home_phone', 'work_phone',
       'mobile_phone']

var membership_ids = ['date_joined', 'membership_type', 'life_payment_date',
       'date_type_changed', 'date_gift_aid_signed',
       'date_gift_aid_cancelled', 'standing_order', 'notes',
       'registered', 'due_date']

var all_ids = personal_ids.concat(membership_ids).concat(address_ids)

var NewMember = React.createClass({
  getInitialState: function () {return {} },
  onChange: function (e) {
    var state = {}
    state[e.target.id] = e.target.value
    this.setState(state)
  },
  onSave: function (e) {

    e.preventDefault()
    this.setState({ submitting: true });

    request({
      method: 'POST',
      uri: '/addmember',
      json: this.state,
    }, function (err, res, body) {
      console.log(err,res, body)
      this.setState({ submitting: false, submitted: true, memberNum: body.id })
      //if (!err) window.location.hash = ''
    }.bind(this))
  },
  render: function () {
    return (
  <div>
      <Navigation />
      <div className='new-member-container'>
  <h1>New Member Form</h1>
  <form onSubmit={this.onSave}>
      <MemberFields
          ids={personal_ids}
          mode='edit'
          member={this.state}
          onChange={this.onChange} />
      <MemberFields
          ids={address_ids}
          mode='edit'
          member={this.state}
          onChange={this.onChange}/>
      <MemberFields
          ids={membership_ids}
          mode='edit'
          member={this.state}
          onChange={this.onChange} />

  <input type='submit' value='Submit 'id='save-button' />
  { this.state.submitting ? <Spinner /> : '' }
  { this.state.submitted  ?
      <div id='member-num'> Member ID is: { this.state.memberNum } </div> :
      '' }
  </form>
  </div>
  </div>
    )
  }
})

module.exports = NewMember
