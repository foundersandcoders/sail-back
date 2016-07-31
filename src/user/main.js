(function () {

  'use strict'

  var ReactDOM = require('react-dom')
  var routes = require('./routes.js')()

  if (window.location.href.indexOf('/api/') === -1) {
    ReactDOM.render(routes, document.querySelector('#main'))
  }

}())
