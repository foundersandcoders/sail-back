'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')

module.exports = function three (state) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-3', 'Personal details')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('div.block', [
        h('input#title.align-one', {
          type: 'text',
          placeholder: 'Title',
          value: currentInputValues.title,
          onchange: function () {

            currentInputValues.title = this.value
	    state.member.set(currentInputValues)
          }
        }),
        h('input#initials.align-two', {
          type: 'text',
          placeholder: 'Initials',
          value: currentInputValues.initials,
          onchange: function () {

            currentInputValues.initials = this.value
	    state.member.set(currentInputValues)
          }
        })
      ]),
      h('div.inner-section-divider-small'),
      h('div.input-label-container', [
        h('h4', 'First name or nickname (optional). If you are a couple enter both names eg Dick & Val')
      ]),
      h('input#first_name', {
        type: 'text',
        placeholder: 'First name or nickname',
        value: currentInputValues.first_name,
        onchange: function () {

          currentInputValues.first_name = this.value
	  state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#last_name', {
        type: 'text',
        placeholder: 'Last name',
        value: currentInputValues.last_name,
        onchange: function () {

          currentInputValues.last_name = this.value
	  state.member.set(currentInputValues)
        }
      }),
      h('div.inner-section-divider-medium'),
      h('button.align-one.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('two')
        }
      }, 'Back'),
      h('div.inner-section-divider-small'),
      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('four')
        }
      }, 'Next')
    ]),
  ])

  return vtree
}
