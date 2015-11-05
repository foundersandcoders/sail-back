var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var Routes = require('../../../src/admin/routes.js')()
var test = require('tape')
var prop = require('ramda').prop
var Home = require('../../../src/admin/pages/home.js')
var ViewMember = require('../../../src/admin/pages/view_member.js')
var AddMember = require('../../../src/admin/pages/add_member.js')
var DataMaintenance = require('../../../src/admin/pages/data_maintenance.js')
var Reports = require('../../../src/admin/pages/reports.js')

var renderer = TestUtils.createRenderer()
renderer.render(Routes)

var desiredRoutes = {
  '/': Home,
  '/members/:id': ViewMember,
  '/addmember': AddMember,
  '/reports': Reports
}

var result = renderer.getRenderOutput()

test('all and only the desired routes are present', function (t) {
  t.ok(result.props.route.childRoutes.every(function (route) {
    return desiredRoutes[route.path] === route.component }),
        'only desired routes present')

  t.ok(Object.keys(desiredRoutes).every(function (r) {
    return result.props.route.childRoutes.map(prop('path')).indexOf(r) > -1 }),
        'all desired routes present')

  t.end() })
