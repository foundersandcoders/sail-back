'use strict'

const React = require('react')
const { connect } = require('react-redux')
const { pick, compose, propOr } = require('ramda')

const { fetch_member, deactivate_member, reactivate_member, update_member } =
  require('../redux/modules/member.js')
const { toggle_member_mode } = require('../redux/modules/mode.js')

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

  render () {
    const
      { mode
      , toggle_member_mode
      , reactivate_member
      , update_member
      } = this.props
    return <MemberPage
      deactivate_member_click={this.deactivate_member_click}
      reactivate_member_click={reactivate_member}
      edit_member_click={toggle_member_mode}
      cancel_member_click={toggle_member_mode}
      save_member_click={update_member}
      member_edit_mode={mode}
    />
  }
})

const map_state_to_props = ({ mode }) =>
  ({ mode })

const map_dispatch_to_props =
  { toggle_member_mode
  , fetch_member
  , deactivate_member
  , reactivate_member
  , update_member }

module.exports = connect(map_state_to_props, map_dispatch_to_props)(ViewMember)
