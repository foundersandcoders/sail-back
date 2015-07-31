'use strict'

var h = require('virtual-dom/h')

/**
 *	Renders a list of options with one selected
 *
 *	@param {Array}  - array of objects like: {value: 'string', description: 'string'}
 *	@param {String} - value or description to be selected from options
 *	return {Object} - virtual dom object
 **/

module.exports.renderOptionsSelected = renderOptionsSelected.bind(undefined, h)

function renderOptionsSelected (h, options, selectedOption, placeholder) {
  var firstPlaceholderOption = [
    h('option', {
      value: '',
      disabled: true,
      selected: true
    }, placeholder)
  ]

  var element = firstPlaceholderOption.concat(
    options.map(function (elm) {
      var selected = (elm.value === selectedOption || elm.description === selectedOption)

      return h('option', {
        value: elm.value,
        selected: selected
      }, elm.description)
    })
  )

  return element
}
