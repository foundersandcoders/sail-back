var format_if_necessary = require('./format_if_necessary')

module.exports = require('./curry')(function (space_replacement, data, header) {
  var to_grab = header.toLowerCase().replace(/ /g, space_replacement)
  return format_if_necessary(header)(data[to_grab])})
