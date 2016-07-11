var React = require('react')
var Entry = require('./entry.js')
var { formatPounds } = require('app/monies')

var MoneyRow = module.exports = React.createClass({
  render: function () {
    var entries = typeof this.props.entries[0] === 'string' && this.props.entries[0].indexOf('Total') > -1
      ? formatTotals(this.props.entries)
      : this.props.entries
    var headers = this.props.headers
    var TableEntry = this.props.Entry || Entry
    return (
      <div className='table-row'>
        { entries.map((entry, i) =>
          <TableEntry {...this.props}
            header={ headers[i].toLowerCase().replace(/ /g, '-') }
            entry={ entry }
            key = { i } /> ) }
      </div> )}})

var formatTotals = arr => arr.map((money, i) => (i === 0 || money === undefined)
  ? money
  : formatPounds(money/100)
)
