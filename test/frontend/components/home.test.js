'use strict'

var createMocks = require('../../helpers/createMocks.js')
var outputHTML = require('../../helpers/outputHTML.js')
global.window = require('../../helpers/fakeWindow.js')
var Home = require('../../../assets/js/vdom/pages/home.js')
var test = require('tape')

var renderHTML = outputHTML(Home, Home.render)

test('Events initial view', function (t) {
  global.window.location.hash = '/events'

  var events = createMocks.getEvents()
  var $ = renderHTML({events: events})

  t.equals($('h3').text(), 'Party in LondonToday at WilVisit at Chichester', 'right titles')
  t.end()
})

test('Event info initial view without session', function (t) {
  global.window.location.hash = '/event/1'

  var events = createMocks.getEvents()
  var $ = renderHTML({events: events})

  t.equals($('h1').text(), 'Party in London', 'right title')
  t.equals($('button').text(), 'Signup to book', 'right button text')
  t.end()
})

test('Event info initial view with session', function (t) {
  global.window.location.hash = '/event/1'

  var events = createMocks.getEvents()
  var member = createMocks.member()
  var $ = renderHTML({events: events, member: member})

  t.equals($('h1').text(), 'Party in London', 'right title')
  t.equals($('button').text(), 'Book a place', 'right button text')
  t.end()
})

test('Home initial view', function (t) {
  t.plan(5)

  global.window.location.hash = '/'

  var $ = renderHTML({})

  t.equals($('h1').text(), 'Friends of Chichester Harbour', 'right title on load')
  t.equals($('button:contains("Browse events")').text(), 'Browse events', 'see events button')
  t.equals($('button:contains("Sign in")').text(), 'Sign in', 'see Sign in button')
  t.equals($('button:contains("Sign up")').text(), 'Sign up', 'see Sign up button')
  t.equals($('button').text(), 'Sign inSign upBrowse events', 'see just three buttons')
})

test('Signin initial view', function (t) {
  global.window.location.hash = '/signin'

  var $ = renderHTML({})

  t.equals($('h1').text(), 'Sign in', 'right component title')
  // check some more info
  t.end()
})

test('Signup initial view', function (t) {
  global.window.location.hash = '/signup'

  var $ = renderHTML({})

  t.equals($('h1').text(), 'Sign up', 'right component title')
  // check some more info
  t.end()
})

test('Events initial state', function (t) {
  t.plan(4)

  global.window.location.hash = '/events'

  var events = [createMocks.eventItem]

  var $ = renderHTML({events: events})

  t.equals($('h1').text(), 'Events', 'right component title events')
  t.equals($('h3').text(), 'Dinner at Bes', 'event title')
  t.equals($('.description').text(), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'right description')
  t.equals($('p:contains("11 Nov 11")').text(), '11 Nov 11', 'show date')
})

test('Events inject an object instead of array', function (t) {
  t.plan(1)

  global.window.location.hash = '/events'

  var events = {}

  var $ = renderHTML({events: events})

  t.equals($('h1').text(), 'Events', 'component should render anyway')
})
