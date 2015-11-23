'use strict'

var React = require('react')
var Field = require('../field.js')
var format_date = require('app/format_date.js')
var to_title_case = require('app/to_title_case.js')
var curry = require('app/curry.js')

function label_from_id (id) {
  return id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': ' }

function get_mode (id) {
  var view_only = ['id', 'registered']
  return view_only.indexOf(id) > -1 ? 'view' : '' }

var id_in_errors = curry(function (errors, id) {
  return errors && errors.indexOf(id) > -1 })

/* TODO: stop duplicating the ids passed in in view_member and add_member
 * This may be easiest with micro / function components */
module.exports = React.createClass({
  onChange: function (e) {
    this.props.onChange(e) },

  get_member_prop: function (prop) {
    var value = this.props.member[prop]
    return value == null ? // captures undefined and null
        '' :
        value.toString() },
  fields: function () {
    var make_field_props = (name, id) => {
      return {
        name: name,
        value: this.get_member_prop(id),
        mode: get_mode(id),
        id: id } }

    function make_props_from_id (id) {
      return make_field_props(label_from_id(id), id) }

    return this.props.ids.map(make_props_from_id) },

  render: function () {
    var error_needed = id_in_errors(this.props.errors)
    var field_components = this.fields().map((field, i) => {
        return <Field
            error={error_needed(field.id)}
            mode={field.mode || this.props.mode}
            name={field.name}
            value={field.value}
            id={field.id}
            key={i}
            onBlur={this.props.on_composition_end}
            onChange={this.onChange} />})

    return (
      <div className='col-1'>
        {field_components}
      </div> ) } })
