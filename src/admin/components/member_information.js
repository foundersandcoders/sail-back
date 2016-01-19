'use strict'

var React = require('react')
var { DeletionFields } = require('./member_fields/specific.js')
var PersonalFields = require('./member_fields/personal_fields_2.js')
var request = require('xhr')
var nullply = require('app/nullply')
var curry = require('curry')

var Field = require('./field.js')
var Dropdown = require('./common/dropdown.js')

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
          <Dropdown
              id='deletion-reason'
              className='right'
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
              onClick={this.props.toggle_mode}>Edit</button> )}})

var MemberInformation = React.createClass({
  displayName: 'Member Information',
  getInitialState: function () { return {} },
  correct_buttons: function () {
    return this.props.mode === 'edit'
        ? <EditOptions save={this.props.save}
            toggle_mode={this.props.toggle_member_click}
            deleteMem={this.props.deactivate_member_click}
            status={this.props.member.activation_status}
            reactivate={this.props.reactivate_member_click}
            cancel={this.props.cancel_member_click} />
        : <EditToggle toggle_mode={this.props.edit_member_click}/>
  },
  render: function () {
    var fields_with_props = render_with_props(this.props)
    return (
    <form>
      <div className='member-info-controls'>
        { this.correct_buttons() }
      </div>
        <PersonalFields
          className='member-info-content'
          mode={this.props.mode}
          onSubmit={(fields, dispatch) => false}
        />
        { this.props.member.activation_status === 'deactivated'
            ? render_with_props(DeletionFields)
            : <div></div> }
    </form> )}})

var render_with_props = curry((props, Fields, i) =>
    <Fields
        {...props}
        key={i} /> )


module.exports = MemberInformation
