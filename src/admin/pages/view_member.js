'use strict'

var React = require('react')
var request = require('xhr')
var post = require('app/post.js')
var get = require('app/get.js')
var Task = require('data.task')
var curry = require('app/curry')
var clone = require('clone')
var object_assign = require('object-assign')
var dethunk = require('dethunking-compose')
var map = require('app/map.js')
var prop_or = require('app/prop_or')
var { standardise, format } = require('app/transform_dated')

var member_schema = require('../../models/members.js')

var Navigation = require('../../shared/navigation.js')
var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../components/member_information.js')

var manage_member = require('../hocs/manage_member.js')

var ViewMember = React.createClass({

  displayName: 'ViewMember',

  getInitialState: function () {
    var { member: { payments = [] } } = this.props
    return {
      mode: 'view',
      member: this.props.member,
      payments: date_sort(payments) }},

  componentWillReceiveProps: function (new_props) {
    this.setState({ payments: date_sort(new_props.member.payments) }) },

  add_payment: function  (payment) {
    this.setState({
      payments: date_sort(this.state.payments.concat([payment]))} ) },

  toggle_mode: function () {
    this.setState(this.make_mode_state_update(this.state.mode))},

  make_mode_state_update: function (current_mode) {
    return current_mode === 'edit' ?
      { mode: 'view', member: this.state.pre_changes_member || member } :
      { mode: 'edit', pre_changes_member: clone(this.state.member) } },

  cancel: function () {
    this.setState({
      member: this.state.pre_changes_member || this.state.member,
      mode: 'view' })
    this.state.pre_changes_member = null },

  save: function () {
    update_info(this.props, this.toggle_mode) },

  remove: function (e) {
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

    this.props.update_member(member) },

  remember: function () {
    var pre_changes_member = this.state.pre_changes_member ||
        clone(this.state.member)
    this.setState({pre_changes_member: pre_changes_member}) },

  reactivate: function (e) {
    var member = clone(this.state.member)
    var dropdown = document.querySelector('#deletion-reason')
    member.deletion_reason = null
    member.activation_status = 'activated'

    this.props.update_member(member)},

  remove_payment: function (id) {
    request({
      uri: '/api/payments/' + id,
      method: 'DELETE'
    }, function (err, data) {
      if (!err) {
        this.setState({
          payments: this.state.payments
            .filter(function (pay) { return pay.id !== id })})}}.bind(this))},

  render: function () {
    var member_id = this.props.params.id
    return (
      <div className='view-member'>
        <div className='main-container' id='member-component'>
          <div className='inner-section-divider-medium'></div>
          <MemberInformation
              mode={this.state.mode}
              toggle_mode={this.toggle_mode}
              member={this.props.member}
              save={this.save}
              onChange={this.props.change_handler}
              blur_handler={this.props.verify_member}
              errors={this.props.errors}
              deleteMember={this.remove}
              reactivate={this.reactivate}
              cancel={this.cancel} />

          <div className='inner-section-divider-medium'></div>
          <MemberPayments
              initial_date={this.props.payment_date}
              initial_reference={this.props.payment_reference}
              initial_type={this.props.payment_type}
              subscription_amount={this.props.member.subscription_amount}
              update={this.props.update}
              payments={this.state.payments}
              mid={member_id}
              remove_payment={this.remove_payment}
              add_payment={this.add_payment} />
        </div>
      </div> )} })

function make_id_request_uri (id) {
  return '/api/members/' + id +
    '?populate=[payments,membership_type]' }

function date_sort (array_of_dated) {
  return array_of_dated
    .map(ensure_date)
    .sort(function (a, b) {
      return a.date.getTime() - b.date.getTime() }) }

function get_member (update_member, props) {
    Task.of(receive_member).ap(get_member_by_id(props.params.id))
        .fork(console.log.bind(console, 'AN ERROR'), update_member) }

function get_member_by_id (id) {
  return get(make_id_request_uri(id)) }

var receive_member = dethunk(
  () => format
  , () => process_member_JSON
  , () => prop_or('', 'body')
)

var update_info = (props, toggle_view) =>
  request({
    method: 'POST',
    uri: 'api/members/' + props.member.id,
    json: standardise(props.member)
  }, (err, res, body) => {
    if (res.statusCode >= 400) return handle_error(props.validation_error, body)
    props.update_member(format(body))
    toggle_view() })

var ensure_date = dated_obj =>
  object_assign({}, dated_obj, { date: new Date(dated_obj.date) })

var handle_error = (validation_error, body) =>
  body.error === "E_VALIDATION"
   ?  validation_error(Object.keys(body.invalidAttributes))
   :  validation_error(['id'])

var process_member_JSON = dethunk(
    () => process_member
    , () => JSON.parse)

var process_member = ({ membership_type: { value, amount } = {}, ...member }) =>
 object_assign ({}, map(null_to_undefined, member), {
    membership_type: value,
    subscription_amount: amount })

var null_to_undefined = val =>
  val === null ? undefined : val

module.exports = manage_member(ViewMember, {}, get_member)
