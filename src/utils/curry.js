'use strict'

module.exports = function curry (fn, args) {
  return function () {
    var extended_args = (args || []).concat(require('./arrayify')(arguments))
    if ((fn.length - extended_args.length) > 0)
      return curry(fn, extended_args)
    else
      return fn.apply(undefined, extended_args) }}