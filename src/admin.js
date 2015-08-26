(function () {

  'use strict'

  var React = require('react')
  var routes = require('./admin_routes.js')()
  require('./styles/main.scss')

  React.render(routes, document.body)

}())
