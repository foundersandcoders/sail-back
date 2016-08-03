/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { pick, compose, propOr, merge } = require('ramda')
const title_case = require('app/to_title_case')
const { convertPounds } = require('app/monies')
const { fetch_member, deactivate_member, reactivate_member, update_member } =
  require('../redux/modules/member.js')
const { toggle_member_mode } = require('../../shared/redux/modules/mode.js')
const { switch_charge_type } = require('../redux/modules/charge_form.js')
const { add_payment, remove_payment } = require('../redux/modules/payments.js')

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
      (document.querySelector('#deletion_reason'): any).selectedOptions[0]
    deactivate_member(deletion_reason)
  },

  add_payment (payment) {
    const { params: { id }, add_payment, charge_type } = this.props

    compose(add_payment, convertPounds, merge(
      { member: id
      , category: charge_type
      , description: title_case(charge_type) }))(payment)
  },

  render () {
    const
      { mode
      , toggle_member_mode
      , reactivate_member
      , update_member
      , switch_charge_type
      , charge_type
      , payments
      , remove_payment
      , payment_defaults
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
      payments={payments}
      add_payment={this.add_payment}
      remove_payment={remove_payment}
      payment_defaults={payment_defaults}
    />
  }
})

const map_state_to_props = ({ mode, charge_form, payment_defaults, payments }) =>
  ({ mode, charge_type: charge_form, payment_defaults, payments })

const map_dispatch_to_props =
  { toggle_member_mode
  , fetch_member
  , deactivate_member
  , reactivate_member
  , update_member
  , switch_charge_type
  , add_payment
  , remove_payment
  }

export default connect(map_state_to_props, map_dispatch_to_props)(ViewMember)
