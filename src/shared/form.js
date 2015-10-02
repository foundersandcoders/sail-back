'use strict'

var React = require('react')
var clone = require('clone')

var create_input = function (field) {

  if (field.hasOwnProperty('component'))
    return <field.component opts={field.opts} />
  else
    return <input
        name={field.name}
        type={field.type}
        value={this.props.data[field.name || field.id] || field.value }
        placeholder={field.placeholder}
        id={field.id}
        className={field.className}
        onChange={this.onChange}
    />
}

var Form = React.createClass({
  getInitialState: function () { return {} },
  onChange: function (e) {
    this.props.onChange(e)
  },
  onSubmit: function (e) {
    e.preventDefault()
    var state = clone(this.state)
    this.props.on_save(state)
  },
  render: function () {
    var fields = this.props.fields.map(function (field) {
      if (typeof field === 'object') return create_input.call(this, field)
      return <input
          id={field}
          placeholder={field}
          onChange={this.onChange}
          value={this.props.data[field]}
      />
    }.bind(this))
    return (
      <form onSubmit={this.onSubmit}>
        { fields }
      </form>
    )
  }
})

module.exports = Form
