(function () {

  'use strict'

  var React = require('react')
  var routes = require('./routes.js')()
  require('../styles/main.scss')

  if (window.location.href.indexOf('/api/') === -1) {
    console.log('reacting')
    React.render(routes, document.body)
  }

}())
