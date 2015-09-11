var React = require('react')

var TableEntry = module.exports = React.createClass({
  render: function () {
    return (
      <div className={ 'table-entry ' + this.props.header } >
        <p className={ this.props.header } > { this.props.entry } </p>
      </div> )}})

