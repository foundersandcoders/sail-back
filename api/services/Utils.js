var uuid = require('uuid')

module.exports = {
  /**
   * Generates an activation record object with
   * @return {Object} - record with a code and an expire_date
   */
  factoryActivationCodes: function (memberId) {
    var now = new Date()
    var expire = now.setDate(now.getDate() + 7)

    var activation_code = {
      code: uuid.v4(),
      expire_date: new Date(expire),
      member: memberId
    }
    return activation_code
  },
  /**
   * Check if the date argument is older/newer than now.
   * @param  {Date}
   * @return {Boolean}
   */
  checkExpiration: function (expire_date) {
    return (new Date() - expire_date < 0)
  },
  email: require('./Email.js')
}
