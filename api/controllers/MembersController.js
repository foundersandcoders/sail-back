/* global
   Members, BookingRecords
*/

/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var R = require('ramda')
var sendSubscribe = require('../services/email_mailgun.js').sendSubscribe

module.exports = {
  accountInfo: function (req, res) {
    Members
      .findOne(req.session.user.id)
      .populate('events_booked')
      .populate('membership_type')
      .populate('payments', {
        where: { date: { '>': new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000) }}
      })
      .exec(function (error, item) {
        if (error) {
          return res.notFound()
        } else {
          return res.send(item)
        }
      })
  },
  updateAccountInfo: function (req, res) {
    const member = req.body
    member.id = req.session.user.id
    Members
      .update({
        id: req.session.user.id
      }, member)
      .exec(function (error, items) {
        if (error) {
          return res.serverError(error)
        } else {
          return res.send(items[0])
        }
      })
  },

  getMyEvents: function (req, res) {
    get_user_events(respond_with_event_data(res), req.session.user.id)
  },

  admin_get_user_events: function (req, res) {
    get_user_events(respond_with_event_data(res), req.param('id'))
  },

  get_user_events: get_user_events,

  welcome: function (req, res) {
    sendSubscribe(req.body, function (err, data) {
      if (err) return res.badRequest(err)
      return res.json(data)
    })
  }
}

function get_user_events (cb, id) {
  BookingRecords
    .find({head_member: id})
    .populate('event_id')
    .exec(cb)
}

var respond_with_event_data = R.curry(function (res, err, data) {
  if (err) res.serverError({error: err})
  else res.send(R.pluck('event_id', data))
})
