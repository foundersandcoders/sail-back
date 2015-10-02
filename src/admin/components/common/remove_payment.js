var request = require('xhr')

module.exports = function (id) {
  request({
    uri: '/api/payments/' + id,
    method: 'delete'
  }, function (err, data) {
    if (!err) {
      this.setState({
        payments: this.state.payments
          .filter(function (payment) { return payment.id !== id })})}}.bind(this))}
