var request = require('xhr')
var React = require('react')

module.exports = React.createClass({
  delete: function () {
    var props = this.props
    request({
      uri: '/api/payments/' + props.id,
      method: 'DELETE'
    }, function (err, data) { props.remove_payment(props.id) })},

   render: function () {
    return (<span onClick={this.delete}>x</span>)}})

