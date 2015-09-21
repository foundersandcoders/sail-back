'use strict'

var React = require('react')
var Task = require('data.task')

var get = require('../../utils/get')
var on_err = require('../../shared/error_handler')
var curry = require('../../utils/curry')
var change = require('../../shared/on_change')

var Table = require('../components/table')
var Navigation = require('../../shared/navigation')
var Form = require('../../shared/form')
var Title = require('../../shared/title')

var PaymentsTable = require('../components/payments_table.js')

var EventsTable = React.createClass({
  render: function () {
    
    var headers = ['Date', 'Reference', 'Short Description', 
      'Time', 'Location', 'Host', 'Price per member', 
      'Price per guest', 'Max number of guests', 'Total places available', 
      'Open for booking']
  
  var get_entry_for_event = require('../../utils/curry')(function (ev, header) {
    return ev[header.toLowerCase()] })
    
    var entries = (this.props.events || [])
      .map(function (event) {
        return headers.map(get_entry_for_event(event)) 
      })
    
    return (
      <Table className='events-table' data={[headers, entries]} />
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

var payment_form_fields = [ {component: Title, opts: {title: 'Payment Form'}}, 
    'date', 'type', 'reference', 'amount', 'notes', {type: 'submit', value: 'Save Payment'} ]
var booking_form_fields = [ {component: Title, opts: {title: 'Booking Form'}}, 'number_of_members', 'number_of_guests', {type: 'submit', value: 'Save Booking'}]

var BookEvent = React.createClass({
  getInitialState: function () {
    return {
      events: [],
      payments: [],
      booking_form: {},
      payment_form: {}
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
  change_booking: function (e) { 
    return require('../../shared/on_change.js').call(this, 'booking_form', e)
  },
  change_payments: function (e) { 
    return require('../../shared/on_change.js').call(this, 'payment_form', e)
  },
  render: function () {
    return (
      <div className='book-event'>
        <Navigation />
        <div className='main-container'>
          <div className='section-label'>
            <h2>Book Event: {this.props.params.id} </h2>
          </div>

          <div className='inner-section-divider-medium'></div> 
          <div className='section-label'>
            <h3>Payments</h3> 
          </div>
          <PaymentsTable payments={this.state.payments} mid={this.props.params.id} />
          
          <div className='inner-section-divider-medium'></div> 
          
          <div className='section-label'>
            <h3>Events</h3> 
          </div>
          <EventsTable events={this.state.events} />
          
          <div className='inner-section-divider-medium'></div> 
         
          <div className='booking-form'>
            <Form fields={booking_form_fields} data={this.state.booking_form} 
                onChange={this.change_booking} /> 
          </div>
          <div className='payment-form'>
          <Form fields={payment_form_fields} data={this.state.payment_form}
              onChange={this.change_payments} /> 
          </div>
        </div>
      </div>
    ) 
  }
})

module.exports = BookEvent
