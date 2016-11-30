(function () {

  'use strict'

  var ReactDOM = require('react-dom')
  var routes = require('./routes.js')()

  // The following is provided so that axios will work with Internet Explorer
  require('es6-promise').polyfill()

  if (window.location.href.indexOf('/api/') === -1) {
    ReactDOM.render(routes, document.querySelector('#main'))
  }

})()
