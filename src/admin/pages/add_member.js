'use strict'

var React = require('react')
var request = require('xhr')
var make_member_fields = require('../components/common/make_member_fields.js')
var Navigation = require('../../shared/navigation.js')

var personal_ids = ['id', 'title', 'initials', 'first_name','last_name',
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

var PersonalInputs = make_member_fields(personal_ids, 'Personal information')
var AddressInputs = make_member_fields(address_ids, 'Address information')
var MembershipInputs = make_member_fields(membership_ids, 'Membership information')

var NewMember = React.createClass({
  getInitialState: function () {return {} },
  onChange: function (e) {
    var state = {}
    state[e.target.id] = e.target.value
    this.setState(state)
  },
  onSave: function (e) {

    e.preventDefault()

    request({
      method: 'POST',
      uri: '/addmember',
      json: this.state,
      change: this.onChange
    }, function (err, res, body) {
      console.log(err, res, body)
    })
  },
  render: function () {
    return (
	<div>
	    <Navigation />
	    <div className='new-member-container'>
	<h1>New Member Form</h1>
	<form onSubmit={this.onSave}>
	    <PersonalInputs mode='edit' member={this.state} onChange={this.onChange} />
	    <AddressInputs mode='edit' member={this.state} onChange={this.onChange}/>
	    <MembershipInputs mode='edit' member={this.state} onChange={this.onChange} />
	<input type='submit' value='Submit 'id='save-button' />
	</form>
	</div>
	</div>
    )
  }
})

module.exports = NewMember
