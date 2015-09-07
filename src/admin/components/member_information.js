'use strict'

var React = require('react')
var r = require('ramda') /* require utils.get when it's moved */

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

function label_from_id (id) {
  return id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': ' }

var personal_ids = ['id', 'title', 'initials', 'first_name',
    'last_name', 'primary_email', 'secondary_email',
    'news_type', 'email_bounced', 'activation_status']

var PersonalInformation = make_field_column(personal_ids, 'Personal info')

/* TODO: allow different input types for different fields
 * TODO: don't render deletion reasons for each column, put at top of */
function make_field_column (ids, column_title) {

  return React.createClass({
    get_member_prop: function (prop) {
      return (r.prop(prop, this.props.member) || '').toString() },

    fields: function () {
      var make_field_props = function (name, id) {
        return { name: name, value: this.get_member_prop(id), id: id } }.bind(this)

      function make_props_from_id (id) {
        return make_field_props(label_from_id(id), id) }

      return ids.map(make_props_from_id) },

    render: function () {
      var field_components = this.fields().map(function(field, i) {
          return <Field mode={this.props.mode} name={field.name}
              value={field.value} id={field.id} key={i} />}.bind(this))

      return (
        <div className='col-1'>
          <h2>{column_title}</h2>
          {field_components}
        </div>
      )
    }
  })
}

var address_ids = ['address1', 'address2', 'address3', 'address4',
    'county', 'postcode', 'deliverer', 'home_phone', 'work_phone', 'mobile_phone']

var AddressInformation = make_field_column(address_ids, 'Address info')

var membership_ids = ['date_joined', 'membership_type', 'life_payment_date',
    'date_type_changed', 'date_gift_aid_signed', 'date_gift_aid_cancelled',
    'standing_order', 'notes', 'registered', 'due_date']
var MembershipInformation = make_field_column(membership_ids, 'Membership info')

var MemberInformation = React.createClass({
  changeMode: function () {
    this.props.changeMode()
  },
  render: function () {
    return (
      <div className='member-info-controls'>
        <DeletionFields date={this.props.member.deletion_date}
            status={this.props.member.activation_status}
            reason={this.props.member.deletion_reason} />
        <button id='edit-member-mode' className='button-two m-l-15 right w-100'
            onClick={this.changeMode}>Edit</button>
        <div className='member-info-content'>
          <PersonalInformation mode={this.props.mode} member={this.props.member} />
          <AddressInformation mode={this.props.mode} member={this.props.member} />
          <MembershipInformation mode={this.props.mode} member={this.props.member} />
        </div>
      </div>
    )
  }
})

module.exports = MemberInformation
