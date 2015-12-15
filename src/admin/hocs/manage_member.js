'use strict'

var React = require('react')
var curry = require('curry')
var map = require('app/map.js')
var member_schema = require('../../models/members.js')
var object_assign = require('object-assign')

module.exports = curry((Component, start_member, get_member) => {
  var WithMember = React.createClass({
    displayName: Component.displayName || Component.name || 'Component',

    getInitialState: function () {
      return { member: start_member, errors: [] }
    },

    componentDidMount: function () {
      get_member(this.update_member, this.props)
    },

    update_member: function (new_member) {
      this.setState({ member: object_assign({}, this.state.member, new_member) })
    },

    validation_error: function (errors) {
      this.setState({errors: this.state.errors.concat(errors)})
    },

    change_handler: function (e) {
      this.update_member(object_assign(
          {},
          this.state.member,
          { [e.target.id]: e.target.value })) },

    verify_member: function (e, cb = noop) {
      member_schema.validate(
          this.state.member
          , { abortEarly: false }
          , (err, member) => {
            this.setState({
              errors: []
            })
            err && this.setState({
              errors: this.state.errors.concat(map(id_from_error, err.errors))
            })
            cb() }) },

    render: function () {
      return <Component
          update_member={this.update_member}
          verify_member={this.verify_member}
          change_handler={this.change_handler}
          validation_error={this.validation_error}
          {...this.props}
          {...this.state} />
    }
  })
  return WithMember
})

function id_from_error (err) {
  return err.split(' ')[0] }

function noop () {}

