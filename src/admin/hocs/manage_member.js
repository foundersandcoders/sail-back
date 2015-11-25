'use strict'

var React = require('react')
var curry = require('curry')
var map = require('app/map.js')
var member_schema = require('../../models/members.js')
var object_assign = require('object-assign')

module.exports = curry((Component, start_member, get_member) => {
  var WithMember = React.createClass({
    displayName: Component.displayName || Component.name || 'Component',

    getInitialState () {
      return { member: start_member, errors: [] }
    },

    componentDidMount () {
      get_member(this.update_member, this.props)
    },

    update_member (new_member) {
      this.setState({ member: new_member })
    },

    change_handler (e) {
      this.update_member(object_assign(
          {},
          this.state.member,
          { [e.target.id]: e.target.value })) },

    verify_member (e) {
      member_schema.validate(this.state.member, (err, member) => {
        this.setState({errors: [] })
        err && this.setState({ errors: map(id_from_error, err.errors) }) }) },

    render () {
      return <Component
          update_member={this.update_member}
          verify_member={this.verify_member}
          change_handler={this.change_handler}
          {...this.props}
          {...this.state} />
    }
  })
  return WithMember
})

function id_from_error (err) {
  return err.split(' ')[0] }

