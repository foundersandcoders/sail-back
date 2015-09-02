/*global
  alert
*/

'use strict'

var is = require('torf')
var nuclear = require('nuclear.js')
var h = nuclear.h

var Signin = require('./signin.js')
var Signup = require('./signup.js')
var Profile = require('../components/profile.js')
var Account = require('./account.js')
var Event = require('./events.js')
var MyEvent = require('./accountevent.js')

var utils = require('../utils.js')

module.exports = Home

var route

function Home (initialState) {
  initialState = initialState || {}
  var member = initialState.member || {payments: []}
  member.payments = member.payments || []
  var events = is.type(initialState.events, 'array') ? initialState.events : []
  var myEvents = is.type(initialState.myEvents, 'array') ? initialState.myEvents : []

  var state = nuclear.observS({
    emailsMatch: nuclear.observ(true),
    passwordsMatch: nuclear.observ(true),
    route: nuclear.observ(''),
    member: nuclear.observS(member),
    payments: nuclear.observ(member.payments),
    events: nuclear.observA(events),
    myEvents: nuclear.observA(myEvents),
    panel: nuclear.observ('one'),
    booking: nuclear.observS({
      guestNum: nuclear.observ(''),
      memberNum: nuclear.observ(''),
      total: nuclear.observ('')
    }),
    channels: {
      redirectTo: initialState.redirectTo || redirectTo,
      forgotPassword: initialState.forgotPassword || forgotPassword,
      updateProfile: initialState.updateProfile || updateProfile,
      createMember: initialState.createMember || createMember,
      createCharge: initialState.createCharge || createCharge
    }
  })

  route = nuclear.router(state)

  return state
}

Home.render = function (state) {
  console.log('START: ', window.location.hash)

  return (
  h('div.main-container', [
    route('/', renderHome),
    route('/signin', Signin.signin),
    route('/signup', Signup.render),
    route('/forgotPassword', Signin.forgotPass),
    route('/profile', Profile.show),
    route('/profile/edit', Profile.edit),
    route('/account', Account.home),
    route('/account/payment', Account.payment),
    route('/myevents', MyEvent.home),
    route('/events', Event.home),
    route('/event/:id', Event.eventInfo),
    route('/event/:id/booking', Event.booking)
  ])
  )
}

function forgotPassword (state, member, nuclear) {
  nuclear.request({
    method: 'POST',
    uri: '/forgotPassword',
    json: member
  }, function (err, header, body) {
    if (typeof body === 'string') {
      body = JSON.parse(body)
    }

    if (err) {
      alert('Could not send request')
    } else if (body.emailSent) {
      state.channels.redirectTo(state, '/forgot')
    } else {
      state.error.set({message: body.error})
    }
  })
}

function redirectTo (state, path) {
  console.log('Redirect to: ', path)

  window.location.hash = path
}

function updateProfile (state, updateProfile, nuclear) {
  nuclear.request({
    method: 'PUT',
    uri: '/api/account',
    json: updateProfile
  }, function (err, header, body) {
    if (typeof body === 'string') {
      body = JSON.parse(body)
    }

    if (err) {
      alert('Could not send request')
    } else {
      state.member.set(body)
      state.channels.redirectTo(state, '/profile')
    }
  })
}

function createMember (state, member, nuclear) {
  utils.validate('member', member, function (error, value) {
    if (error) {
      return alert('Error!')
    } else {
      nuclear.request({
        method: 'POST',
        uri: '/signup',
        json: member
      }, function (error, header, body) {
        if (typeof body === 'string') {
          body = JSON.parse(body)
        }

        // checking the id is the best way to
        // know if the body contains a member
        if (!body || body.id === undefined) {
          state.panel.set('sorryError')
        } else {
          state.panel.set('checkEmail')
        }
      })
    }
  })
}

function createCharge (state, amount, eventInfo, nuclear) {
  var bookRecord = {
    eventItem: eventInfo,
    member: state.booking.memberNum(),
    guest: state.booking.guestNum(),
    total: amount
  }

  nuclear.request({
    method: 'POST',
    uri: '/book_event',
    json: bookRecord
  }, function (error, header, body) {
    if (typeof body === 'string') {
      body = JSON.parse(body)
    }

    if (error) {
      alert('Could not book')
    } else {
      state.channels.redirectTo(state, '/account')
    }
  })
}

function renderHome (state) {
  return (
  h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Friends of Chichester Harbour')
    ]),
    h('div.container-small', [
      h('div.inner-section-divider-medium'),
      renderSignUpOpts(state),
      h('div.inner-section-divider-small'),
      renderMemberOpts(state),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: state.channels.redirectTo.bind(this, state, '/events')
      }, 'Browse events')
    ])
  ])
  )
}

function renderSignUpOpts (state) {
  if (state.member().id !== undefined) {
    return ([
      h('button.btn-primary', {
        onclick: state.channels.redirectTo.bind(this, state, '/profile')
      }, 'View Profile'),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: state.channels.redirectTo.bind(this, state, '/account')
      }, 'View account')
    ])
  } else {
    return ([
      h('button.btn-primary', {
        onclick: state.channels.redirectTo.bind(this, state, '/signin')
      }, 'Sign in'),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: state.channels.redirectTo.bind(this, state, '/signup')
      }, 'Sign up')
    ])
  }
}

function renderMemberOpts (state) {
  if (state.member().id === undefined) {
    return ''
  }

  return ([
    h('div.inner-section-divider-small'),
    h('button#make-payment.btn-primary#testytestytest', {
      onclick: state.channels.redirectTo.bind(this, state, 'account')
    }, 'Make donation'),
    h('div.inner-section-divider-small'),
    h('button#make-payment.btn-primary#testytestytest', {
      onclick: state.channels.redirectTo.bind(this, state, 'account')
    }, 'Make a payment'),
    h('div.inner-section-divider-small'),
    h('button#make-payment.btn-primary#testytestytest', {
      onclick: state.channels.redirectTo.bind(this, state, '/myevents')
    }, 'My events')
  ])
}
