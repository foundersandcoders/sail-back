'use strict'

var React = require('react')

var SingleResult = React.createClass({
  last_subscription: function (payments) {
    /* TODO: pull callbacks out and give them clear name 
       TODO: filter out charges                           */

    var most_recent_payment =  payments.map(function (payment) {
      var dated_payment = Object.create(payment)
      dated_payment.date = new Date(payment.date)
      return dated_payment
    })
      .reduce(function (most_recent, payment) {
        return payment.date.getTime() > most_recent.date.getTime() ?
            payment :
            most_recent
      }, {date: {getTime: function () {return 0}}})

    return format_payment(most_recent_payment)
  },
  format_membership: function (string) {
      if (string) {
        return string.replace('-', ' ').split(' ').map(function (elm) {
          return elm.charAt(0).toUpperCase() + elm.slice(1)
        }).join(' ')
      } else return ''
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

// var data = [{
//   id: 1234,
//   title: 'Mr',
//   last_name: 'Fisher',
//   first_name: 'William',
//   initials: 'S',
//   payments: [],
//   membership_type: 'single-annual'
// },{
//   id: 1234,
//   title: 'Mr',
//   last_name: 'Fisher',
//   first_name: 'William',
//   initials: 'S',
//   payments: [],
//   membership_type: 'single-annual'
// },{
//   id: 1234,
//   title: 'Mr',
//   last_name: 'Fisher',
//   first_name: 'William',
//   initials: 'S',
//   payments: [],
//   membership_type: 'single-annual'
// },{
//   id: 1234,
//   title: 'Mr',
//   last_name: 'BESET',
//   first_name: 'William',
//   initials: 'S',
//   payments: [],
//   membership_type: 'single-annual'
// }]

var SearchResults = React.createClass({
  render: function () {

    var data = JSON.parse(this.props.results)
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

/* TODO: factor out date formatting (to utils/) */
function format_payment (payment) {
  var time = payment.date.getTime()
  if (!time) return ''
  var date_sections = payment.date.toString().split(' ')
  var date_string = [date_sections[2], date_sections[1], date_sections[3]].join(' ')
  return date_string + ' - £' + payment.amount
}
module.exports = SearchResults
