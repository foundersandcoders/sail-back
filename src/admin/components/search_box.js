'use strict'

var React = require('react')
var request = require('xhr')
var object_assign = require('object-assign')
var Spinner = require('../../shared/spinner.js')

var make_query = function () {
  var email = value_of(this.refs.email)
  var vals = {
    id: value_of(this.refs.id),
    last_name: value_of(this.refs.last_name),
    activation_status: value_of(this.refs.activation_status)
  }

  var filtered_vals = get_actual_values(vals)

  function add_in_filtered (obj) { return object_assign(obj, filtered_vals) }

  return !!email ? { or: [ add_in_filtered({primary_email: email}),
    add_in_filtered({secondary_email: email}) ] } : filtered_vals }

function value_of (ref) {
  return React.findDOMNode(ref).value }

function get_actual_values (object) {
  return Object.keys(object)
    .filter(function (key) {
      return ( !!object[key] || object[key] === false ) })
    .reduce(function (agg, key) {
      agg[key] = object[key]
      return agg }, {}) }

var SearchBox = React.createClass({

  getInitialState: function () {
    return { loading: false } },

  search: function () {
    var query = make_query.bind(this)()
    var updateResults = this.props.updateResults
    this.setState({ loading: true })
    request({
      method: 'GET',
      url: '/api/members?where=' + JSON.stringify(query) + '&populate=[payments]'
    }, function (err, resp, body) {
      this.setState({ loading: false })
      updateResults(body)
    }.bind(this))
  },
  render: function () {
    return (
      <div className='search-component'>
        <div className='search-container'>
          <select id='member-status' ref='activation_status'
              defaultValue='activated'>
            <option value='activated'>Active</option>
            <option value='deactivated'>Deleted</option>
          </select>
          <input className='input-member' ref='id' id='id' placeholder='Number' />
          <input className='input-member' ref='email' id='email'
              placeholder='Email' />
          <input className='input-member' ref='last_name' id='last_name'
              placeholder='Surname' />
          <button onClick={this.search} className='button-two member'
              id='search-button'>Search</button>
          <p id='test' ref='test'></p>
        </div>
        { this.state.loading ? <Spinner /> : '' }
      </div>
    )}})

module.exports = SearchBox
