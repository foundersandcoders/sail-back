'use strict'

var React = require('react')
var r = require('ramda') /* require utils.get when it's moved */
var make_member_fields = require('./common/make_member_fields.js')
var request = require('xhr')
var nullply = require('../../utils/nullply')

var Field = require('./field.js')
var Dropdown = require('./common/dropdown')

var deletion_ids = ['deletion_reason', 'deletion_date']
var DeletionFields = make_member_fields(deletion_ids, 'Deletion reason')

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

function entry_maker (value, desc) {
  desc = desc || presentable_values(value)
  return { desc: desc, value: value }}

function presentable_values(value) {
  var capital_position = value.search(/[A-Z]/)
  return value[0].toUpperCase() + value.slice(1, capital_position) +
      (capital_position === -1 ? '' : ' ') + value.slice(capital_position)}

var deletion_reasons = [entry_maker('deletionReason'),
    [['deceased'], ['notResponding', 'Did not respond to reminders'], ['duplicate'],
    ['dissatisfied', 'Expressed dissatisfaction'], ['mailReturn', 'Mail returned to us'],
    ['moved', 'Moved away'], ['notifiedTermination'], ['other'] ].map(nullply(entry_maker))]

var EditOptions = React.createClass({
  delete_or_undelete: function () {
    return this.props.status === 'deactivated' ?
        <div>
          <button className='button-two button-c m-l-15 red' onClick={this.props.reactivate} >Reactivate</button>
        </div> :
        <div>
          <button id='edit-member-mode' className='button-two m-l-15 right w-100 red'
              onClick={this.props.deleteMem}>Delete</button>
          <Dropdown id='deletion-reason' className='w-200' default={ deletion_reasons[0] } options={ deletion_reasons[1] } />
        </div>
   },

  render: function () { return (
        <div>
          <button id='save-member' className='button-two m-l-15 right w-100'
              onClick={this.props.save}>Save</button>
          <button id='cancel' className='button-two m-l-15 right w-100'
              onClick={this.props.changeMode}>Cancel</button>
          { this.delete_or_undelete() }
        </div>  )}})

var EditToggle = React.createClass({
  render: function () { return (
          <button id='edit-member-mode' className='button-two m-l-15 right w-100'
              onClick={this.props.changeMode}>Edit</button> )}})

var MemberInformation = React.createClass({
  getInitialState: function () { return {} },
  change: function (e) {
    this.props.onChange(e)
  },
  correct_buttons: function () {
    return this.props.mode === 'edit' ?
        <EditOptions save={this.props.save} changeMode={this.props.changeMode}
            deleteMem={this.props.deleteMember} status={this.props.member.activation_status}
            reactivate={this.props.reactivate} /> :
        <EditToggle changeMode={this.props.changeMode} />
  },
  render: function () {
    return (
    <div>
      <div className='member-info-controls'>
        { this.correct_buttons() }
      </div>
      <div className='member-info-content'>
        <PersonalInformation mode={this.props.mode} member={this.props.member}
            onChange={this.change} />
        <AddressInformation mode={this.props.mode} member={this.props.member}
            onChange={this.change} />
        <MembershipInformation mode={this.props.mode} member={this.props.member}
            onChange={this.change} />
        { this.props.member.activation_status === 'deactivated' ? <DeletionFields mode={this.props.mode} member={this.props.member}
            onChange={this.change} /> : <div></div> }
      </div>
    </div> )}})

module.exports = MemberInformation
