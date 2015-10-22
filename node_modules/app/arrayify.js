'use strict'

module.exports = function arrayify (array_like) {
  return [].slice.call(array_like) }