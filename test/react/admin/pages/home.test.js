'use strict'

var test = require('tape')
var React = require('react/addons')
var click = React.addons.TestUtils.Simulate.click
var Component = require('../../../../src/admin/pages/home.js')
var SearchBox = require('../../../../src/admin/components/search_box.js')

test('should load admin home page', function (t) {

  React.render(React.createElement(Component), document.body, function () {

    t.ok(document.body.innerHTML.indexOf('Search Members') > -1)
    t.end()
  })
})

test('should render search box component', function (t) {

  React.render(React.createElement(Component), document.body, function () {

    t.ok(document.body.innerHTML.indexOf('email') > -1)
    t.ok(document.body.innerHTML.indexOf('id') > -1)
    t.ok(document.body.innerHTML.indexOf('last_name') > -1)
    t.ok(document.body.innerHTML.indexOf('search-button') > -1)
    t.end()
  })
})

test('should render search results component', function (t) {

  React.render(React.createElement(Component), document.body, function () {

    t.ok(document.body.innerHTML.indexOf('search-table-section-member-header') > -1)
    t.ok(document.body.innerHTML.indexOf('search-table-section-member-rows') > -1)
    t.end()
  })
})

test('should be able to enter text and press search', function (t) {

  SearchBox.__set__('request', function (opts, cb) {
    var mock_results = [{
      id: 1234,
      title: 'Mr',
      last_name: 'fil_bes',
      first_name: 'Hoxhaj',
      initials: 'S',
      payments: [],
      membership_type: 'single-annual'
    }];

    return cb(undefined, undefined, JSON.stringify(mock_results))
  })

  Component.__set__('SearchBox', SearchBox)

  React.render(React.createElement(Component), document.body, function () {

    document.body.querySelector('#id').value = 1234
    document.body.querySelector('#email').value = 'wil@foch.com'
    document.body.querySelector('#last_name').value = 'Fisher'
    click(document.body.querySelector('#search-button'))

    process.nextTick(function () {

        t.ok(document.body.innerHTML.indexOf('fil_bes') > -1)
        t.end()
    })
  })
})
test('exactly those fields that are filled in are present in the request', function (t) {
    var fields = ['id', 'email', 'last_name']
    fields.forEach(function (field) {
      document.querySelector('#' + field).value = '' })

    var fields_to_fill = fields.filter(function() {
      return Math.random() > 0.5 })

    SearchBox.__set__('request', function (opts) {

      var get_fields = one_arg_compose(JSON.parse, get(0), split('&populate'),
          get(1), split('where='), get('url'))
      var filled_fields = get_fields(opts)
      var all_fields_present = fields_to_fill.every(function (field) {
        return filled_fields[field] })
      var no_extra_fields = Object.keys(filled_fields).every(function (field) {
        return fields_to_fill.indexOf(field) > -1 || field==='activation_status'})

      t.ok(all_fields_present, 'all fields present')
      t.ok(no_extra_fields, 'no extra fields')
      t.end()
  })
  Component.__set__('SearchBox', SearchBox)
  React.render(React.createElement(Component), document.body, function () {
    fields_to_fill.forEach(function(field) {
      document.body.querySelector('#'+field).value = 'fkjdsfksjf'
    })
    document.body.querySelector('#search-button').click()
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
