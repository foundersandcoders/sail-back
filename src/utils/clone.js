'use strict'

module.exports = function clone (obj) {
  return Object.keys(obj).reduce(function (cl, prop) {
    if (typeof obj[prop] === 'boolean' || obj[prop]) cl[prop] = obj[prop]
    return cl 
  }, {})
}
