'use strict'

var React = require('react')
var get = require('../../utils/get')
var on_err = require('../../shared/error_handler')
var Task = require('data.task')
var curry = require('../../utils/curry')
var Table = require('../components/table')
var Navigation = require('../../shared/navigation')

var PaymentsTable = require('../components/payments_table.js')


var EventsTable = React.createClass({
  render: function () {
    
    var headers = ['Date', 'Reference', 'Short Description', 
      'Time', 'Location', 'Host', 'Price per member', 
      'Price per guest', 'Max guests', 'Max places', 'Members booked', 
      'Guests booked', 'Staff attending', 'Number waiting', 
      'Open for booking']
  
  var get_entry_for_event = require('../../utils/curry')(function (ev, header) {
    return ev[header.toLowerCase()] })
    
    var entries = (this.props.events || [])
      .map(function (event) {
        return headers.map(get_entry_for_event(event)) 
      })
    
    return (
      <Table data={[headers, entries]} />
    ) 
  }
})

var BookingForm = React.createClass({
  change: function (e) {
    var state = require('../../utils/clone')(this.state)
    state[e.target.id] = e.target.value
    this.setState(state)
  },
  render: function () {
    var fields = ['number_of_members', 'number_of_guests']
    var rendered_fields = fields.map(function (field) {
      return <input type='text' placeholder={field} 
        onChange={this.change} id={field} />
    }.bind(this))
    return (
      <div>
        <div className='section-label'>
          <h3>Booking Form</h3>
        </div>
        {rendered_fields}
        <button>Save Booking</button>
      </div> 
    ) 
  }
})

// TODO: this should be generalized into a FORM component
var PaymentForm = React.createClass({
  render: function () {
    var fields = ['date', 'type', 'reference', 'amount', 'notes']
    var rendered_fields = fields.map(function (field) {
      return <input type='text' placeholder={field} 
        onChange={this.change} id={field} />
    }.bind(this))
    return (
      <div>
        <div className='section-label'>
          <h3>Payment Form</h3>
        </div>
        { rendered_fields }
        <button>Save Payment</button>
      </div> 
    ) 
  }
})

var BookEvent = React.createClass({
  getInitialState: function () {
    return {
      events: [],
      payments: []
    } 
  },
  componentDidMount: function () {
    var parse_events_and_payments = curry(function (events_res, payments_res) {
      return {
        events: JSON.parse(events_res.body),
        payments: JSON.parse(payments_res.body)
      } 
    })
    Task.of(parse_events_and_payments)
      .ap(get('/api/events'))
      .ap(get('/api/payments?member=' + this.props.params.id))
      .fork(
        on_err.bind(this),
        function (state) { this.setState(state) }.bind(this)
      )
  },
  render: function () {
    return (
      <div>
        <Navigation />
        <div className='main-container'>
          <div className='section-label'>
            <h1>Book Event: {this.props.params.id} </h1> 
          </div>

          <div className='inner-section-divider-medium'></div> 
          <div className='section-label'>
            <h2>Payments</h2> 
          </div>
          <PaymentsTable payments={this.state.payments} mid={this.props.params.id} />
          
          <div className='inner-section-divider-medium'></div> 
          
          <div className='section-label'>
            <h2>Events</h2> 
          </div>
          <EventsTable events={this.state.events} />
          
          <div className='inner-section-divider-medium'></div> 
          
          <BookingForm />
          
          <PaymentForm />
        </div>
      </div>
    ) 
  }
})

module.exports = BookEvent
