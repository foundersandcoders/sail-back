'use strict'

var dateConverter = require('./dateconverter.js')

module.exports = processEvents

function processEvents (events) {
  return dateConverter(events)
}
