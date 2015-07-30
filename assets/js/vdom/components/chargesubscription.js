'use strict'


var h = require('virtual-dom/h')


module.exports.index = function (utils, state) {

  var that = {}

  that.render = function () {

    return module.exports.view(that.postData)
  }

  that.postData = function (type) {

    return function () {

      var payload = {
	date: 		 utils.moment(),
	memberId:    document.querySelector('#member-id').textContent,
       	collection:  'charges'
      }

      var value = document.querySelector('#member-controls-subscription-amount').value

      payload.total       = (type === 'charge') ? value          : String(0 - Number(value))
      payload.description = (type === 'charge') ? 'Subscription' : 'Subscription refund'

      utils.request({
	method: 'POST',
	url: '/api/charges',
	json: payload
      }, function (e, h, b) {

	var payments = state.payments()
	payments.unshift(b)
	state.payments.set(payments)
      })
    }
  }

  return that
}


module.exports.view = function (fn) {

  return (
    h('div.container-small', [
      h('div.inner-section-divider-small'),

      h('input', {
	placeholder: 'Amount'
      }),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary',{
	onclick: function () {

	  state.panel.set('view')
	}
      },'Back'),

      h('div.inner-section-divider-small'),
      
      h('button#next-btn.align-two.btn-primary', {
	onclick: function () {

	  state.panel.set('view')
	}
      },'Charge')
    ])
  )
}
