'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var utils = require('../../app.js').utils
var progressBar = require('./progressbar')

module.exports = function two (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-2', 'Membership info')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('div.inner-section-divider-small'),
      h('div.input-label-container', [
        h('h3', 'Choose a membership type')
      ]),
      h('select.select-signup#membership-type', {
        onchange: function () {

          currentInputValues.membership_type = this.value
          state.member.set(currentInputValues)
        }
      },
        utils.vDomHelpers.renderOptionsSelected(utils.mocks.memberTypes, currentInputValues.membership_type, 'Click to select one')
      ),

      renderPrice(currentInputValues),

      h('div.inner-section-divider-medium'),

      h('button#back-btn.align-one.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('one')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('three')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

function renderPrice (member) {

  if (utils.is.ok(member.membership_type)) {
    var index = utils.mocks.memberTypes
        .map(function (e) {return e.value})
        .indexOf(member.membership_type)

    return h('div', [
      h('div.inner-section-divider-small'),
      h('h3#membership-details', 'Membership details'),
      h('input', {
        type: 'text',
        value: utils.mocks.memberTypes[index].description,
        disabled: true
      })
    ])
  }
}
