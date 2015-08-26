'use strict'

var React = require('react')

var MemberEvents = require('../components/member_events.js')
var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../components/member_information.js')

var member = {
  id: 1234,
  first_name: 'Wil',
  last_name: 'Eritrea',
  news_type: 'Post',
  activation_status: 'deactivated',
  primary_email: 'wil@foch.org',
  secondary_email: 'wil2@foch.org',
  deletion_date: new Date(),
  deletion_reason: {
    description: 'I turned purple'
  },
  email_bounced: true,
  address1: '123 Fake Street',
  address2: 'Psychophysical Substrate',
  address3: 'Endoscopic Rectomy',
  county: 'Whisk Yortshore',
  postcode: '123 80e',
  home_phone: '12384',
  work_phone: '184391',
  mobile_phone: 'a9134',
  date_gift_aid_signed: new Date(),
  notes: 'I am green',
  standing_order: true,
  membership_type: 'life_double',
  date_joined: new Date()
}

var ViewMember = React.createClass({
  getInitialState: function () {
    return {
      mode: 'view'
    }
  },
  changeMode: function () {
    var changed_mode = (this.state.mode === 'edit') ? 'view' : 'edit'
    this.setState({mode: changed_mode})
  },
  render: function () {
    var member_id = this.props.params.id
    var m = JSON.stringify(member)
    return (
	<div>
	<div className='main-container' id='member-component'>
	<div className='inner-section-divider-medium'></div>
	<div className='section-label'>
	<h1 id='member-title'>{'Member info: ' + member_id}</h1>
	</div>
	<div className='inner-section-divider-medium'></div>
	<MemberInformation mode={this.state.mode} changeMode={this.changeMode} member={m}/>
	<div className='inner-section-divider-medium'></div>
	<MemberPayments mode={this.state.mode} />
	<div className='inner-section-divider-medium'></div>
	<MemberEvents mode={this.state.mode} />
	</div>
	</div>
    )
  }
})

module.exports = ViewMember
