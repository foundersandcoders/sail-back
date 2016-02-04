'use strict'

var React = require('react')

var Navigation = require('../../shared/navigation.js')
var SearchBox = require('../components/search_box.js')
var SearchResults = require('../components/search_results.js')
var request = require('xhr')

var AdminHome = React.createClass({
  getInitialState: function () {
    return {
      results: '[]',
      none_found: false
    }
  },
  updateResults: function (data) {
    this.setState({
      results: data
    })
  },
  none_found: function () {
    this.setState({ none_found: true })
  },
  render: function () {
    return (
      <div>
        <div className='container-large'>
          <div className='inner-section-divider-medium'></div>
          <div className='main-container'>
            <div className='inner-section-divider-small'></div>
            <div className='section-label'>
              <h1>Search Members</h1>
            </div>
            <div id='search-component'>
              <SearchBox
                updateResults={this.updateResults}
                none_found={this.none_found}
              />
              <SearchResults
                results={this.state.results}
                error={this.state.none_found}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = AdminHome
