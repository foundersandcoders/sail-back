var React = require('react')
var Table = require('./table')

module.exports = React.createClass({
  render: function () {

    var headers = ['Date', 'Reference', 'Short Description',
      'Time', 'Location', 'Host', 'Price per member',
      'Price per guest', 'Max number of guests', 'Total places available',
      'Open for booking']

    var get_entry_for_event = require('../../utils/get_entry.js')('_')

    var entries = (this.props.events || [])
      .map(function (event) {
        return headers.map(get_entry_for_event(event))})

    return (<Table
        {...this.props}
        Row={require('./table/SmartRow.js')(this.props.onClick)}
        className='events-table'
        data={[headers, entries]}
      />)}})

