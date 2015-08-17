'use strict'

var nuclear = require('nuclear.js')
var h = nuclear.h
var utils = require('../utils.js')

module.exports = {
  AccountEvent: AccountEvent,
  home: home
}

function AccountEvent (initialEvents) {
  initialEvents = initialEvents || {}
  var member = initialEvents.member || {}
  var events = initialEvents.events || {}

  var state = nuclear.observS({
    member: nuclear.observS(member),
    events: nuclear.observA(events)
  })

  return state
}

AccountEvent.render = function (state) {
  return (
  h('div.main-container', [
    h('div.section-label', [
      h('h1', 'My Events')
    ]),
    h('div.container-small', [
      renderEventList(state)
    ])
  ])
  )
}

function home (state) {
  return ([
    h('div.section-label', [
      h('h1', 'My Events')
    ]),
    h('div.container-small', [
      renderEventList(state)
    ])
  ])
}

function renderEventList (state) {
  var events = utils.processEvents(state.myEvents())

  return events.map(function (elm) {
    return ([
      h('div.inner-section-divider-medium'),
      h('div.event', [
        h('divinput-label-container.parent-float', [
          h('h3.left', elm.title)
        ]),
        h('div.image', {
          style: {
            'background-image': 'url("' + elm.photo_url + '")'
          }
        }),
        h('p.description', elm.short_description),
        h('div.single-event-info', [
          h('div.item', [
            h('p', elm.date)
          ]),
          h('div.status', [
            h('p', elm.reference)
          ])
        ])
      ])
    ])
  })
}
