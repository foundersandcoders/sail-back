'use strict'

var React = require('react')
var r = require('ramda') /* require utils.get when it's moved */
var make_member_fields = require('./common/make_member_fields.js')
var request = require('xhr')

var Field = require('./field.js')

var DeletionFields = React.createClass({
  render: function () {
    if (this.props.status === 'deactivated') {
      return (
  <div>
    <Field name='Deletion date: ' value={this.props.date} id='deletion_date'/>
    <Field name='Deletion Reason: ' value={this.props.reason.description} id='deletion_reason' />
  </div> )
    } else {
    return (<div></div>) }}})

var personal_ids = ['id', 'title', 'initials', 'first_name',
    'last_name', 'primary_email', 'secondary_email',
    'news_type', 'email_bounced', 'activation_status']

var PersonalInformation = make_member_fields(personal_ids, 'Personal info')

var address_ids = ['address1', 'address2', 'address3', 'address4',
'county', 'postcode', 'deliverer', 'home_phone', 'work_phone', 'mobile_phone']
var AddressInformation = make_member_fields(address_ids, 'Address info')

var membership_ids = ['date_joined', 'membership_type', 'life_payment_date',
'date_type_changed', 'date_gift_aid_signed', 'date_gift_aid_cancelled',
'standing_order', 'notes', 'registered', 'due_date']
var MembershipInformation = make_member_fields(membership_ids, 'Membership info')

var MemberInformation = React.createClass({
  getInitialState: function () { return {} },
  change: function (e) {
    this.props.onChange(e)
  },
  changeMode: function () {
    this.props.changeMode() },
  save: function () {
    this.props.save()
  },
  render: function () {
    return (
    <div className='member-info-controls'>
    <DeletionFields date={this.props.member.deletion_date}
        status={this.props.member.activation_status}
        reason={this.props.member.deletion_reason} />
    <button id='edit-member-mode' className='button-two m-l-15 right w-100'
        onClick={this.changeMode}>Edit</button>
    <button id='save-member' onClick={this.save}>Save</button>
    <div className='member-info-content'>
    <PersonalInformation mode={this.props.mode} member={this.props.member}
        onChange={this.change} />
    <AddressInformation mode={this.props.mode} member={this.props.member}
        onChange={this.change} />
    <MembershipInformation mode={this.props.mode} member={this.props.member}
        onChange={this.change} />
    </div>
    </div> )}})

module.exports = MemberInformation
