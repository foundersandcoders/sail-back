var request = require('xhr')
var React = require('react')

module.exports = React.createClass({
  delete: function () {
    request({
      uri: '/api/payments/' + this.props.id,
      method: 'DELETE'
    }, function (err, data) { console.log(err, data) })},

   render: function () {
    return (<span onClick={this.delete}>x</span>)}})

