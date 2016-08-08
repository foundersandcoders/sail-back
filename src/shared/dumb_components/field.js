'use strict'

const React = require('react')
const to_title_case = require('app/to_title_case.js')
const { assoc } = require('ramda')

var Field = (props) =>
  props.value && props.mode !== 'edit'
  ? <Display {...props} />
  : props.mode === 'edit'
  ? <Input {...props} />
  : <div></div>

var Display = ({ name, id, value, description }) =>
  <p>
    {description && name === 'News type: ' && <span><br /><i>{description}</i><br /></span>}
    <br />
    <span className='info'>{name}</span>
    <span id={'view-member-' + id}>
      {caser(id, value)}
    </span>
  </p>

var Input = ({ className, name, options, touched, error, description, ...rest }) => {
  const display_error = touched && error
  const props = display_error ? assoc('error', true, rest) : rest
  return (
    <div className={className}>
      {description && name === 'News type*: ' && <span><br /><i>{description}</i><br /></span>}
      <br />
      <span className='info'>{name}</span>
      { display_error && <span>{error}</span> }
      { options ? make_select(props, options) : make_input(name, props) }
    </div>
  )
}

Field.displayName = 'Field'

Field.propTypes =
  { value: React.PropTypes.string
  , mode: React.PropTypes.string
  , id: React.PropTypes.string
  }

var make_input = (name, props) =>
  <input
    {...props}
    placeholder={make_placeholder(name)}
    className={props.className + (props.error ? ' red' : '')}
  />

var make_select = (props, options) =>
  <select
    {...props}
    value={ props.value ? String(props.value) : undefined }
    className={props.className + (props.error ? ' red' : '')}
  >
    <option> -- select an option -- </option>
    {options.map((option, i) =>
      <option
        value={option.toLowerCase()}
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
