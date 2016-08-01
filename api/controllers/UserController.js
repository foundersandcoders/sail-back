var queries = require('../queries/user.js')
var helpers = require('./helpers.js')

module.exports = {
  newsletterToOnline: (req, res) => Members.query
    ( queries.newsletter_online, [req.session.user.id], helpers.sql_response(res))
}
