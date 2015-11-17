'use strict'

var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var test = require('tape')

var PayingInPage =
    require('../../../../src/admin/pages/paying_in.js')
var PayingInSearch =
    require('../../../../src/admin/components/paying_in_search.js')
var PayingIn =
    require('../../../../src/admin/components/paying_in.js')
var ReportsTable =
    require('../../../../src/admin/components/report_table.js')
var Table =
    require('../../../../src/admin/components/table')

var mock_reference_payments = require('../../../fixtures/ref_payments.json')
var mock_charges = require('../../../fixtures/charges.json')
var expected_structure = require('../../../fixtures/expected_structure.json')
var expected_table_props = require('../../../fixtures/expected_table_props.json')
var ref = "DH47F"

function noop () {}

var fake_get = require('app/get.js')

fake_get.__set__('request', fake_req)

function fake_req (opts, cb) {
  var body =
      opts.uri.match(/\?reference/)
      ?  mock_reference_payments
      : opts.uri.match(/\?member/)
      ? opts.uri.match(/471663/)
          ?  mock_charges[471663]
          :  mock_charges[471800]
      : '{}'

  cb(null, { body: JSON.stringify(body) }) }

test('Paying in page', function (t) {
  PayingInPage.__set__('get', fake_get)

  var renderer = TestUtils.createRenderer()

  renderer.render(<PayingInPage />)

  var page = renderer.getRenderOutput()

  var search = renderer._instance._instance.search

  t.deepEqual(page.props.children,
    [
      <PayingInSearch submit_handler={search} />,
      ''
    ],
      'Paying in page initially renders search')

  var get_request = (page.props.children[0].props.submit_handler({
    target:
      { firstChild:
        { value: ref }
      },
    preventDefault: noop
  }))

  var page = renderer.getRenderOutput()

  t.deepEqual([page.props.children[1]._store], [
    <PayingIn
        reference={ref}
        payments={mock_reference_payments}
        charges={mock_charges} />._store
  ])

  t.end() })

test('The search has the right form', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<PayingInSearch submit_handler={noop}/>)

  var search = renderer.getRenderOutput()

  t.deepEqual(search.props.children, [
    <span>Enter desired reference: </span>,
    <form onSubmit={noop}>
       <input />
       <input type="submit" />
    </form>] )
  t.end() })


test('The data has been correctly transformed', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<PayingIn
      reference={ref}
      payments={mock_reference_payments}
      charges={mock_charges} />)

  var report_page = renderer.getRenderOutput()

  t.deepEqual(report_page.props.children, [
    <h3>Bank Reference: {ref}</h3>,
    <ReportsTable charges={expected_structure}  /> ] )
  t.end() })

test('The report table has the right entries', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<ReportsTable
      charges={expected_structure} />)

  var report_table = renderer.getRenderOutput()

  t.deepEqual(report_table.props, expected_table_props)
  t.end() })

