'use strict'

var React = require('react')

var SingleResult = React.createClass({
  last_subscription: function (payments) {
    return payments
  },
  format_membership: function (string) {
      return string.replace('-', ' ').split(' ').map(function (elm) {
        return elm.charAt(0).toUpperCase() + elm.slice(1)
      }).join(' ')
  },
  render: function () {
    var member = JSON.parse(this.props.member)
    return (
	<a id='member-tag' href={'#/members/' + member.id}>
	<div className='row member-row'>
	<div className='col-1'>
	<p>{ member.id.toString()}</p>
	</div>
	<div className='col-2'>
	<p>{ member.last_name + ' ' + member.first_name}</p>
	</div>
	<div className='col-3'>
	<p>{member.title}</p>
	</div>
	<div className='col-4'>
	<p>{member.initials}</p>
	</div>
	<div className='col-5'>
	<p>{this.format_membership(member.membership_type)}</p>
	</div>
	<div className='col-6'>
	<p>{this.last_subscription(member.payments)}</p>
	</div>
      </div>
      </a>
    )
  }
})

var data = [{
  id: 1234,
  title: 'Mr',
  last_name: 'Fisher',
  first_name: 'William',
  initials: 'S',
  payments: [],
  membership_type: 'single-annual'
},{
  id: 1234,
  title: 'Mr',
  last_name: 'Fisher',
  first_name: 'William',
  initials: 'S',
  payments: [],
  membership_type: 'single-annual'
},{
  id: 1234,
  title: 'Mr',
  last_name: 'Fisher',
  first_name: 'William',
  initials: 'S',
  payments: [],
  membership_type: 'single-annual'
},{
  id: 1234,
  title: 'Mr',
  last_name: 'BESET',
  first_name: 'William',
  initials: 'S',
  payments: [],
  membership_type: 'single-annual'
}]

var SearchResults = React.createClass({
  render: function () {

    var results = data.map(function (result) {
      result = JSON.stringify(result)
      return <SingleResult member={result} />
    }.bind(this))

    return (
      <div id='search-result'>
	<div className='search-table-section-member'>
	<div className='search-table-section-member-header'>
	<div className='col-1'>
	<p>ID</p>
	</div>
	<div className='col-2'>
	<p>Name</p>
	</div>
	<div className='col-3'>
	<p>Title</p>
	</div>
	<div className='col-4'>
	<p>Initials</p>
	</div>
	<div className='col-5'>
	<p>Subscription</p>
	</div>
	<div className='col-6'>
	<p>Payment</p>
	</div>
	</div>
	<div className='search-table-section-member-rows'>
	{results}
      </div>
	</div>
	</div>
    )
  }
})

module.exports = SearchResults
