'use strict'

var expect = require('expect')
var React = require('react/addons')
var click = React.addons.TestUtils.Simulate.click
var rewire = require('rewire')

var Component = rewire('../../../../src/admin/pages/home.js')
var SearchBox = rewire('../../../../src/admin/components/search_box.js')

describe('The route component', function () {

  it('should load admin home page', function (done) {

    React.render(React.createElement(Component), document.body, function () {

      expect(document.body.innerHTML).toMatch(/Search Members/)
      done()
    })
  })

  it('should render search box component', function (done) {

    React.render(React.createElement(Component), document.body, function () {

      expect(document.body.innerHTML).toMatch(/email/)
      expect(document.body.innerHTML).toMatch(/id/)
      expect(document.body.innerHTML).toMatch(/last_name/)
      expect(document.body.innerHTML).toMatch(/search-button/)
      done()
    })
  })

  it('should render search results component', function (done) {

    React.render(React.createElement(Component), document.body, function () {

      expect(document.body.innerHTML).toMatch(/search-table-section-member-header/)
      expect(document.body.innerHTML).toMatch(/search-table-section-member-rows/)
      done()
    })
  })

  it('should be able to enter text and press search', function (done) {

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

          expect(document.body.innerHTML).toMatch(/fil_bes/)
          done()
      })
    })
  })
  it('exactly those fields that are filled in are present in the request', function (done) {
      var fields = ['id', 'email', 'last_name'] 
      fields.forEach(function (field) {
        document.querySelector('#' + field).value = ''
      }) 
      var fields_to_fill = fields.filter(function() { return Math.random() > 0.5; })
      SearchBox.__set__('request', function (opts) {

        console.log('fields_to_fill', fields_to_fill)
        console.log('opts.url', opts.url)
        var get_fields = one_arg_compose(JSON.parse, get(0), split('&populate'), get(1), split('where='), get('url'))
        var filled_fields = get_fields(opts)
        var all_fields_present = fields_to_fill.every(function (field) { 
          return filled_fields[field]
        })

        var no_extra_fields = Object.keys(filled_fields).every(function (field) {
          return fields_to_fill.indexOf(field) > -1
        })
        expect(all_fields_present).toBe(true)
        expect(no_extra_fields).toBe(true)
        done()
    })
    Component.__set__('SearchBox', SearchBox)
    React.render(React.createElement(Component), document.body, function () {
      fields_to_fill.forEach(function(field) {
        document.body.querySelector('#'+field).value = 'fkjdsfksjf'
      })
      document.body.querySelector('#search-button').click()
    })
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
/* TODO: write 2 arg curry */
