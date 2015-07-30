'use strict'

var nuclear = require('nuclear.js')
var utils   = require('../utils.js')

module.exports = Messenger

function Messenger (opts) {

  opts = opts || {}

  return nuclear.observS(opts)
}

Messenger.render = function (state) {

  var h = nuclear.h

  console.log('Start!')

  setTimeout(function () {

    console.log('Close!')

    state.error.set({})
  }, 1500)


  return (
    h('div#messenger', [
      h('h2', 'Hello world!')
    ])
  )
  
}
