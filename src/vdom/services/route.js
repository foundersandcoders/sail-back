'use strict'

module.exports = createPanelRouter

function createPanelRouter (panels, unmatched) {
  unmatched = unmatched || 'generic'
  return function getPanel (name) {
    return (panels[name]) ? panels[name] : panels[unmatched]
  }
}
