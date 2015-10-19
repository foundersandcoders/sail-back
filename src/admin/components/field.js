'use strict'

var React = require('react')
var to_title_case = require('../../utils/to_title_case.js')

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
          {<input type={ this.props.name.match(/[dD]ate/) ? 'date' : 'text' }
            value={this.props.value}
            id={this.props.id}
            onChange={this.props.onChange} />}
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
        'annual-group', 'annual-corporate', 'life-single', 'life-double']
  }
  return select_options[props.id] ?
      make_select(props, select_options[props.id]) :
      make_input(props) }

function make_input (props) {
  return <input type={ props.name.match(/[dD]ate/) ? 'date' : 'text' }
    value={ props.value }
    id={ props.id }
    onChange={ props.onChange } /> }

function make_select (props, options) {
  return (
    <select {...props} value={'' + props.value} onChange={ props.onChange }>
      { options.map(function (option, i) {
        return <option
            value={option}
            key={i}>{to_title_case('' + option)}</option> }) }
    </select>)}

module.exports = Field
