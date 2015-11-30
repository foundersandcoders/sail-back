(function () {

  'use strict'

  var ReactDOM = require('react-dom')
  var routes = require('./routes.js')()

  console.log('src/open/main.js')
  ReactDOM.render(routes, document.querySelector('#main'))

}())
