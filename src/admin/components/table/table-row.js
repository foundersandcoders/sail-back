var React = require('react')
var TableEntry = require('./table-entry.js')

var TableRow = module.exports = React.createClass({
  render: function () {
    var entries = this.props.entries
    var headers = this.props.headers
    var class_name = 'table-row' + (this.props.header_row ? ' table-header' : '')
    return (
      <div className={class_name} >
        { entries.map(function (entry, i) { return <TableEntry header={ headers[i].toLowerCase().replace(/ /g, '-') } entry={ entry } /> }) }
      </div> )}})

