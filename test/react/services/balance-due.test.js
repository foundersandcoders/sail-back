/**
 *	UPLOAD
 *
**/

'use strict'

var expect = require('expect')
var React = require('react/addons')
var MemoryHistory = require('react-router/lib/MemoryHistory')


describe('The route component', function () {

  var compileRoutes = require('../../../src/main.js')
  var node

  beforeEach(function () {

    node = document.createElement('div')
  })

  it('should render correctly', function (done) {

    React.render((
      compileRoutes(new MemoryHistory('/'))
    ), node, function () {

      console.log(node.innerHTML)
      expect(node.innerHTML).toMatch(/HELLO/)
      done()
    })
  })
})
