'use strict'

var React = require('react')

var Field = require('./field.js')

var DeletionFields = React.createClass({
  render: function () {
    if (this.props.status === 'deactivated') {
      return (
	  <div>
	  <Field name='Deletion date: ' value={this.props.date} id='deletion_date'/>
	  <Field name='Deletion Reason: ' value={this.props.reason.description} id='deletion_reason' />
	  </div>
      )
    } else {
      return (<div></div>)
    }
  }
})

var PersonalInformation = React.createClass({
  getFullName: function () {
    return 'William Fisher'
  },
  render: function () {
    var member = JSON.parse(this.props.member)
    return (
	<div className='col-1'>
	<h2>Personal info</h2>
	<Field name='Name: ' value={this.getFullName()} id='full_name'/>
	<Field name='ID: ' value={member.id.toString()} id='id' />
	<Field name='Primary email: ' value={member.primary_email} id='primary_email' />
	<Field name='Secondary email: ' value={member.secondary_email} id='secondary_email' />
	<Field name='Bounced email: ' value={member.email_bounced} id='bounced_email' />
	<Field name='News: ' value={member.news_type} id='news_type' />
	<Field name='Status: ' value={member.activation_status} id='activation_status' />
	<DeletionFields date={member.deletion_date} status={member.activation_status} reason={member.deletion_reason} />
      </div>
    )
  }
})

var AddressInformation = React.createClass({
  render: function () {
    var member = JSON.parse(this.props.member)
    return (
	<div className='col-2'>
	<h2>Address info</h2>
	<Field name='Address line: ' value={member.address1} id='address1' />
	<Field name='Address line: ' value={member.address2} id='address2' />
	<Field name='Address line: ' value={member.address3} id='address3' />
	<Field name='Address line: ' value={member.address4} id='address4' />
	<Field name='County: ' value={member.county} id='county' />
	<Field name='Postcode: ' value={member.postcode} id='postcode' />
	<Field name='Deliverer: ' value={member.deliverer} id='deliverer'/>
	<Field name='Home phone: ' value={member.home_phone} id='home_phone' />
	<Field name='Work phone: ' value={member.work_phone} id='work_phone' />
	<Field name='Mobile phone: ' value={member.mobile_phone} id='mobile_phone' />
      </div>
    )
  }
})

var MembershipInformation = React.createClass({
  render: function () {
    var member = JSON.parse(this.props.member)
    return (
	<div className='col-3'>
	<h2>Membership info</h2>
	<Field name='Date joined: ' value={member.date_joined} id='date_joined' />
	<Field name='Membership type: ' value={member.membership_type} id='membership_type' />
	<Field name='Life payment date: ' value={member.life_payment_date} id='life_payment_date' />
	<Field name='Membership date changed: ' value={member.date_type_changed} id='date_type_changed' />
	<Field name='GAD Signed: ' value={member.date_gift_aid_signed} id='gad_signed' />
	<Field name='GAD Cancelled: ' value={member.date_gift_aid_cancelled} id='date_gift_aid_cancelled' />
	<Field name='Standing order: ' value={member.standing_order} id='standing_order' />
	<Field name='Notes: ' value={member.notes} id='notes'/>
	<Field name='Status online: ' value={member.registered} id='registered' />
	<Field name='Due date: ' value={member.due_date} id='due_date' />
      </div>
    )
  }
})

var MemberInformation = React.createClass({
  changeMode: function () {
    this.props.changeMode()
  },
  render: function () {
    return (
	<div className='member-info-controls'>
	<button id='edit-member-mode' className='button-two m-l-15 right w-100' onClick={this.changeMode}>Edit</button>
	<div className='member-info-content'>
	<PersonalInformation member={this.props.member} />
	<AddressInformation member={this.props.member} />
	<MembershipInformation member={this.props.member} />
      </div>
      </div>
    )
  }
})

module.exports = MemberInformation
