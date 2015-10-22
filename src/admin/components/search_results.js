'use strict'

var React = require('react')
var format_date = require('app/format_date.js')
var to_title_case = require('app/to_title_case.js')

var SingleResult = React.createClass({
  last_subscription: function (payments) {

    var most_recent_payment = payments
      .filter(is_payment)
      .map(add_date_obj_to_payment)
      .reduce(get_most_recent_payment, {date: {getTime: function () {return 0}}})

    return format_payment(most_recent_payment)
  },
  format_membership: function (string) {
    return string ? to_title_case(string.replace(/-/g, ' ')) : '' },
  safe_name: function (string) {
    return string ? string : '' },
  render: function () {
    var member = JSON.parse(this.props.member)
    return (
  <a id='member-tag' href={'#/members/' + member.id}>
  <div className='row member-row'>
  <div className='col-1'>
  <p>{ member.id.toString()}</p>
  </div>
  <div className='col-2'>
  <p>{ this.safe_name(member.last_name) + ' ' +
    this.safe_name(member.first_name)}</p>
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

function format_payment (payment) {
  var time = payment.date.getTime()
  if (!time) return ''
  return format_date(time) + ' - £' + payment.amount }

function add_date_obj_to_payment (payment) {
      var dated_payment = Object.create(payment)
      dated_payment.date = new Date(payment.date)
      return dated_payment }

function get_most_recent_payment (most_recent, payment) {
        return payment.date.getTime() > most_recent.date.getTime() ?
            payment :
            most_recent
}

function is_payment (payment) { return payment.category === 'payment' }

module.exports = SearchResults
