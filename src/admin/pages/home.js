'use strict'

var React = require('react')

var Navigation = require('../../shared/navigation.js')
var SearchBox = require('../components/search_box.js')
var SearchResults = require('../components/search_results.js')

var AdminHome = React.createClass({

  render: function () {
    return (
	<div>
	<Navigation />
	<div className='container-large'>
	<div className='inner-section-divider-medium'></div>
	<div className='main-container'>
	<div className='inner-section-divider-small'></div>
	<div className='section-label'>
	<h1>Search Members</h1>
	</div>
	<div id='search-component'>
	<SearchBox />
	<SearchResults />
	</div>
	</div>
	</div>
	</div>
    )
  }
})

module.exports = AdminHome
