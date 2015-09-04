'use strict'

var React = require('react')
var request = require('xhr')

var value_of = function (ref) {
  return React.findDOMNode(ref).value
}

var make_query = function () {
  var vals = {
    email: value_of(this.refs.email),
    id: value_of(this.refs.id),
    last_name: value_of(this.refs.last_name)
  }
  return Object.keys(vals)
    .filter(function (key) {
      return (vals[key] !== undefined && vals[key] !== null && vals[key].length)
    })
    .reduce(function (agg, key) {
      agg[key] = vals[key]
      return agg
    }, {})
}

var SearchBox = React.createClass({

  search: function () {
    var query = make_query.bind(this)()
    var updateResults = this.props.updateResults
    request({
      method: 'GET',
      url: '/api/members?where=' + JSON.stringify(query) + '&populate=[payments]'
    }, function (err, resp, body) {
      updateResults(body)
    })
  },
  render: function () {
    return (
	<div className='search-component'>
	<div className='search-container'>
	<select id='member-status' defaultValue='activated'>
	<option value='activated'>Active</option>
	<option value='deactivated'>Deleted</option>
	</select>
	<input className='input-member' ref='id' id='id' placeholder='Number' />
	<input className='input-member' ref='email' id='email' placeholder='Email' />
	<input className='input-member' ref='last_name' id='last_name' placeholder='Surname' />
	<button onClick={this.search} className='button-two member' id='search-button'>Search</button>
	<p id='test' ref='test'></p>
      </div>
      </div>
    )
  }
})

module.exports = SearchBox
