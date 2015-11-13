'use strict'

var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var test = require('tape')

var Reports = require('../../../../src/admin/pages/reports.js')
var ReportsTable = require('../../../../src/admin/components/report_table.js')

var Table = require('../../../../src/admin/components/table')

var mock_reference_payments = require('../../../fixtures/ref_payments.json')
var mock_charges = require('../../../fixtures/charges.json')
var expected_structure = require('../../../fixtures/expected_structure.json')
var expected_table_props = require('../../../fixtures/expected_table_props.json')
var ref = "DH47F"

test('The data has been correctly transformed', function (t) {

  var renderer = TestUtils.createRenderer()

  renderer.render(<Reports
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

