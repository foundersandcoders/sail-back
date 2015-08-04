'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')
var utils = require('../../app.js').utils

module.exports = function seven (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-7', 'Notifications')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [

      h('div.input-label-container', [
        h('h2', 'Keeping in touch'),
        h('h4', 'Because it’s much easier (and cheaper) for us, we’ll send you information about Events and things by email.  If you’d prefer us to do it by post please tick the box.')
      ]),

      h('select.select-signup#news-type', {
        onchange: function () {

          currentInputValues.news_type = this.value
          state.member.set(currentInputValues)
        }
      },
        utils.vDomHelpers.renderOptionsSelected(utils.mocks.newsType, currentInputValues.news_type, 'Click to select one')
       ),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('six')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('eight')
        }
      }, 'Next')
    ])
  ])

  return vtree
}
