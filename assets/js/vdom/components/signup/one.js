'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')

module.exports = function one (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-1', 'Sign up')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('input#email', {
        type: 'text',
        name: 'primary_email',
        placeholder: 'Email address',
        value: currentInputValues.primary_email,
        onchange: function () {

          currentInputValues.primary_email = this.value
          state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#confirm-email', {
        type: 'text',
        name: 'primary_email',
        placeholder: 'Confirm email address',
        value: currentInputValues.confirm_email,
        onchange: function () {

          currentInputValues.confirm_email = this.value
	  state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#password', {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        value: currentInputValues.password,
        onchange: function () {

          currentInputValues.password = this.value
	  state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#confirm-password', {
        type: 'password',
        name: 'password',
        placeholder: 'Confirm password',
        value: currentInputValues.confirm_password,
        onchange: function () {

          currentInputValues.confirm_password = this.value
	  state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-medium'),
      h('button#next-btn.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('two')
        }
      }, 'Next')
    ])
  ])

  return vtree
}
