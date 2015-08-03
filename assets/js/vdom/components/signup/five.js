'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')

module.exports = function five (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-5', 'Contact details')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('input#home-phone', {
        type: 'text',
        placeholder: 'Home phone number',
        value: currentInputValues.home_phone,
        onchange: function () {

          currentInputValues.home_phone = this.value
	  state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-small'),

      h('input#mobile', {
        type: 'text',
        placeholder: 'Mobile number',
        value: currentInputValues.mobile_phone,
        onchange: function () {

          currentInputValues.mobile_phone = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#primary', {
        type: 'text',
        placeholder: 'Primary email',
        value: currentInputValues.primary_email,
        disabled: true,
	onchange: function () {

	  currentInputValues.primary_email = this.value
	  state.member.set(currentInputValues)
	}
      }),

      h('div.inner-section-divider-small'),

      h('input#secondary-email', {
        type: 'text',
        placeholder: 'Secondary email',
        value: currentInputValues.secondary_email,
        onchange: function () {

          currentInputValues.secondary_email = this.value
	  state.member.set(currentInputValues)
        }
      }),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {

	  state.member.set(currentInputValues)
          state.panel.set('four')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {

	  state.member.set(currentInputValues)
          state.panel.set('six')
        }
      }, 'Next')
    ])
  ])

  return vtree
}
