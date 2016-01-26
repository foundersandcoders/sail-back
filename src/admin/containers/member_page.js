'use strict'

const React = require('react')
const { connect } = require('react-redux')
const { pick, compose, propOr, merge } = require('ramda')

const { fetch_member, deactivate_member, reactivate_member, update_member } =
  require('../redux/modules/member.js')
const { toggle_member_mode } = require('../redux/modules/mode.js')
const { switch_charge_type } = require('../redux/modules/charge_form.js')
const { add_payment } = require('../redux/modules/payments.js')

const MemberPage = require('../dumb_components/member_page.js')

const ViewMember = React.createClass({

  displayName: 'ViewMember',

  componentDidMount () {
    const { params: { id }, fetch_member } = this.props
    fetch_member(id)
  },

  deactivate_member_click (_) {
    const { deactivate_member } = this.props
    const { value: deletion_reason } =
      document.querySelector('#deletion_reason').selectedOptions[0]
    deactivate_member(deletion_reason)
  },

  add_payment (payment) {
    const { params: { id }, add_payment, charge_type } = this.props
    compose(add_payment, merge(
      { member: id
      , category: charge_type }))(payment)
  },

  render () {
    const
      { mode
      , toggle_member_mode
      , reactivate_member
      , update_member
      , switch_charge_type
      , charge_type
      } = this.props
    return <MemberPage
      deactivate_member_click={this.deactivate_member_click}
      reactivate_member_click={reactivate_member}
      edit_member_click={toggle_member_mode}
      cancel_member_click={toggle_member_mode}
      save_member_click={update_member}
      switch_charge_type={switch_charge_type}
      charge_type={charge_type}
      member_edit_mode={mode}
      add_payment={this.add_payment}
    />
  }
})

const map_state_to_props = ({ mode, charge_form }) =>
  ({ mode, charge_type: charge_form })

const map_dispatch_to_props =
  { toggle_member_mode
  , fetch_member
  , deactivate_member
  , reactivate_member
  , update_member
  , switch_charge_type
  , add_payment
  }

module.exports = connect(map_state_to_props, map_dispatch_to_props)(ViewMember)
