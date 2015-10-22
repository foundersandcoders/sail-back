'use strict'

var React = require('react')
var to_title_case = require('app/to_title_case.js')
var DateInput = require('./date')

var Field = React.createClass({
  render: function () {
    if (this.props.value && this.props.mode !== 'edit') {
      return (
        <p>
          <span className='info'>{this.props.name}</span>
          <span id={'view-member-' + this.props.id}>{this.props.value}</span>
        </p>
      )
    } else if (this.props.mode === 'edit') {
      return (
        <div>
          <span className='info'>{this.props.name}</span>
          { input_or_select(this.props) }
        </div>
      )
    } else {
      return (
        <div>
        </div> )}}})

function input_or_select (props) {
  var select_options = {
    standing_order: ['true', 'false'],
    membership_type: ['annual-single', 'annual-double', 'annual-family',
        'annual-group', 'annual-corporate', 'life-single', 'life-double'],
    type: ['Cash', 'Cheque', 'BACs']
  }
  return select_options[props.id] ?
      make_select(props, select_options[props.id]) :
      make_input(props) }

function make_input (props) {
  return <input
    placeholder={make_placeholder(props.name)}
    {...props} /> }

function make_select (props, options) {
  return (
    <select {...props} value={'' + props.value} >
      { options.map(function (option, i) {
        return <option
            value={option}
            key={i}>{to_title_case('' + option.replace(/-/g, ' '))}</option> }) }
    </select>)}

function make_placeholder (name) {
  return name.match(/[dD]ate/) ? 'dd/mm/yyyy' : name }

module.exports = Field
