'use strict'

var h = require('virtual-dom/h')

module.exports = function progressBar (state, currentMemberInputs) {

  var panels = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
  var currentPanel = state.panel()
  var vtree = h('div.progress-bar', panels.map(function (panel, i) {
    var switchIndex = panels.indexOf(currentPanel)
    var cl = 'div.progress.'
    cl += (i <= switchIndex) ? 'active' : 'inactive'
    cl += (i === switchIndex) ? '.current' : ''

    return h(cl, {
      onclick: function () {

        state.member.set(currentMemberInputs)
        state.panel.set(panel)
      }
    })
  }))

  return vtree
}
