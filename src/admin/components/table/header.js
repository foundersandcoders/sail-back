var React = require('react')
var Row = require('./row.js')

module.exports = React.createClass({
  render: function () {
    var TableRow = this.props.Row || Row
    return <TableRow {...this.props} /> }})
