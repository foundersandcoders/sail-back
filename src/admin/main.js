(function () {

  'use strict'

  var { render } = require('react-dom')
  var routes = require('./routes.js')()

  console.log('src/admin/main.js')
  render(routes, document.querySelector('#main'))

}())
