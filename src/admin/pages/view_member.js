'use strict'

var React = require('react')
var request = require('xhr')

var Navigation = require('../../shared/navigation.js')
var MemberEvents = require('../components/member_events.js')
var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../components/member_information.js')

var ViewMember = React.createClass({
  getInitialState: function () {
    return {
      mode: 'view',
      member: require('../../mock_member.js')
    }
  },

  get_member_by_id: function (id) {
    request({
      method: 'GET',
      uri: make_id_request_uri(id),
    }, function (err, data) {
      this.setState({member: JSON.parse(data.body)}) }.bind(this))},

  componentDidMount: function () {
    this.get_member_by_id(this.props.params.id)},

  changeMode: function () {
    var changed_mode = (this.state.mode === 'edit') ? 'view' : 'edit'
    this.setState({mode: changed_mode}) },

  save: function () {

    var self = this
    console.log('SAVE.title', self.state.member['title'])
    console.log('SAVE::self.state.member', Object.keys(self.state.member))
    var member = Object.keys(self.state.member).reduce(function (member, prop) {
      if (typeof self.state.member === 'boolean' || !!self.state.member[prop]) {
        member[prop] = self.state.member[prop]
      }
      return member
    }, {})
    request({
      method: 'PUT',
      uri: '/api/members/' + this.state.member.id,
      json: member
    }, function (err, head, body) {
      self.setState({ member: body, mode: 'view' })
    })
  },

  change: function (e) {

    var member = Object.keys(this.state.member).reduce(function (member, prop) {
      member[prop] = this.state.member[prop]
      return member
    }.bind(this), {})
    member[e.target.id] = e.target.value
    if (e.target.id === 'title')
    console.log('MMEMEMEMM.title', member.title)
    this.setState({member: member})
  },

  render: function () {
    var member_id = this.props.params.id
    return (
      <div>
        <Navigation />
        <div className='main-container' id='member-component'>
          <div className='inner-section-divider-medium'></div>
          <div className='section-label'>
            <h1 id='member-title'>{'Member info: ' + member_id}</h1>
          </div>
          <div className='inner-section-divider-medium'></div>
          <MemberInformation mode={this.state.mode} changeMode={this.changeMode}
            member={this.state.member} save={this.save} onChange={this.change} />
          <div className='inner-section-divider-medium'></div>
          <MemberPayments mode={this.state.mode}
            payments={this.state.member.payments} mid={member_id}/>
          <div className='inner-section-divider-medium'></div>
          <MemberEvents mode={this.state.mode}
            events={this.state.member.events_booked}/>
        </div>
      </div>
    )
  }
})

function make_id_request_uri (id) {
  return '/api/members/' + id +
    '?populate=[payments,membership_type,deletion_reason,events_booked]' }

module.exports = ViewMember
