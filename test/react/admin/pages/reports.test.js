'use strict'

var React = require('react/addons')
var TestUtils = React.addons.TestUtils
var test = require('tape')

var Reports = require('../../../../src/admin/pages/reports.js')
var mock_reference_payments = require('../../../mocks/ref_payments.json')
var mock_charges = require('../../../mocks/charges.json')
var expected_structure = require('../../../mocks/expected.json')

var renderer = TestUtils.createRenderer()

renderer.render(<Reports
    payments={mock_reference_payments}
    charges={mock_charges} />)

var result = renderer.getRenderOutput()

test('The data has been correctly transformed', function (t) {
  t.deepEqual(result._store.props.charges, expected_structure)
  t.end() })

console.log(result)
