'use strict';

var expect = require('expect')
var React = require('react/addons')
var Component = require('../../../../src/shared/signin.js')

describe('Sigin in', function () {

    it('should render correctly', function (done) {

        React.render(React.createElement(Component), document.body, function () {

            expect(document.body.innerHTML).toMatch(/Signin/)
            done()
        })
    })
})
