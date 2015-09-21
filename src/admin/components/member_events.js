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

    return ( <Table className='events-table' data = { [headers, entries] } /> )} })

var MemberEvents = React.createClass({
  render: function () {
    return (
      <div id='events-section'>
        <div className='section-label'>
          <h1>Events</h1>
        </div>
        <a className='button-two' href={'#/members/' + this.props.mid + '/events'}>Book Event</a>
        <div className='inner-section-divider-medium'></div>
        <EventsTable events={ this.props.events } />
      </div>
    )
  }
})

var get_entry_for_event = require('../../utils/curry')(function (event, header) {
  return format_if_necessary(header)(event[ header.toLowerCase().replace(/ /g, '_') ])})

function format_if_necessary (header) {
  return header === 'Date' ? require('../../utils/format_date') : function (data) { return data } }

module.exports = MemberEvents
