'use strict'

var React = require('react')
var Task = require('data.task')

var get = require('../../utils/get')
var post = require('../../utils/post')
var format_date = require('../../utils/format_date')
var on_err = require('../../shared/error_handler')
var curry = require('../../utils/curry')
var change = require('../../shared/on_change.js')
var request = require('xhr')

var Navigation = require('../../shared/navigation')
var Form = require('../../shared/form.js')
var Title = require('../../shared/title')

var PaymentsTable = require('../components/payments_table')

var EventsTable = require('../components/events_table')


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
      </div>)}})

var payment_form_fields = [ {component: Title, opts: {title: 'Payment Form'}},
    'date', 'type', 'reference', 'amount', 'notes', {type: 'submit', value:
    'Save Payment'} ]
var booking_form_fields = [ {component: Title, opts: {title: 'Booking Form'}},
    'number_of_members', 'number_of_guests', {type: 'submit',
      value: 'Save Booking'}]

var BookEvent = React.createClass({
  getInitialState: function () {
    return {
      events: [],
      payments: [],
      booking_form: {},
      payment_form: {},
    }
  },
  booking_save: function () {
    post('/api/bookingrecords', {
      head_member: this.props.params.id,
      event_id: this.state.selected_event.id,
      number_of_guests: +this.state.booking_form.number_of_guests,
      number_of_members: +this.state.booking_form.number_of_members 
    })
    .fork(
        on_err,
        function(x) {console.log(x)})},
  componentDidMount: function () {
    var parse_events_and_payments = curry(function (events_res, payments_res) {
      return {
        events: JSON.parse(events_res.body),
        payments: JSON.parse(payments_res.body) }})

    Task.of(parse_events_and_payments)
      .ap(get('/api/events'))
      .ap(get('/api/payments?member=' + this.props.params.id))
      .fork(
        on_err.bind(this),
        function (state) { this.setState(state) }.bind(this)
      )},

  change_booking: function (e) {
    return require('../../shared/on_change.js').call(this, 'booking_form', e)
  },
  change_payments: function (e) {
    return require('../../shared/on_change.js').call(this, 'payment_form', e)
  },
  event_row_click_handler: function (i) {
    return function () {
      this.setState({ selected_event: this.state.events[i] }) }.bind(this) },
  add_payment: require('../../shared/add_payment.js'),
  remove_payment: require('../components/common/remove_payment.js'),

  render: function () {
    console.log(this.state)
    return (
      <div className='book-event'>
        <Navigation />
        <div className='main-container'>
          <div className='section-label'>
            <h2>Book Event: {this.props.params.id} </h2>
          </div>

          <div className='inner-section-divider-medium'></div>
          <div className='section-label'>
            <p>{this.thing}</p>
            <h3>Payments</h3>
          </div>
          <PaymentsTable payments={this.state.payments}
              remove_payment={this.remove_payment}
              mid={this.props.params.id} />

          <div className='inner-section-divider-medium'></div>

          <div className='section-label'>
            <h3>Events</h3>
          </div>
          <EventsTable events={this.state.events}
              selected={this.state.events.indexOf(this.state.selected_event)}
              onClick={this.event_row_click_handler}
          />

          { this.state.selected_event ?
            <div id='forms'>
              <div className='inner-section-divider-medium'></div>

              <div className='booking-form'>
                <Form
                    fields={booking_form_fields}
                    data={this.state.booking_form}
                    on_save={this.booking_save}
                    onChange={this.change_booking} />
              </div>
              <div className='payment-form'>
              <Form
                  fields={payment_form_fields}
                  data={this.state.payment_form}
                  on_save={this.add_payment}
                  onChange={this.change_payments} />
              </div>
            </div> :
            ''
          }
        </div>
      </div> )}})

module.exports = BookEvent
