module.exports = function format_if_necessary (header) {
  return header.toLowerCase().match('date') ?
    require('./format_date') :
    function (data) { return data } }
