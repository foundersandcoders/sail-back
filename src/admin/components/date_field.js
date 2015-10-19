var React = require('react')
var object_assign = require('object-assign')

module.exports = React.createClass({
  zero_pad: function (n) {
   return n < 10 ? '0' + n : n },

  date_to_sections: function (date_string) {
    console.log(date_string)
    var date = new Date(date_string)
    return [date.getDate(), date.getMonth(), ('' + date.getFullYear()).slice(2,4)] },

  date_to_value: function (date) {
    return this.date_to_sections(date).map(this.zero_pad).join('/') },

  ISO_from_UK: function (uk_string) {
    var sections = uk_string.split('/')
    return (new Date(sections[2], sections[1], sections[0])).toISOString() },

  change_handler: function (e) {
    var event = object_assign(e, {
      target:
        {value: this.ISO_from_UK(e.target.value) } })
    console.log('>>>>', event.target.value)
    this.props.onChange(event) },

  render: function () {
    return (
      <input
        value={this.date_to_value(this.props.value)}
        onChange={this.props.onChange}
        id={ this.props.id }
      /> )} })
