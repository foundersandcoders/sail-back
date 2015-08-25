/*global
  location
*/

'use strict'

require('../styles/main.scss');

var nuclear = require('nuclear.js')

var utils = module.exports.utils = {
  is: require('torf'),
  clean: require('d-bap'),
  lazy: require('lazy.js'),
  diff: require('virtual-dom/diff'),
  patch: require('virtual-dom/patch'),
  createElement: require('virtual-dom/create-element'),
  request: require('./services/request.js').request,
  upload: require('upload-element'),
  moment: require('moment'),
  observ: require('observ'),
  observS: require('observ-struct'),
  observA: require('observ-array'),
  h: require('virtual-dom/h'),
  $$: require('./services/jquery.like.js'),
  createOpts: require('./services/request').createOpts,
  parseCsv: require('./services/parsecsv.js').parse,
  replaceNice: require('./helpers').replaceNice,
  lastSub: require('./helpers').lastSub,
  vDomHelpers: require('./services/vdom'),
  mocks: require('./services/mockdata.js'),
  orderPayments: require('./helpers').orderPayments,
  balanceDue: require('./helpers').balanceDue
}

try {
  var searchAdmin = require('./pages/adminhome.js')
  var appendNode = document.getElementById('search-component')
  nuclear.app(appendNode, searchAdmin(), searchAdmin.render)
} catch (e) {
  console.log('Search component: ', e)
}

try {
  if (window.location.pathname.split('/')[1] === 'members') {
    var Admin = require('./pages/admin.js')

    getMemberById(function (error, header, body) {
      getEventsInfo(function (errorEvents, headerEvents, bodyEvents) {
        var member = JSON.parse(body)
        var payments = utils.balanceDue(member.payments)
        var bookings = member.events_booked
        var events = JSON.parse(bodyEvents)

        var object = {
          member: member,
          payments: payments,
          bookings: bookings,
          events: events
        }

        nuclear.app(document.querySelector('#member-component'), Admin(object), Admin.render)
      })
    })
  }
} catch (e) {
  console.log('Member component: ', e)
}

try {
  require('./pages/maintenance.js')(utils)
} catch (e) {
  console.log('Maintenance component: ', e)
}

try {
  var Home = require('./pages/home.js')
  if (window.location.pathname.split('/')[1] === '') {
    getEventsInfo(function (errorEvent, headerEvent, bodyEvents) {
      getMemberInfo(function (errorMember, headerMember, bodyMember) {
        getEventMember(function (errorMyEvent, headerMyEvent, bodyMyEvent) {
          if (errorMyEvent || bodyMyEvent.statusCode === 404 || bodyMyEvent.statusCode === 500) {
            bodyMyEvent = '[]'
          }

          var initialState = {
            events: JSON.parse(bodyEvents),
            member: JSON.parse(bodyMember),
            myEvents: JSON.parse(bodyMyEvent)
          }

          nuclear.app(document.querySelector('#home-component'), Home(initialState), Home.render)
        })
      })
    })
  }
} catch (e) {
  console.log('Home component: ', e)
}

function getMemberById (callback) {
  utils.request({
    method: 'GET',
    uri: '/api/members/' + location.pathname.split('/')[2] + '?populate=[payments,membership_type,deletion_reason,events_booked]'
  }, callback)
}
function getMemberInfo (callback) {
  nuclear.request({
    method: 'GET',
    url: '/api/account'
  }, callback)
}
function getEventsInfo (callback) {
  nuclear.request({
    method: 'GET',
    url: '/api/current_events'
  }, callback)
}

function getEventMember (callback) {
  nuclear.request({
    method: 'GET',
    url: '/api/my_events'
  }, callback)
}
