'use strict'

var expect = require('expect')
var React = require('react/addons')
var click = React.addons.TestUtils.Simulate.click
var rewire = require('rewire')

var Component = rewire('../../../../src/admin/pages/home.js')
var SearchBox = rewire('../../../../src/admin/components/search_box.js')
SearchBox.__set__('request', function (opts, cb) {
  console.log('ABOEUNTAOEHU')
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

describe('The route component', function () {

  it('should load admin home page', function (done) {

    React.render(React.createElement(Component), document.body, function () {

      expect(document.body.innerHTML).toMatch(/Search Members/)
      done()
    })
  })

  it('should render search box component', function (done) {

    React.render(React.createElement(Component), document.body, function () {

      expect(document.body.innerHTML).toMatch(/search-field-email/)
      expect(document.body.innerHTML).toMatch(/search-field-id/)
      expect(document.body.innerHTML).toMatch(/search-field-last-name/)
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

    React.render(React.createElement(Component), document.body, function () {

      document.body.querySelector('#search-field-id').value = 1234
      document.body.querySelector('#search-field-email').value = 'wil@foch.com'
      document.body.querySelector('#search-field-last-name').value = 'Fisher'
      click(document.body.querySelector('#search-button'))

      process.nextTick(function () {

          expect(document.body.innerHTML).toMatch(/fil_bes/)
          done()
      })
    })
  })
})
