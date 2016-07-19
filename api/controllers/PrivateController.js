/*global
  Members, sails
*/

var Is = require('torf')
var Upload = require('../services/Upload.js')()
var mg = require('../services/email_mailgun.js')
var aSync = require('async')

var queries = require('../queries/private.js')

module.exports = {
  showAdminHome: function (req, res) {
    res.view('pages/admin', {user: req.session.user})
  },
  showUserHome: function (req, res) {
    res.view('pages/user', {user: req.session.user})
  },
  showMemberForm: function (req, res) {
    res.view('pages/new-member', {user: req.session.user})
  },
  addmember: function (req, res) {
    var member = req.allParams()
    member.date_joined = (Is.ok(member.date_joined) ? member.date_joined : null)
    member.life_payment_date = (Is.ok(member.life_payment_date) ? member.life_payment_date : null)
    member.due_date = (Is.ok(member.due_date) ? member.due_date : null)
    member.date_gift_aid_signed = (Is.ok(member.date_gift_aid_signed) ? member.date_gift_aid_signed : null)
    member.date_gift_aid_cancelled = (Is.ok(member.date_gift_aid_cancelled) ? member.date_gift_aid_cancelled : null)
    member.primary_email = (Is.ok(member.primary_email) ? member.primary_email : null)

    Members
      .create(req.allParams())
      .exec(function (err, item) {
        if (err) {
          res.json(err)
        } else {
          res.json(item)
        }
      })
  },
  showMember: function (req, res) {
    /* TODO: redo so it uses applicative functor pattern to simultaneously get events */
    Members
      .findOne(req.param('id'))
      .populateAll()
      .exec(function (err, item) {
        if (Is.ok(err) || !Is.ok(item)) {
          return res.notFound()
        } else {
          return res.json(item)
        }
      })
  },
  sendSubsReminder: function (req, res) {
    Members.query(queries.subscriptions, function (err, results) {
      if (err) return res.badRequest({ error: err })
      return res.json({ results })
    })
  },
  sendSubsDueEmail: function (req, res) {
    Members.query(queries.subscription_due_online, function (err, results) {
      if (err) return res.badRequest({ error: err })
      return res.json({ results })
    })
  },
  sendSubsDuePost: function (req, res) {
    var inject = cb => {
      Members.query(queries.update_subscription(req.body), (err, results) => {
        if(err) cb(err, null)
        else cb(null, results)
      })
    }
    var get_members = cb => {
      Members.query(queries.subscription_due_post(req.body), (err, results) => {
        if(err) cb(err, null)
        else cb(null, results)
      })
    }
    var callback = (err, results) => {
      if (err) return res.badRequest({ error: err })
      return res.json({ results })
    }
    aSync.series([inject, get_members], callback)
  },
  sendNewsletterAlert: function (req, res) {
    Members.query(queries.newsletter, function (err, results) {
      if (err) return res.badRequest({ error: err })
      return res.json({ results })
    })
  },
  getNewsletterLabels: function (req, res) {
    Members.query(queries.newsletter_labels, function (err, results) {
      if (err) return res.badRequest({ error: err })
      return res.json({ results })
    })
  },
  getPostMembers: function (req, res) {
    Members.query(queries.newstype_post, function (err, results) {
      if (err) return res.badRequest({ error: err })
      return res.json( { results } )
    })
  },
  sendSubsReminderPost: function (req, res) {
    Members.query(queries.newstype_post_nonzero, function (err, results) {
      if (err) return res.badRequest({ error: err })
      return res.json( { results } )
    })
  },
  showMaintenance: function (req, res) {
    res.view('pages/maintenance', {user: req.session.user})
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
        return res.send(result)
      })
    } else if (req.query.type === 'payments') {
      Upload.payments(csv, function (err, result) {
        sails.log.info('Payment upload: ', result)

        return res.send(result)
      })
    } else {
      return res.badRequest()
    }
  },
  submit_email: function (req, res) {
    mg.submitEmail(req.body, function(err, result){
      if (err) return res.badRequest({ error: err })
      return res.json( { result } )
    })
  }
}
