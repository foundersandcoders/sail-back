var React = require('react')
var curry = require('curry')
var object_assign = require('object-assign')
var IncDec = require('./inc_dec.js')

module.exports = React.createClass({
  part_change: curry(function (self, part_string, change, e) {
    var date = self.update_date(part_string, change, new Date(self.props.value))
    var event = object_assign(e, {target: { value: date, id: self.props.id } })
    self.props.onChange(event) }),

  make_part: function (part_string) {
    var value = new Date(this.props.value)
    var change_this_part = this.part_change(this, part_string)
    return (
      <div className='date-part'>
        <input
          value={this.get_part_value(part_string, value)}
          className='date-part'
          readOnly
        />
        <IncDec
          increment={change_this_part(1)}
          decrement={change_this_part(-1)} />
      </div> )},

  get_part_value: curry(function (part_string, date) {
    return part_string === 'date' ?
        date.getDate() :
    part_string === 'month' ?
        date.getMonth() + 1 :
        date.getFullYear() }),

  update_date: function (part_string, change, d) {
    var curr_val = this.get_part_value(part_string, d)
    var date = new Date(d)
    part_string === 'date' ?
      date.setDate(curr_val + change) :
    part_string === 'month' ?
      date.setMonth(curr_val - 1 + change) :
      date.setFullYear(curr_val + change)
    return date },

  render: function () {
    return (
      <div className='date-input'>
        { this.make_part('date') }
        /
        { this.make_part('month') }
        /
        { this.make_part('year') }
      </div>)} })
