'use strict'

var React = require('react')
var to_title_case = require('app/to_title_case.js')
var curry = require('app/curry.js')

var Field = props =>
      props.value && props.mode !== 'edit' ?
          <Display {...props} /> :
      props.mode === 'edit' ?
          <Input {...props} /> :
          <div></div>

var Display = ({name, id, value}) =>
  <p>
    <span className='info'>{name}</span>
    <span id={'view-member-' + id}>
      {caser(id, value)}
    </span>
  </p>

var Input = ({ input_or_select: input_or_select = always_input, ...props}) =>
  <div className={props.className}>
    <span className='info'>{props.name}</span>
    { need_input(input_or_select, props) }
  </div>

Field.displayName = 'Field'

Field.propTypes = {
  value: React.PropTypes.string
  , mode: React.PropTypes.string
  , id: React.PropTypes.string
  , input_or_select: React.PropTypes.func
}

var need_input = curry((test, props) => {
    var {type, options} = test(props)
    return type === 'select' ?
        make_select(props, options) :
        make_input(props)
})

var always_input = () => ({ type: 'input' })

function make_input (props) {
  return <input
    placeholder={make_placeholder(props.name)}
    className={props.className + (props.error ? ' red' : '')}
    {...props} /> }

function make_select (props, options) {
  return (
    <select {...props} value={ props.value ? '' + props.value : undefined } >
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
