'use strict'

var React = require('react')
var MemberFields = require('./member_fields')
var request = require('xhr')
var nullply = require('app/nullply')

var Field = require('./field.js')
var Dropdown = require('./common/dropdown')

var deletion_ids = ['deletion_reason', 'deletion_date']

var personal_ids = ['id', 'title', 'initials', 'first_name',
    'last_name', 'primary_email', 'secondary_email']

var address_ids = ['address1', 'address2', 'address3', 'address4',
    'county', 'postcode', 'deliverer', 'home_phone', 'work_phone', 'mobile_phone']
var membership_ids = ['date_joined', 'membership_type', 'life_payment_date',
    'date_membership_type_changed', 'date_gift_aid_signed',
    'date_gift_aid_cancelled', 'standing_order', 'notes', 'registered',
    'due_date', 'news_type', 'email_bounced', 'activation_status']

function entry_maker (value, desc) {
  desc = desc || presentable_values(value)
  return { desc: desc, value: value }}

function presentable_values(value) {
  var capital_position = value.search(/[A-Z]/)
  return value[0].toUpperCase() + value.slice(1, capital_position) +
      (capital_position === -1 ? '' : ' ') + value.slice(capital_position)}

var deletion_reasons = [
  entry_maker('deletionReason'),
  [
    ['deceased'],
    ['notResponding', 'Did not respond to reminders'],
    ['duplicate'],
    ['dissatisfied', 'Expressed dissatisfaction'],
    ['mailReturn', 'Mail returned to us'],
    ['moved', 'Moved away'],
    ['notifiedTermination'],
    ['other']
  ].map(nullply(entry_maker))
]

var EditOptions = React.createClass({
  delete_or_undelete: function () {
    return this.props.status === 'deactivated' ?
        <div>
          <button className='button-two button-c m-l-15 red right'
              onClick={this.props.reactivate} >Reactivate</button>
        </div> :
        <div>
          <button id='edit-member-mode'
              className='button-two m-l-15 right w-100 red'
              onClick={this.props.deleteMem}>Delete</button>
          <Dropdown id='deletion-reason' className='right'
              default={ deletion_reasons[0] } options={ deletion_reasons[1] } />
        </div>
   },

  render: function () { return (
        <div className='stretch'>
          <button id='save-member' className='button-two m-l-15 right w-100'
              onClick={this.props.save}>Save</button>
          <button id='cancel' className='button-two m-l-15 right w-100'
              onClick={this.props.cancel}>Cancel</button>
          { this.delete_or_undelete() }
        </div>  ) } })

var EditToggle = React.createClass({
  render: function () { return (
          <button id='edit-member-mode'
              className='member-info-edit-button'
              onClick={this.props.changeMode}>Edit</button> )}})

var MemberInformation = React.createClass({
  getInitialState: function () { return {} },
  correct_buttons: function () {
    return this.props.mode === 'edit' ?
        <EditOptions save={this.props.save}
            changeMode={this.props.changeMode}
            deleteMem={this.props.deleteMember}
            status={this.props.member.activation_status}
            reactivate={this.props.reactivate}
            cancel={this.props.cancel} /> :
        <EditToggle changeMode={this.props.changeMode}/>
  },
  render: function () {
    return (
    <div>
      <div className='member-info-controls'>
        { this.correct_buttons() }
      </div>
      <div className='member-info-content'>
        <MemberFields
            ids={personal_ids}
            mode={this.props.mode}
            member={this.props.member}
            errors={this.props.errors}
            on_composition_end={this.props.on_composition_end}
            onChange={this.props.onChange} />
        <MemberFields
            ids={address_ids}
            mode={this.props.mode}
            member={this.props.member}
            errors={this.props.errors}
            on_composition_end={this.props.on_composition_end}
            onChange={this.props.onChange} />
        <MemberFields
            ids={membership_ids}
            mode={this.props.mode}
            member={this.props.member}
            errors={this.props.errors}
            on_composition_end={this.props.on_composition_end}
            onChange={this.props.onChange} />
        { this.props.member.activation_status === 'deactivated'
            ? <MemberFields
                  ids={deletion_ids}
                  mode={this.props.mode}
                  member={this.props.member}
                  on_composition_end={this.props.on_composition_end}
                  onChange={this.props.onChange} />
            : <div></div> }
      </div>
    </div> )}})

module.exports = MemberInformation
