'use strict'

var React = require('react')
var request = require('xhr')
var post = require('app/post.js')
var get = require('app/get')
var Task = require('data.task')
var curry = require('app/curry')
var clone = require('clone')
var standardise_date = require('app/standardise_date.js')
var format_date = require('app/format_date.js')
var object_assign = require('object-assign')
var compose = require('fn-compose')
var map = require('app/map.js')

var member_schema = require('../../models/members.js')

var Navigation = require('../../shared/navigation.js')
var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../components/member_information.js')

var transform_dated = curry(function (transform, dated_obj) {
  var cloned_obj = clone(dated_obj)
  Object.keys(dated_obj)
    .filter(function (key) { return key.match('[dD]ate') })
    .forEach(function (key) { cloned_obj[key] = transform(dated_obj[key]) })
  return cloned_obj })

var standardise_dated = transform_dated(standardise_date)
var format_dated = transform_dated(format_date)

var ViewMember = React.createClass({

  displayName: 'ViewMember',

  getInitialState: function () {
    return {
      mode: 'view',
      member: {},
      payments: []}},

  componentWillMount: function () {
    Task.of(receive_member).ap(this.get_member_by_id(this.props.params.id))
        .fork(console.log.bind(console, 'AN ERROR'), this.setState.bind(this))},

  add_payment: function  (payment) {
    this.setState({
      payments: date_sort(this.state.payments.concat([payment]))} ) },

  get_member_by_id: function (id) {
    return get(make_id_request_uri(id)) },

  changeMode: function () {
    this.setState(this.make_mode_state_update(this.state.mode))},

  make_mode_state_update: function (current_mode) {
    return current_mode === 'edit' ?
      { mode: 'view', member: pre_changes_member || member } :
      { mode: 'edit', pre_changes_member: clone(this.state.member) } },

  cancel: function () {
    this.setState({
      member: this.state.pre_changes_member || this.state.member,
      mode: 'view' })
    this.state.pre_changes_member = null },

  save: function () {
    var state = clone(this.state)
    update_info(state, this.setState.bind(this))},

  change: function (e) {
    var member = clone(this.state.member)
    member[e.target.id] = e.target.value
    this.setState({member: member}) },

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
    member.deletion_date = new Date().toISOString()

    this.setState({ member: member}) },

  remember: function () {
    var pre_changes_member = this.state.pre_changes_member ||
        clone(this.state.member)
    this.setState({pre_changes_member: pre_changes_member}) },

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
            .filter(function (pay) { return pay.id !== id })})}}.bind(this))},

  verify_member: function (e) {
    member_schema.validate(this.state.member, function (err, member) {
      err ? function noop () {} : this.setState({ member: member }) }) },

  render: function () {
    var member_id = this.props.params.id
    return (
      <div className='view-member'>
        <Navigation />
        <div className='main-container' id='member-component'>
          <div className='inner-section-divider-medium'></div>
          <MemberInformation
              on_composition_end={this.verify_member}
              mode={this.state.mode}
              changeMode={this.changeMode}
              member={this.state.member}
              save={this.save}
              onChange={this.change}
              deleteMember={this.delete}
              reactivate={this.reactivate}
              cancel={this.cancel} />

          <div className='inner-section-divider-medium'></div>
          <MemberPayments
              initial_date={this.props.payment_date}
              initial_reference={this.props.payment_reference}
              initial_type={this.props.payment_type}
              subscription_amount={this.state.member.subscription_amount}
              update={this.props.update}
              payments={this.state.payments}
              mid={member_id}
              remove_payment={this.remove_payment}
              add_payment={this.add_payment} />
        </div>
      </div> )}})

function make_id_request_uri (id) {
  return '/api/members/' + id +
    '?populate=[payments,membership_type]' }

function date_sort (array_of_dated) {
  return array_of_dated
    .map(ensure_date)
    .sort(function (a, b) {
      return a.date.getTime() - b.date.getTime() }) }

var receive_member = curry(function (member_data) {
  var member = process_member_JSON(member_data.body)
  return {
    member: format_dated(member),
    payments: date_sort(member.payments),
    pre_changes_member: null }})

var update_info = function (state, set_state) {
  request({
    method: 'POST',
    uri: 'api/members/' + state.member.id,
    json: standardise_dated(state.member)
  }, function (err, head, data) {
    set_state({member: format_dated(data), mode: 'view'}) }) }

function ensure_date (dated_obj) {
  return object_assign({}, dated_obj, { date: new Date(dated_obj.date) }) }

var process_member_JSON = compose(process_member, JSON.parse)

function process_member (member) {
  var { membership_type: { value, amount }, ...other_details } = member
  return object_assign ({}, map(null_to_undefined, other_details), {
    membership_type: value,
    subscription_amount: amount }) }

function null_to_undefined (val) {
  return val === null ? undefined : val }

module.exports = ViewMember
