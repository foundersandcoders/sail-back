/*global
  Members, sails, Payments
*/

var Is = require('torf')
var Upload = require('../services/Upload.js')()
var mg = require('../services/email_mailgun.js')
var async = require('async')
var R = require('ramda')

var queries = require('../queries/private.js')
var helpers = require('./helpers.js')
var response_callback = helpers.response_callback
var change_view = helpers.change_view
var get_balance = require('app/get_balance')

var membersQuery = function (query, type) {
  return function (req, res) {
    Members.query(queries[query](type), response_callback(res))
  }
}

module.exports = {
  showAdminHome: change_view('pages/admin'),
  showUserHome: change_view('pages/user'),
  sendNewsletterAlert: membersQuery('newsletter_reminder'),
  sendCustomEmail: membersQuery('custom_email'),
  getNewsletterLabels: membersQuery('newsletter_labels'),
  subsReminder: membersQuery('subsReminderQuery', 'online'),
  subsReminderPost: membersQuery('subsReminderQuery', 'post'),

  submit_email: function (req, res) {
    mg.submitEmail(req.body, response_callback(res))
  },
  get_bounced: function (req, res) { //eslint-disable-line
    mg.getBounced(response_callback(res))
  },

  reset_subscription_payments: function (req, res) { //eslint-disable-line
    Payments.query(queries.reset_subscription_payments, response_callback(res))
  },

  addmember: function (req, res) {
    var member = req.allParams()

    var deleteKey = function (key) {
      if (!Is.ok(member[key])) delete member[key]
    }

    R.forEach(deleteKey, R.keys(member))

    // TODO: the following is a temporary fix until a better solution is found. Solves the problem of the following fields being
    // focused on, but their value not being changed (on add member form in admin view).
    // This means that the value '-- select an option --' gets sent up

    member.gift_aid_signed = member.gift_aid_signed === '-- select an option --' ? false : member.gift_aid_signed
    member.email_bounced = member.email_bounced === '-- select an option --' ? false : member.email_bounced
    member.standing_order = member.standing_order === '-- select an option --' ? false : member.standing_order

    Members
      .create(member)
      .exec(function (err, item) {
        if (err) {
          res.json(err)
        } else {
          res.json(item)
        }
      })
  },
  showMember: function (req, res) {
    Members
      .findOne(req.param('id'))
      .populate('events_booked')
      .populate('membership_type')
      .populate('payments', {
        where: { date: { '>': new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000) }}
      })
      .exec(function (err, item) {
        if (Is.ok(err) || !Is.ok(item)) {
          return res.notFound()
        } else {
          return res.json(item)
        }
      })
  },
  sendSubsDue: function (req, res) {
    var response_callback = (err, results) => {
      if (err) return res.badRequest({ error: err })
      return res.json({ results: results[0] })
    }

    var dbCall = queryString => cb => {
      Members.query(queries[queryString](req.body), cb)
    }

    async.series(
      [ dbCall('subscription_due_template')
      , dbCall('update_subscription')
      ]
      , response_callback
    )
  },
  Upload: function (req, res) {
    /**
     *  The sign '&' (ampersand) splits the
     *  request body content in different objects
     *  where all the keys are the data.
     *
     *  Examples:
     *
     *  {
     *    '6095;Mr ': '',
     *    ' Mrs;J H;Adams;': ''
     *  }
     *
     *  The original line was: '6095;Mr & Mrs;J H;Adams;'
     */
    var csv = req.body

    if (req.query.type === 'members') {
      Upload.members(csv, function (err, result) {
        if (err) console.error(err)
        return res.send(result)
      })
    } else if (req.query.type === 'payments') {
      Upload.payments(csv, function (err, result) {
        if (err) console.error(err)
        sails.log.info('Payment upload: ', result)
        return res.send(result)
      })
    } else {
      return res.badRequest()
    }
  },

  // Analysis Endpoint Logic
  // ---------------------------------------------------------------------------
  list_gift_aid: function (req, res) {
    var status_mapper = { true: true, false: false, null: null }
    Members
      .find({ gift_aid_signed: status_mapper[req.param('status')] })
      .exec(function (err, items) {
        return err ? res.json(err) : res.json(items)
      })
  },

  list_by_membership: function (req, res) {
    Members
      .find({ membership_type: req.param('membership') })
      .exec(function (err, items) {
        return err ? res.json(err) : res.json(items)
      })
  },

  list_email_bounced: function (req, res) {
    var status_mapper = { true: true, false: false, null: null }
    Members
      .find({ email_bounced: status_mapper[req.param('status')] })
      .exec(function (err, items) {
        return err ? res.json(err) : res.json(items)
      })
  },

  list_deliverers: membersQuery('list_deliverers'),

  list_by_deliverer: function (req, res) {
    var deliverer = req.param('deliverer') === 'null' ? null : req.param('deliverer')
    Members
      .find({ deliverer })
      .exec(function (err, items) {
        return err ? res.json(err) : res.json(items)
      })
  },

  list_120_overdue: function (req, res) {
    Members
      .find( { activation_status: 'activated' })
      .populate('payments')
      .exec(function (err, members) {
        if (Is.ok(err) || !Is.ok(members)) {
          return res.notFound()
        } else {
          var payments_by_date = R.pipe(R.map(R.over(R.lensProp('date'), Date.parse)), R.sortBy(R.prop('date')))

          // R.filter(R.has(member)) is used here as the members array has a couple of functions in it (these are some methods provided by sails)
          // we want to get rid of these functions and just deal with data

          var tidied_members = R.over(R.lensProp('payments'), R.compose(R.filter(R.has('member'))))
          var outstanding_members = R.pipe(R.prop('payments'), get_balance, R.lt(0))
          var overdue_members = R.pipe(R.prop('payments'), payments_by_date, R.last, R.prop('date'), R.gt(Date.now() - 120 * 24 * 60 * 60 * 1000))

          // fields are pick here because payments array does not get sent to front-end otherwise (not sure why this happens)

          var fields = [ 'id', 'first_name', 'payments', 'last_name', 'initials', 'membership_type', 'due_date', 'date' ]
          var pick_fields = R.pick(fields)

          var formatted_overdue_members = R.pipe(R.map(R.pipe(tidied_members, pick_fields)), R.filter(outstanding_members), R.filter(overdue_members))(members)
          return res.json(formatted_overdue_members)
        }
      })
  },

  get_numbers_report: function (req, res) {
    var default_query = (key, value) => `select count(*) from members where ${key}='${value}' and activation_status='activated'`
    var gift_aid_query = () => `select count(*) from members where activation_status='activated' and gift_aid_signed is true`  //eslint-disable-line
    var email_query = () => `select count(*) from members where activation_status='activated' and primary_email is not null` //eslint-disable-line
    var no_email_query = () => `select count(*) from members where activation_status='activated' and primary_email is null and secondary_email is null` //eslint-disable-line

    var member_query = query => (key, value) => cb => Members.query(query(key, value), function (err, results) {
      if (err) console.error(err)
      return cb(null, R.prop('count(*)', results[0]))
    })

    return async.parallel({
      'annual-single': member_query(default_query)('membership_type', 'annual-single'),
      'annual-double': member_query(default_query)('membership_type', 'annual-double'),
      'annual-family': member_query(default_query)('membership_type', 'annual-family'),
      'life-single': member_query(default_query)('membership_type', 'life-single'),
      'life-double': member_query(default_query)('membership_type', 'life-double'),
      'annual-corporate': member_query(default_query)('membership_type', 'annual-corporate'),
      'annual-group': member_query(default_query)('membership_type', 'annual-group'),
      'accounts': member_query(default_query)('membership_type', 'accounts'),
      'activated': member_query(default_query)('activation_status', 'activated'),
      'registered': member_query(default_query)('registered', 'registered'),
      'unregistered': member_query(default_query)('registered', 'unregistered'),
      'post': member_query(default_query)('news_type', 'post'),
      'online': member_query(default_query)('news_type', 'online'),
      'no_gift_aid': member_query(default_query)('gift_aid_signed', 'false'),
      'gift_aid': member_query(gift_aid_query)(),
      'email': member_query(email_query)(),
      'no_email': member_query(no_email_query)()
    }, function (err, results) {
      if (err) return res.badRequest(err)
      return res.json(results)
    })
  }
}
