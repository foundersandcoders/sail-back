'use strict'

var test = require('tape')
var React = require('react')
var ReactDOM = require('react-dom')
var click = require('react-addons-test-utils').Simulate.click
var Component = require('../../../../src/admin/pages/home.js')
var SearchBox = require('../../../../src/admin/components/search_box.js')

var wrapper

test('create a wrapper', function (t) {
  wrapper = document.createElement('div')
  wrapper.id = 'wrapper'
  document.body.appendChild(wrapper)
  t.end() } )

test('should load admin home page', function (t) {

  ReactDOM.render(React.createElement(Component), wrapper, function () {

    t.ok(wrapper.innerHTML.indexOf('Search Members') > -1)
    t.end()
  })
})

test('should render search box component', function (t) {

  ReactDOM.render(React.createElement(Component), wrapper, function () {

    t.ok(wrapper.innerHTML.indexOf('email') > -1)
    t.ok(wrapper.innerHTML.indexOf('id') > -1)
    t.ok(wrapper.innerHTML.indexOf('last_name') > -1)
    t.ok(wrapper.innerHTML.indexOf('search-button') > -1)
    t.end()
  })
})

test('should render search results component', function (t) {

  ReactDOM.render(React.createElement(Component), wrapper, function () {

    t.ok(wrapper.innerHTML.indexOf('search-table-section-member-header') > -1)
    t.ok(wrapper.innerHTML.indexOf('search-table-section-member-rows') > -1)
    t.end()
  })
})

test('exactly those fields that are filled in are present in the request', function (t) {
    var fields = ['id', 'email', 'last_name']
    fields.forEach(function (field) {
      document.querySelector('#' + field).value = '' })

    var fields_to_fill = fields.filter(function() {
      return Math.random() > 0.5 }).concat('email')

    var expected_filled = fields_to_fill.reduce(function (expected, field) {
      return field === 'email' ?
        expected.concat(['primary_email', 'secondary_email']) :
        expected.concat(field) }, [])

    SearchBox.__set__('request', function (opts) {

      var get_fields = one_arg_compose(get(0), split('&populate'),
          get(1), split('where='), get('url'))
      var filled_fields = get_fields(opts)
      var all_fields_present = expected_filled.every(function (field) {
        return filled_fields.match(field) })

      t.ok(all_fields_present, 'all fields present')
      t.end()
  })
  Component.__set__('SearchBox', SearchBox)
  ReactDOM.render(React.createElement(Component), wrapper, function () {
    fields_to_fill.forEach(function(field) {
      wrapper.querySelector('#'+field).value = 'fkjdsfksjf'
    })
    wrapper.querySelector('#search-button').click()
  })
})

function split (string, array) {
  if (array) return array.split(string)
  else return split.bind(null, string)
}

function get (prop, obj) {
  if (obj) return obj[prop]
  else return get.bind(undefined, prop)
}

function one_arg_compose () {
  var args = [].slice.call(arguments).reverse()
  return function (data) {
    return args.reduce(function (result, func) {
      return func(result)
    }, data)
  }
}
