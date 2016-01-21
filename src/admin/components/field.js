'use strict'

var React = require('react')
var to_title_case = require('app/to_title_case.js')
var curry = require('app/curry.js')

var Field = (props) =>
  props.value && props.mode !== 'edit'
  ? <Display {...props} />
  : props.mode === 'edit'
  ? <Input {...props} />
  : <div></div>

var Display = ({name, id, value}) =>
  <p>
    <span className='info'>{name}</span>
    <span id={'view-member-' + id}>
      {caser(id, value)}
    </span>
  </p>

var Input = ({ className, name, options, ...props}) =>
  <div className={className}>
    <span className='info'>{name}</span>
    { options ? make_select(props, options) : make_input(name, props) }
  </div>

Field.displayName = 'Field'

Field.propTypes =
  { value: React.PropTypes.string
  , mode: React.PropTypes.string
  , id: React.PropTypes.string
  }

var make_input = (name, props)  =>
  <input
    {...props}
    placeholder={make_placeholder(name)}
    className={props.className + (props.error ? ' red' : '')}
  />

var make_select = (props, options) =>
  <select {...props} value={ props.value ? '' + props.value : undefined } >
    <option> -- select an option -- </option>
    {options.map((option, i) =>
      <option
        value={option}
        key={i}
      >
        {to_title_case(option.replace(/-/g, ' '))}
      </option>
    )}
  </select>

var make_placeholder = (name) =>
  name.match(/[dD]ate/) ? name.match(/[dD]ue/) ? 'dd/mm' : 'dd/mm/yyyy' : name

var caser = (id, value) =>
  id.match('email') ? value: to_title_case(value.replace(/-/g, ' '))

module.exports = Field
