'use strict'

module.exports = function curry (fn) {

  var len = fn.length
  var args = []
  return function moreArgs () {
    args = args.concat([].slice.call(arguments))
    if ((len - args.length) > 0)
      return moreArgs
    else
      return fn.apply(undefined, args) }}