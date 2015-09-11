'use strict'

var React = require('react')
var Table = require('./table')

var EventsTable = React.createClass({
  render: function () {
    var headers = ['Date', 'Reference', 'Title', 'Time', 'Location',
        'Host', 'Price per member', 'Price per guest']
    var entries = this.props.events.map(
        function (event, i) {
          return headers.map(get_entry_for_event(event)) })

    return ( <Table data = { [headers, entries] } /> )} })

var MemberEvents = React.createClass({
  render: function () {
    return (
      <div id='events-section'>
        <div className='section-label'>
          <h1>Events</h1>
        </div>
        <div className='inner-section-divider-medium'></div>
        <EventsTable events={ require('../../mock_events') } />
      </div>
    )
  }
})

var get_entry_for_event = require('../../utils/curry')(function (event, header) {
  return event[ header.toLowerCase() ] })

module.exports = MemberEvents
