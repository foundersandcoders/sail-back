'use strict'

var test = require('tape')
var React = require('react/addons')
var Component = require('../../../../src/admin/pages/data_maintenance.js')

test('should load data maintenance page', function (t) {

  React.render((
    React.createElement(Component)
  ), document.body, function () {

    t.ok(document.body.innerHTML.indexOf('Data maintenance') > -1, 'Data maintenance rendered')
    t.end()
  })
})
