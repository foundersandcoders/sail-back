'use strict'

var h = require('virtual-dom/h')
var clone = require('clone')
var progressBar = require('./progressbar')
var utils = require('../../app.js').utils

module.exports = function eight (state, createMember) {

  var currentInputValues = clone(state.member())

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-8', 'Member information')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      list(currentInputValues),
      h('div.inner-section-divider-medium'),
      h('button.align-one.btn-primary', {
        onclick: function () {

          state.member.set(currentInputValues)
          state.panel.set('seven')
        }
      }, 'Back'),
      h('div.inner-section-divider-small'),
      h('button#confirm.align-two.btn-primary', {
        onclick: state.channels.createMember.bind(this, state, currentInputValues)
      }, 'Confirm')
    ])
  ])

  return vtree
}

function list (member) {

  var propertiesMapper = utils.mocks.memberPropsMapper
  return propertiesMapper.map(function (elm) {

    return h('div.details-list', [
      h('div.block', [
        h(('p#' + elm.prop + '.left.meta'), elm.desc),
        h(('p#value-' + elm.prop + '.right.meta'), member[elm.prop])
      ])
    ])
  })
}
