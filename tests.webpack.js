'use strict'

var RewirePlugin = require('rewire-webpack')

if (!Function.prototype.bind) {
  Function.prototype.bind = require('function-bind')
}

var context = require.context('./test/react', true, /\.test\.js$/)
context.keys().forEach(context)

module.exports = {
  plugins: [
    new RewirePlugin()
  ]
}
