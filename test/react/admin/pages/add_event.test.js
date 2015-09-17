'use strict'

var test = require('tape')
var React = require('react/addons')
var Component = require('../../../../src/admin/pages/add_event.js')

test('should load add events page', function (t) {

  React.render(React.createElement(Component), document.body, function () {
    
    t.ok(document.body.innerHTML.indexOf('Add Event') > -1, 'add_event page rendered')
    t.end()
  })
})

//test('should')
