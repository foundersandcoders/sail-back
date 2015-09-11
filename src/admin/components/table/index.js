var React = require('react')
var TableRow = require('./table-row')

var Table = module.exports = React.createClass({
  render: function () {
    var headers = this.props.data[0]
    var rows = this.props.data[1]
    return (
      <div className='table'>
        <TableRow header_row={true} entries={ headers } headers={ headers }/>
        <div className='table-body'>
          { rows.map(function (row, i) { return <TableRow entries={ row }
              headers={ headers } header_row={ false } key={ i } /> }) }
        </div>
      </div> )}})

