'use strict'

var expect = require('expect')
var React = require('react/addons')
var click = React.addons.TestUtils.Simulate.click
var rewire = require('rewire')
var Component = require('../../../../src/admin/pages/home.js')
/*var SearchBox = rewire('../../../../src/admin/components/search_box.js')
SearchBox.__set__('xhr', function (cb) {
  console.log('ABOEUNTAOEHU')
  return cb('SPARTAN')
})
*/
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
/*
  it('should be able to enter text and press search', function (done) {

    React.render(React.createElement(SearchBox), document.body, function () {

      var get_element = document.body.querySelector

      document.body.querySelector('#search-field-id').value = 1234
      document.body.querySelector('#search-field-email').value = 'wil@foch.com'
      document.body.querySelector('#search-field-last-name').value = 'Fisher'
      click(document.body.querySelector('#search-button'))

      expect(document.body.querySelector('#test').textContent).toMatch(/GET/)
      done()
    })
  })
*/
})
