'use strict'

var h = require('virtual-dom/h')

module.exports.signIn = function (state) {

  var data = {}

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
n      h('h1', 'Sign in')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h3', 'Membership number')
      ]),

      h('form', {
        action: '/signin',
        method: 'POST'
      }, [
        h('input#number', {
          type: 'text',
          // name: "username",
          placeholder: 'Membership number',
          onchange: function () {

            data.membership_number = this.value

            return data.membership_number
          }
        }),

        h('div.inner-section-divider-small'),

        h('div.input-label-container', [
          h('h3', '...or email')
        ]),

        h('input#email', {
          type: 'text',
          name: 'username',
          placeholder: 'Email address',
          onchange: function () {

            data.email = this.value
            return data.email
          }
        }),

        h('div.inner-section-divider-small'),

        h('input#password', {
          type: 'password',
          name: 'password',
          placeholder: 'Password',
          onkeyup: function () {

            data.password = this.value
            return data.password
          }
        }),

        h('div.inner-section-divider-medium'),

        h('div.input-label-container', [
          h('a', {
            href: '#',
            onclick: function (event) {

              event.preventDefault()
              state.panel.set('temporaryPassword')
            }
          }, 'Forgot password'),
          h('h4', "If you are an existing member who is logging in for the first time please click 'Forgot Password' and we’ll email you a temporary one.")
        ]),

        h('div.inner-section-divider-medium'),

        h('button#signin-btn.btn-primary', {
          type: 'submit'
        }, 'Sign in')
      ])
    ])
  ])

  return vtree
}

module.exports.temporaryPassword = function (state) {

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Sign in')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h3', 'We just emailed you a provisional password')
      ]),

      h('div.inner-section-divider-medium'),

      h('button#button_sign_up.btn-primary', {
        onclick: function () {
          state.panel.set('signIn')
        }
      }, 'Continue')
    ])
  ])

  return vtree
}
