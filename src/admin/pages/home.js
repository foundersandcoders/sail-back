'use strict'

var React = require('react')

var Navigation = require('../../shared/navigation.js')
var SearchBox = require('../components/search_box.js')
var SearchResults = require('../components/search_results.js')
var request = require('xhr')

var AdminHome = React.createClass({
  getInitialState: function () {
    return {
      results: '[]'
    }
  },
  updateResults: function (data) {
    this.setState({
      results: data
    })
  },
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
            <a id='events-btn' href='/#/events'>Events</a>
              <SearchBox updateResults={this.updateResults} />
              <SearchResults results={this.state.results} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = AdminHome
