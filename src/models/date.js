'use strict'

var yup = require('yup')
var standardise = require('app/standardise_date.js')

module.exports = yup.date().transform(function(val, original_val) {
  return !original_val ? undefined :
      this.isType(val) ? val :
      yup.string().isType(original_val) ? new Date(standardise(original_val)) :
      val })
