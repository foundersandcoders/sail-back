var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
        <select id={ this.props.id } className={ this.props.className } >
          <option value={this.props.default.value} disabled selected>
            {this.props.default.desc || this.props.default.value }
          </option>
          { this.props.options.map(function(option, i) {
            return <option
                key={i}
                value={option.value}
                disabled={option.disabled}>
                    {option.desc || option.value }
                </option> }) }
        </select>) } })
