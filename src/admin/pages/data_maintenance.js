'use strict'

var React = require('react')

var Navigation = require('../../shared/navigation.js')

var DataMaintenance = React.createClass({

  render: function () {
    return (
	<div>
	<Navigation />
	<div className='container-large'>
	<div className='main-container'>
	<div className='inner-section-diider-small'></div>
	<div className='section-label'>
	<h1>Data maintenance</h1>
	</div>
	</div>
	</div>
	</div>
    )
  }
})

module.exports = DataMaintenance
