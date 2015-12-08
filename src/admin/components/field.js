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

var always_input = () =>
  ({ type: 'input' })

var make_input = (props)  =>
  <input
    placeholder={make_placeholder(props.name)}
    className={props.className + (props.error ? ' red' : '')}
    {...props} />

var make_select = (props, options) =>
  <select {...props} value={ props.value ? '' + props.value : undefined } >
    <option disabled value={''}> -- select an option -- </option>
    { options.map((option, i) =>
      <option
          value={option}
          key={i}>{to_title_case(option.replace(/-/g, ' '))}</option>) }
  </select>

var make_placeholder = (name) =>
  name.match(/[dD]ate/) ? name.match(/[dD]ue/) ? 'dd/mm' : 'dd/mm/yyyy' : name

var caser = (id, value) =>
  id.match('email') ? value: to_title_case(value.replace(/-/g, ' '))

module.exports = Field
