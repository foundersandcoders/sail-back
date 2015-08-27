(function () {

  'use strict'

  var React = require('react')
  var routes = require('./routes.js')()
  require('../styles/main.scss')

  React.render(routes, document.body)

}())
