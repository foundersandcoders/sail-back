/*global
  sails, Members, Payments, MembershipTypes, Events
*/

'use strict'

var test = require('tape')
var request = require('supertest')
var server = require('../_bootstrap/startServer.js')

var sails
var Cookies

test('Start server: ', function (t) {
  server(function (err, serverStarted) {
    if (err) {
      t.end(err)
    } else {
      sails = serverStarted
      t.ok(serverStarted, '..server started')
      t.end()
    }
  })
})

test('Sign in and get cookies', function (t) {
  request(sails.hooks.http.app)
    .post('/signup')
    .send({primary_email: 'eventMember@email.com', password: 'correct', membership_type: 'annual-corporate'})
    .end(function (err, res) {
      // console.log('FROM SIGNIN', res)

      Cookies = res.headers['set-cookie'].pop().split(';')[0]
      t.equals(res.statusCode, 200, 'sign up successful')
      t.ok(res.headers.location === '/user', 'redirect to members view')
      t.end()
    })
})

test('Book an event', function (t) {
  request(sails.hooks.http.app)
    .get('/api/current_events')
    .end(function (errEvents, resEvents) {
      var bookObj = {
        eventItem: resEvents.body[0],
        member: '4',
        guest: '1',
        total: '100'
      }

      var req = request(sails.hooks.http.app).post('/book_event')
      req.cookies = Cookies

      req
        .send(bookObj)
        .end(function (errBooking, resBooking) {
          if (errBooking) {
            console.log('ERROR REQUEST: ', errBooking)
            return t.end()
          }

          t.equals(resBooking.statusCode, 200, 'status code 200')

          Members
            .findOne()
            .where({primary_email: 'eventMember@email.com'})
            .populate('events_booked')
            .populate('payments')
            .exec(function (errMember, itemMember) {
              if (errMember) {
                console.log('ERROR: ', errMember)
                return t.end()
              }

              // console.log('MEMBER: ', itemMember)

              t.ok(itemMember.events_booked[0].id, 'event booked')
              t.equals(itemMember.events_booked[0].event_id, resEvents.body[0].id, 'right event booked')
              t.equals(itemMember.payments.pop().description, 'Event "' + resEvents.body[0].title + '"', 'right event')

              Events
                .findOne(resEvents.body[0].id)
                .populate('booking_records')
                .exec(function (errEventDb, itemEventDb) {
                  if (errEventDb) {
                    console.log('ERROR: ', errEventDb)
                    return t.end()
                  }

                  // console.log('Event: ', itemEventDb)

                  t.ok(itemEventDb.booking_records.length, 'booking record created')
                  t.equals(itemEventDb.booking_records.pop().head_member, itemMember.id, 'right head_member')
                  t.end()
                })
            })
        })
    })
})

test('Check in \'myEvents\'', function (t) {
  var req = request(sails.hooks.http.app).get('/api/my_events')
  req.cookies = Cookies

  req.end(function (err, res) {
    if (err) {
      console.log('ERROR: ', err)
      return t.end()
    }

    t.ok(res.body[0], 'event attached')
    t.end()
  })
})
