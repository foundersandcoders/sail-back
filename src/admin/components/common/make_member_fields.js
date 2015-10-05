'use strict'

var React = require('react')
var r = require('ramda')
var Field = require('../field.js')
var format_date = require('../../../utils/format_date')

function label_from_id (id) {
  return id.slice(0, 1).toUpperCase() + id.slice(1).replace(/_/g, ' ') + ': ' }

/* TODO: allow different input types for different fields
 * TODO: don't render deletion reasons for each column, put at top of */
module.exports = function make_member_fields (ids, column_title) {

  return React.createClass({
    onChange: function (e) {
      this.props.onChange(e)
    },
    get_member_prop: function (prop) {
      if (prop === 'membership_type' &&
          typeof this.props.member[prop] === 'object') {
        return this.props.member[prop].description}
      else if (prop.toLowerCase().match('date') && this.props.mode === 'view') {
        return format_date(this.props.member[prop]) }
      else return (r.prop(prop, this.props.member) || '').toString() },

    fields: function () {
      var make_field_props = function (name, id) {
        return { name: name, value: this.get_member_prop(id), id: id } }.bind(this)

      function make_props_from_id (id) {
        return make_field_props(label_from_id(id), id) }

      return ids.map(make_props_from_id) },

    render: function () {
      var field_components = this.fields().map(function(field, i) {
          return <Field
            mode={this.props.mode}
            name={field.name}
            value={field.value}
            id={field.id}
            key={i}
            onChange={this.onChange} />}.bind(this))

      return (
        <div className='col-1'>
          <h2>{column_title}</h2>
          {field_components}
        </div> )}})}
