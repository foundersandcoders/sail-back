'use strict'

var React = require('react')
var request = require('xhr')
var post = require('../../utils/post.js')
var get = require('../../utils/get')
var Task = require('data.task')
var curry = require('../../utils/curry')
var clone = require('../../utils/clone')

var Navigation = require('../../shared/navigation.js')
var MemberEvents = require('../components/member_events.js')
var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../components/member_information.js')

var ViewMember = React.createClass({
   add_payment: function  (payment) {
      this.setState({ payments: this.state.payments.concat([payment])} ) },

  getInitialState: function () {
    return {
      mode: 'view',
      member: require('../../mock_member.js'),
      events: require('../../mock_events.js'),
      payments: require('../../mock_payments.js')}},

  get_member_by_id: function (id) {
    return get(make_id_request_uri(id)) },

  get_members_events: function (id) {
    return get(make_event_request_uri(id)) },

  componentWillMount: function () {
    Task.of(update_member).ap(this.get_member_by_id(this.props.params.id))
        .ap(this.get_members_events(this.props.params.id))
        .fork(console.log.bind(console, 'AN ERROR'), this.setState.bind(this))},

  changeMode: function () {
    var changed_mode = (this.state.mode === 'edit') ? 'view' : 'edit'
    this.setState({mode: changed_mode})},

  cancel: function () {
    this.setState({
      member: this.pre_changes_member || this.state.member,
      mode: 'view'})
    this.pre_changes_member = null },

  save: function () {
    var self = this
    var state = clone(this.state)
    update_info(state, this.setState.bind(this))},

  change: function (e) {
    var member = clone(this.state.member)
    member[e.target.id] = e.target.value
    this.setState({member: member})},

  delete: function (e) {
    var member = clone(this.state.member)
    var dropdown = document.querySelector('#deletion-reason')
    var deletion_reason = dropdown.options[dropdown.selectedIndex].value
    if (deletion_reason === 'deletionReason') {
      alert('Deletion reason needed')
      return
    }
    this.remember()
    member.activation_status = 'deactivated'
    member.deletion_reason = deletion_reason
    member.deletion_date = new Date()

    this.setState({ member: member})},

  remember: function () {
    this.pre_changes_member = this.pre_changes_member || clone(this.state.member)},

  reactivate: function (e) {
    var member = clone(this.state.member)
    var dropdown = document.querySelector('#deletion-reason')
    member.deletion_reason = null
    member.activation_status = 'activated'

    this.setState({member: member})},

  remove_payment: function (id) {
    request({
      uri: '/api/payments/' + id,
      method: 'DELETE'
    }, function (err, data) {
      if (!err) {
        this.setState({
          payments: this.state.payments
            .filter(function (payment) { return payment.id !== id })})}}.bind(this))},

  render: function () {
    var member_id = this.props.params.id
    return (
      <div className='view-member'>
        <Navigation />
        <div className='main-container' id='member-component'>
          <div className='inner-section-divider-medium'></div>
          <div className='section-label'>
            <h1 id='member-title'>{'Member info: ' + member_id}</h1>
          </div>
          <div className='inner-section-divider-medium'></div>
          <MemberInformation
              mode={this.state.mode}
              changeMode={this.changeMode}
              member={this.state.member}
              save={this.save}
              onChange={this.change}
              deleteMember={this.delete}
              reactivate={this.reactivate}
              cancel={this.cancel} />

          <div className='inner-section-divider-medium'></div>
          <MemberEvents mode={this.state.mode}
              events={this.state.events} mid={member_id} />
          <div className='inner-section-divider-medium'></div>
          <MemberPayments mode={this.state.mode}
              payments={this.state.payments}
              mid={member_id}
              remove_payment={this.remove_payment}
              add_payment={this.add_payment} />
        </div>
      </div> )}})

function make_id_request_uri (id) {
  return '/api/members/' + id +
    '?populate=[payments,membership_type,events_booked]' }

function make_event_request_uri (id) {
  return '/api/members/' + id + '/events' }

var update_member = curry(function (member_data, events_data) {
  var member = JSON.parse(member_data.body)
  return {
    member: member,
    events: JSON.parse(events_data.body),
    payments: member.payments }})

var update_info = function (state, setState) {
  request({
    method: 'POST',
    uri: 'api/members/' + state.member.id,
    json: state.member
  }, function (err, head, data) {
    setState({member: data, mode: 'view'})})}

module.exports = ViewMember
