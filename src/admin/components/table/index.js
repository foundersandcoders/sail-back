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
      <div className={'table ' + this.props.className}>
        <TableHeader
            header_row={true}
            entries={ headers }
            headers={ headers } />
        <div
            className='table-body'
            ref={function (d) {
              // Will need to change in React 0.14
              if (d) {d.getDOMNode().scrollTop = d.getDOMNode().scrollHeight} }}>
          { rows.map(function (row, i) {
            return <TableRow
                {...this.props}
                entries={ row }
                headers={ headers }
                header_row={ false }
                row_num={ i }
                key={ i } /> }.bind(this)) }
        </div>
      </div> )}})

