'use strict'

module.exports = function on_change (section, e) {
  var state = require('../utils/clone')(this.state)
  if (!state[section]) state[section] = {}
  state[section][e.target.id] = e.target.value
  this.setState(state)
}
