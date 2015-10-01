var React = require('react')
var Row = require('./row.js')
var Header = require('./header.js')

var Table = module.exports = React.createClass({
  render: function () {
    var headers = this.props.data[0]
    var rows = this.props.data[1]
    var TableRow = this.props.Row || Row
    var TableHeader = this.props.Header || Header
    return (
      <div {...this.props} className={'table ' + this.props.className}>
        <TableHeader header_row={true} entries={ headers } headers={ headers }/>
        <div className='table-body'>
          { rows.map(function (row, i) {
            return <TableRow
                entries={ row }
                headers={ headers }
                header_row={ false }
                key={ i } /> }) }
        </div>
      </div> )}})

