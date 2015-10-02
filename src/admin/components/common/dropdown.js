var React = require('react')

// var Default = React.createClass({
//   render: function () {
//     return <option selected { this.props.disabled ? 'disabled' : 'value = ' + this.props.value } /> }})
//
// var Option = React.createClass({
//   render: function () {
//     return <option { this.props.details } value={this.props.value} disabled={this.props.disabled} /> }})

module.exports = React.createClass({
  render: function () {
    return (
        <select id={ this.props.id } className={ this.props.className } >
          <option value={this.props.default.value} disabled selected>
            {this.props.default.desc || this.props.default.value }
          </option>
          { this.props.options.map(function(option) {
            return <option value={option.value} disabled={option.disabled}> {option.desc || option.value }</option> }) }
      </select>)}})
