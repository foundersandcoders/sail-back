var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var Routes = require('../../../src/admin/routes.js')()
var test = require('tape')
var prop = require('ramda').prop

var renderer = TestUtils.createRenderer()
renderer.render(Routes)

var desiredRoutes = {
  '/': 'AdminHome',
  '/members/:id': 'ViewMember',
  '/addmember': 'NewMember',
  '/maintenance': 'DataMaintenance',
  '/addevent': 'Events',
  '/members/:id/events': 'BookEvent',
  '/reports': 'Reports'
}

var result = renderer.getRenderOutput()

test('all and only the desired routes are present', function (t) {
  t.ok(result.props.route.childRoutes.every(function (route) {
    console.log(desiredRoutes[route.path], route.component.displayName)
    return desiredRoutes[route.path] === route.component.displayName }),
        'only desired routes present')

  t.ok(Object.keys(desiredRoutes).every(function (r) {
    return result.props.route.childRoutes.map(prop('path')).indexOf(r) > -1 }),
        'all desired routes present') 

  t.end() })
