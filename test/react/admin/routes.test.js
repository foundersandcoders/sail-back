var TestUtils = require('react-addons-test-utils')
var Routes = require('../../../src/admin/routes.js')
var test = require('tape')
var prop_or = require('app/prop_or.js')
var Home = require('../../../src/admin/pages/home.js')
var ViewMember = require('../../../src/admin/pages/view_member.js')
var AddMember = require('../../../src/admin/pages/add_member.js')
var DataMaintenance = require('../../../src/admin/pages/data_maintenance.js')
var Reports = require('../../../src/admin/pages/paying_in.js')

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
  t.ok(get_child_routes(result).every(function (route) {
    return desiredRoutes[route.path] === route.component }),
        'only desired routes present')

  t.ok(Object.keys(desiredRoutes).every(function (r) {
    return get_child_routes(result).map(prop_or('', 'path')).indexOf(r) > -1 }),
        'all desired routes present')

  t.end() })

function get_child_routes (result) {
  return result.props.routes[0].childRoutes }
