'use strict'

var React = require('react')

var EventRow = React.createClass({
  render: function () {
    var event = JSON.parse(this.props.event)
    return (
	<div className='row event-row'>
	<div className='col-3'>
	<p>{event.date}</p>
      </div>
	<div className='col-2'>
	<p>{event.reference}</p>
      </div>
	<div className='col-1'>
	<p>{event.title}</p>
      </div>
	<div className='col-3'>
	<p>{event.time}</p>
      </div>
	<div className='col-4'>
	<p>{event.location}</p>
      </div>
	<div className='col-5'>
	<p>{event.host}</p>
      </div>
	<div className='col-6'>
	<p>{String(event.price_per_member)}</p>
      </div>
	<div className='col-6'>
	<p>{String(event.price_per_guest)}</p>
      </div>
      </div>
    )
  }
})

var MemberEvents = React.createClass({
  render: function () {

    var table_rows = JSON.parse(this.props.events).map(function (event) {
      event = JSON.stringify(event)
      return <EventRow event={event} />
    })

    return (
	<div id='events-section'>
	<div className='section-label'>
	<h1>Events</h1>
	</div>
	<div className='inner-section-divider-medium'></div>
	<div id='table-payments'>
	<div className='table-section-individual'>
	<div className='table-section-individual-header'>
	<div className='col-3'>
	<h3>Date</h3>
	</div>
	<div className='col-2'>
	<h3>Ref</h3>
      </div>
	<div className='col-1'>
	<h3>Description</h3>
      </div>
	<div className='col-3'>
	<h3>Time</h3>
      </div>
	<div className='col-4'>
	<h3>Location</h3>
      </div>
	<div className='col-5'>
	<h3>Host</h3>
      </div>
	<div className='col-6'>
	<h3>Price member</h3>
      </div>
	<div className='col-6'>
	<h3>Price guest</h3>
	</div>
	</div>
	<div className='table-section-individual-rows'>
	{ table_rows }
      </div>
      </div>
      </div>
      </div>
    )
  }
})

module.exports = MemberEvents
