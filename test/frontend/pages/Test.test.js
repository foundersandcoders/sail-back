'use strict'

var jsdom = require('jsdom')
var test = require('tape')
var decache = require('decache')

test('Nuclear', function (t) {
  jsdom.env('', {
    virtualConsole: jsdom.createVirtualConsole().sendTo(console),
    scripts: ['http://code.jquery.com/jquery-2.1.1.js'],
    done: function (errors, window) {
      var $ = window.$
      global.window = window
      global.document = window.document

      var nuclear = require('nuclear.js')
      var Home = require('../../../assets/js/vdom/pages/Home.js')

      var state = Home()

      nuclear.app(window.document.body, state, Home.render, {
        document: window.document
      })

      console.log('Btn: ', $('button:contains("Browse events")').text())
      console.log('Title: ', $('h1').text())
      console.log('Route: ', state.route())

      $('button:contains("Browse events")').click()

      console.log('Title: ', $('h1').text())

      process.nextTick(function () {
        t.end()
      })
    }
  })
})
