(function () {

  'use strict'

  var ReactDOM = require('react-dom')
  var routes = require('./routes.js')()
//  require('../styles/main.scss')

  if (window.location.href.indexOf('/api/') === -1) {
    ReactDOM.render(routes, document.body)
  }

}())
