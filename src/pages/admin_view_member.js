'use strict'

var React = require('react')

var MemberEvents = require('../components/member_events.js')
var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../components/member_information.js')

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
    var member = this.props.member || require('../__MOCK_MEMBER__.js')
    var events = JSON.stringify(JSON.parse(member).events)
    return (
	<div>
	<div className='main-container' id='member-component'>
	<div className='inner-section-divider-medium'></div>
	<div className='section-label'>
	<h1 id='member-title'>{'Member info: ' + member_id}</h1>
	</div>
	<div className='inner-section-divider-medium'></div>
	<MemberInformation mode={this.state.mode} changeMode={this.changeMode} member={member}/>
	<div className='inner-section-divider-medium'></div>
	<MemberPayments mode={this.state.mode} member={member} />
	<div className='inner-section-divider-medium'></div>
	<MemberEvents mode={this.state.mode} events={events}/>
	</div>
	</div>
    )
  }
})

module.exports = ViewMember
