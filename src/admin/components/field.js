'use strict'

var React = require('react')
var to_title_case = require('app/to_title_case.js')
var curry = require('app/curry.js')

var need_input = curry((test, props) => {
    var {type, options} = test(props)
    return type === 'select' ?
        make_select(props, options) :
        make_input(props)
})

var Field = React.createClass({
  displayName: 'Field',
  render: function () {
    var select_necessary = need_input(this.props.input_or_select || always_input)
    return (
      this.props.value && this.props.mode !== 'edit' ?
          <p>
            <span className='info'>{this.props.name}</span>
            <span id={'view-member-' + this.props.id}>
              {caser(this.props.id, this.props.value)}
            </span>
          </p> :
      this.props.mode === 'edit' ?
          <div className={this.props.className}>
            <span className='info'>{this.props.name}</span>
            { select_necessary(this.props) }
          </div> :
          <div></div>
    ) } })

function always_input () { return { type: 'input' } }

function make_input (props) {
  return <input
    placeholder={make_placeholder(props.name)}
    className={props.className + (props.error ? ' red' : '')}
    {...props} /> }

function make_select (props, options) {
  return (
    <select {...props} value={'' + props.value} >
      <option disabled value={''}> -- select an option -- </option>
      { options.map(function (option, i) {
        return <option
            value={option}
            key={i}>{to_title_case(option.replace(/-/g, ' '))}</option> }) }
    </select>)}

function make_placeholder (name) {
  return name.match(/[dD]ate/) ? 'dd/mm/yyyy' : name }

function caser (id, value) {
  return id.match('email') ? value: to_title_case(value.replace(/-/g, ' ')) }

module.exports = Field
