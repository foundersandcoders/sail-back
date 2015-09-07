'use strict'

module.exports = function format_date (date) {
  date = new Date(date) // allows arg to be date string

  var date_sections = date.toString().split(' ')
  return [date_sections[2], date_sections[1], date_sections[3]].join(' ') }
