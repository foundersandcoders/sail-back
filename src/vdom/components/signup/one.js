'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')

function areEqual (a, b) {
  return a === b;
}

module.exports = function one (state) {

  var currentInputValues = clone(state.member())
  var matchingEmailsColour = state.emailsMatch() ? 'green' : 'red'
  var matchingPasswordsColour = state.passwordsMatch() ? 'green' : 'red'
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
        style: {color: matchingEmailsColour},
        value: currentInputValues.primary_email,
        onchange: function () {

          currentInputValues.primary_email = this.value
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#confirm-email', {
        type: 'text',
        name: 'primary_email',
        placeholder: 'Confirm email address',
        style: {color: matchingEmailsColour},
        value: currentInputValues.confirm_email,
        onchange: function () {

          currentInputValues.confirm_email = this.value
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#password', {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        style: {color: matchingPasswordsColour},
        value: currentInputValues.password,
        onchange: function () {

          currentInputValues.password = this.value
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#confirm-password', {
        type: 'password',
        name: 'password',
        placeholder: 'Confirm password',
        style: {color: matchingPasswordsColour},
        value: currentInputValues.confirm_password,
        onchange: function () {

          currentInputValues.confirm_password = this.value
        }
      }),
      h('div.inner-section-divider-medium'),
      h('button#next-btn.btn-primary', {
        onclick: function () {
          var emailsMatch = areEqual(currentInputValues.primary_email, currentInputValues.confirm_email)
          var passwordsMatch = areEqual(currentInputValues.password, currentInputValues.confirm_password)
          state.member.set(currentInputValues)
          if (emailsMatch && passwordsMatch) {
            state.panel.set('two')
          } else {
            emailsMatch || state.emailsMatch.set(emailsMatch)
            passwordsMatch || state.passwordsMatch.set(passwordsMatch)
          }
        }
      }, 'Next')
    ])
  ])

  return vtree
}
