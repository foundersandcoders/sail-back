'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')

module.exports = function four (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-4', 'Address details')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('input#address1', {
        type: 'text',
        placeholder: 'Address 1',
        value: currentInputValues.address1,
        onchange: function () {

          currentInputValues.address1 = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#address2', {
        type: 'text',
        placeholder: 'Address 2',
        value: currentInputValues.address2,
        onchange: function () {

	  currentInputValues.address2 = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#address3', {
        type: 'text',
        placeholder: 'Address 3',
        value: currentInputValues.address3,
        onchange: function () {

          currentInputValues.address3 = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#address4', {
        type: 'text',
        placeholder: 'Address 4',
        value: currentInputValues.address4,
        onchange: function () {

          currentInputValues.address4 = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#county', {
        type: 'text',
        placeholder: 'County',
        value: currentInputValues.county,
        onchange: function () {

          currentInputValues.county = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#postcode', {
        type: 'text',
        placeholder: 'Postcode',
        value: currentInputValues.postcode,
        onchange: function () {

          currentInputValues.postcode = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('three')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('five')
        }
      }, 'Next')
    ])
  ])

  return vtree
}
