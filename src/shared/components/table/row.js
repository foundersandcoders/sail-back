var React = require('react')
var Entry = require('./entry.js')

module.exports = React.createClass({
  render: function () {
    var entries = this.props.entries
    var headers = this.props.headers
    var TableEntry = this.props.Entry || Entry
    return (
      <div className='table-row'>
        {entries.map((entry, i) => <TableEntry {...this.props} header={headers[i].toLowerCase().replace(/ /g, '-')} entry={entry} key={i}/>)}
      </div>
    )
  }
})
