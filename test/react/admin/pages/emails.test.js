'use strict'

var test = require('tape')
var { createRenderer: create_renderer } = require('react-addons-test-utils')
var shallow_utils = require('react-shallow-testutils')
var React = require('react')

var Field =
    require('../../../../src/admin/components/field.js')
var EmailPage

var template_options = [
  'Template One'
]

var subscription_options = [
  'TEST'
  , 'annual-single'
  , 'annual-double'
  , 'annual-family'
  , 'annual-group'
  , 'annual-corporate'
  , 'life-single'
  , 'life-double'
]

test('Email page renders report and category choices', function (t) {
  EmailPage =
      require('../../../../src/admin/pages/email.js')
  var renderer = create_renderer()
  renderer.render(<EmailPage />)
  var fields = shallow_utils.findAllWithType(renderer.getRenderOutput(), Field)
  var { name: first_field_id, ...first_field_props } = fields[0].props
  var { name: second_field_id, ...second_field_props } = fields[1].props
  t.notEqual(first_field_id, second_field_id, 'they have different ids')
  t.deepEqual(first_field_props, second_field_props, 'other field props same')
  t.deepEqual(
      [{ name: first_field_id }, { name: second_field_id }]
          .map(first_field_props.input_or_select),
      [{ type: 'select', options: template_options },
        { type: 'select', options: subscription_options }],
      'fields have right options'
  )
  t.end()
})
