var test = require('tape')
var React = require('react/addons')

var Component =
    require('../../../../src/admin/pages/view_member.js')
var MemberInformation =
    require('../../../../src/admin/components/member_information.js')

var arrayify = require('app/arrayify.js')
var { createRenderer, Simulate: { click, change, compositionend } } =
    React.addons.TestUtils

var member = require('../../../fixtures/member.js')
var payments = require('../../../fixtures/payments.js')

var node = document.body

test('rewireify set up', function (t) {
  function fake_request (opts, cb) {
    cb(null, {body: JSON.stringify(member)}) }

  var fake_get = require('app/get.js')
  fake_get.__set__('request', fake_request)

  var fake_post = require('app/post.js')
  fake_post.__set__('request', fake_request)

  Component.__set__({
    'get': fake_get,
    'post': fake_post,
    'request': fake_request })
  t.end() })

test('should load admin view member page', function (t) {

  var node = document.body
  React.render(React.createElement(Component, {
    member: member,
    params: {
      id: 1234
    }
  }), node, function () {
    t.ok(node.innerHTML.indexOf('member-component') > -1)
    t.end()})})

test('should render member details', function (t) {

var node = document.body
React.render((
  React.createElement(Component, {
    member: member,
    params: {
      id: 1234 } }) ), node, function () {
  t.ok(node.innerHTML.indexOf('edit-member-mode') > -1)
  t.ok(node.innerHTML.indexOf('member-info-content') > -1)
  t.end() }) })

test('should render payments section', function (t) {

var node = document.body
React.render((
  React.createElement(Component, {
    member: member,
    params: {
      id: 1234
    }
  })
), node, function () {

  t.ok(node.innerHTML.indexOf('subscription_btn') > -1)
  t.end() }) })

test('should toggle between edit and view mode', function (t) {
  var node = document.body
  function assert_all_nodes_of_tag (tag, nodes) {
    t.ok(check_nodes_tag(tag, nodes)) }

  assert_all_nodes_of_tag('span', get_data_nodes())
  node.querySelector('#edit-member-mode').click()
  process.nextTick(function () {
    t.ok(get_data_nodes().some(function (node) {
      return node.tagName.toLowerCase() === 'input'}))
    node.querySelector('#cancel').click()
    t.end() }) })

test('field values should update', function (t) {
  click('#edit-member-mode')
  var nodes = get_data_nodes()
  var input = nodes[Math.floor(Math.random() * nodes.length)]
  var orig = input.value
  input.value = 'random val'
  change(input.value)
  process.nextTick(function () {
    t.equal(input.value, 'random val')
    t.end() }) })

test('field values should update', function (t) {
  click('#edit-member-mode')
  var nodes = get_data_nodes()
  var input = nodes[Math.floor(Math.random() * nodes.length)]
  input.value = 'random val'
  change(input.value)
  process.nextTick(function () {
    t.equal(input.value, 'random val')
    t.end() }) })

test('should be able to add charges', function (t) {
  var node = document.body

  React.render(React.createElement(Component, {
    member: member,
    params: {
      id: 1234
    }
  }), node, function () {

    var fields =['event', 'subscription', 'donation', 'payment']

    t.ok(fields.every(function(field){

      return !!document.querySelector('#'+field+'_btn')
    }), 'all field buttons present')

    fields.forEach(function (field, i) {

      t.test('checking rendering of ' + field, function (st) {

        var button = document.querySelector('#'+field+'_btn')
        click(button)
        process.nextTick(function () {

          st.ok(document.querySelector('.' + field), field + ' displaying')
          st.end() }) }) }) }) })

test('should be able to delete a payment after confirmation', function (t) {
  node.innerHTML = ''
  function get_num_payments () {
    return document.querySelectorAll('.payments-table .table-row').length }
  React.render(React.createElement(Component, {
    member: member,
    params: {
      id: 1234
    }
  }), node, function () {
    var original_payments_num = get_num_payments()
    process.nextTick(function () {
      var x = document.querySelector('.delete button')
      x.click()
      process.nextTick(function(){
        t.equal(x.innerHTML, 'Confirm', 'button asks for confirmation')
        x.click()
        process.nextTick(function(){
          t.equal(original_payments_num -1, get_num_payments())
          t.end() }) }) }) }) })

test(
    'verification is called on compositionend and rejects invalid title',
    function (t) {
      var renderer = createRenderer()
      renderer.render(<Component
          params={ { id: 1234 } } />)

      var result = renderer.getRenderOutput()

      var on_change =
          result.props.children[1].props.children[1].props.onChange
      on_change({ target: { value: 'Ms', id: 'title' } })

      var on_composition_end =
          result.props.children[1].props.children[1].props.on_composition_end
      on_composition_end({})

      var updated_result = renderer.getRenderOutput()
      var {
        props: {
          children: [,
            {props:
              { children:
                [, { props } ] } } ] } } = updated_result

      t.equal(props.member.title, 'Ms', 'member title updated')
      t.equal(props.errors, [], 'no errors')
      t.end() })


function get_data_nodes () {
  var info_nodes= arrayify(node.querySelectorAll('.member-info-content .info'))
  return info_nodes.map(function (node) {
    return node.nextSibling }) }

function check_nodes_tag (tagPossibilities, nodes) {
  return nodes.every(function (node){
    return tagPossibilities.match(node.tagName.toLowerCase()) }) }

