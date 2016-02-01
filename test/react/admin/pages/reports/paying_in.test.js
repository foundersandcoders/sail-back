'use strict'

var React = require('react')
var TestUtils = require('react-addons-test-utils')
var test = require('tape')
var get_component_type = require('app/test/get_component_type')
var shallow_utils = require('react-shallow-testutils')

var PayingInPage =
    require('../../../../../src/admin/pages/paying_in.js')
var PaymentsReportsPage =
    require('../../../../../src/admin/pages/payments.js')
var PayingInSearch =
    require('../../../../../src/admin/components/paying_in_search.js')
var PayingIn =
    require('../../../../../src/admin/components/paying_in.js')
var ReportsTable =
    require('../../../../../src/admin/components/report_table.js')
var Table =
    require('../../../../../src/admin/components/table')

var mock_reference_payments =
    require('../../../../fixtures/ref_payments.json')
var mock_received_charges =
    require('../../../../fixtures/received_charges.json')
var mock_charges =
    require('../../../../fixtures/charges.json')
var expected_structure =
    require('../../../../fixtures/expected_structure.json')
var expected_table_props =
    require('../../../../fixtures/expected_table_props.json')
var ref = "DH47F"

function noop () {}

test('rewireify setup', function (t) {
  var fake_get_data = require('app/get_data.js')
  var fake_get = require('app/http.js')

  fake_get.__set__('request', fake_req)

  fake_get_data.__set__('get', fake_get)

  function fake_req (opts, cb) {
    var body =
        opts.uri.match(/reference/)
          ?  mock_reference_payments
        : opts.uri.match(/member/)
          ? mock_received_charges
        : '{}'

    cb(null, { body: JSON.stringify(body) }) }

  PayingInPage.__set__('get_data', fake_get_data)

  t.end() })

test('Paying in page', function (t) {
  var renderer = TestUtils.createRenderer()

  renderer.render(<PayingInPage />)

  var result = renderer.getRenderOutput()

  var get_payments = result.props.get_payments

  var renderer_1 = TestUtils.createRenderer()

  renderer_1.render(<PaymentsReportsPage
      get_payments={get_payments} />)

  var get_paying_in = renderer_1.getRenderOutput()

  t.deepEqual(get_component_type(get_paying_in.props.children),
    [
      PayingInSearch,
      ''
    ],
      'Paying in page initially renders search')

//   var get_request = (get_paying_in.props.children[0].props.submit_handler({
//     target:
//       { firstChild:
//         { children:
//           [ , { value: ref } ]
//         }
//       },
//     preventDefault: noop
//   }))
// 
//   get_paying_in = renderer_1.getRenderOutput()
// 
//   t.deepEqual(get_paying_in.props.children.map(function(c) { return c.type }), [
//       PayingInSearch,
//       PayingIn
//   ])

  t.end() })

test('The search has the right form', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<PayingInSearch
      submit_handler={noop}
      inputs={['reference']} />)

  var search = renderer.getRenderOutput()

  var {_owner, actual} = search.props.children
  var {_owner, expected} =
      <form onSubmit={noop}>
        { [ <div key={0}>
              <span>Enter desired {'reference'}: </span>
              <input name="reference" />
            </div>
        ] }
         <input type="submit" />
      </form>

  t.deepEqual(actual, expected, 'search rendered correctly')
  t.end() })


test('The data has been correctly transformed', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<PayingIn
      reference={ref}
      payments={mock_reference_payments}
      charges={mock_charges} />)

  var report_page = renderer.getRenderOutput()

  // big owner object on actual output. Don't want it!
  var {_owner, ...output} = report_page
  var {_owner, ...table} = <ReportsTable charges={expected_structure} />

  t.deepEqual(output, table)
  t.end() })

test('The report table has the right entries', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<ReportsTable
      charges={expected_structure} />)

  var report_table = renderer.getRenderOutput()

  t.deepEqual(report_table.props, expected_table_props)
  t.end() })

