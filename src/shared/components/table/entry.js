var React = require('react')

var TableEntry = module.exports = React.createClass({
  render: function () {
    return (
      <div {...this.props}
        className={ 'table-entry ' + this.props.header } >
        <p className={ this.props.header } > { this.props.entry } </p>
      </div> )}})

