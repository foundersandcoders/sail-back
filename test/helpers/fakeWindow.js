var events = require('events')
var eventEmitter = new events.EventEmitter()

var windowFake = {
  location: {},
  addEventListener: function (eventName, listener) {
    setEmitterFake(windowFake.location, eventName, listener)
  }
}

function setEmitterFake (target, eventName, listener) {
  var initialValue = target.hash || ''

  eventEmitter.on(eventName, listener)

  Object.defineProperty(target, 'hash', {
    get: function () {
      return initialValue
    },
    set: function (newValue) {
      initialValue = newValue
      eventEmitter.emit(eventName)
    },
    enumerable: true,
    configurable: true
  })
}

module.exports = windowFake
