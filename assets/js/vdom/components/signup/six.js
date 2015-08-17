'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')

module.exports = function (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-6', 'Gift aid declaration')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('div.input-label-container', [
        h('h4', 'If you sign a Gift Aid Declaration it significantly increases the value of your subscription (and any donations you make). If you would like to sign a Gift Aid Declaration please print the form, sign it and post it to Membership Secretary')
      ]),
      h('button#print.btn-primary', {
        onclick: function () {

          state.print()
        },
      }, 'Print'),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('five')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('seven')
        }
      }, 'Next')
    ])
  ])

  return vtree
}
