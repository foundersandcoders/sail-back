'use strict'

var React = require('react')
var Navigation = require('../../shared/navigation.js')
var post = require('../../utils/post')
var on_err = require('../../shared/error_handler')
var to_title_case = require('../../utils/to_title_case')

var default_event_state = {
  title: '',
  reference: '',
  short_description: '',
  long_description: '',
  date: '',
  time: '',
  location: '',
  host: '',
  price_per_member: '',
  price_per_guest: '',
  max_number_of_guests: '',
  total_places_available: '',
  open_for_booking: '',
  disability_note: ''
}

var Events = React.createClass({
  getInitialState: function () {
    return default_event_state 
  },
  change: function (e) {
    var state = require('../../utils/clone')(this.state)
    state[e.target.id] = e.target.value
    console.log(state)
    this.setState(state)
  },
  save: function () {
    var ev = require('../../utils/clone')(this.state)
    ev.date = new Date(ev.date)
    post('/api/events', ev).fork(on_err.bind(this), function (res, body) {
      window.location.hash = '#/'
    }.bind(this))
  },
  render: function () {
    var fs = Object.keys(default_event_state).map(function (f, i) {
      return <input id={f.replace(/_/g, '-')} key={i} ref={f} 
        placeholder={ to_title_case(f.replace(/_/g, ' ')) } 
        onChange={this.change} /> 
    }.bind(this))
    return (
      <div>
        <Navigation />
        <h1>Add Event</h1>
        <p>{this.state.error}</p>
        { fs }
        <button onClick={this.save} >Save</button>
      </div>
    ) 
  }
})

module.exports = Events
