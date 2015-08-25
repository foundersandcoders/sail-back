'use strict'

var h = require('virtual-dom/h')

module.exports.index = function (utils, state) {
  var that = {}

  that.render = function () {
    return module.exports.view(that.postData)
  }

  that.postData = function (query) {
    try {
      var payload = {
        date: utils.moment(),
        memberId: document.querySelector('#member-id').textContent,
        description: 'Donation',
        total: document.querySelector('#member-controls-donation-amount').value,
        notes: document.querySelector('#member-controls-donation-notes').value,
        collection: 'charges'
      }
    } catch (e) {
      console.log('Error post donation: ', e)
    }

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

  return that
}

module.exports.view = function (fn, state) {
  return (
  h('div.container-small', [
    h('div.inner-section-divider-small'),

    h('input', {
      placeholder: 'Amount'
    }),

    h('div.inner-section-divider-small'),

    h('input', {
      placeholder: 'Optional note'
    }),

    h('div.inner-section-divider-medium'),

    h('button.align-one.btn-primary', {
      onclick: function () {
        state.panel.set('view')
      }
    }, 'Back'),

    h('div.inner-section-divider-small'),

    h('button#next-btn.align-two.btn-primary', {
      onclick: function () {
        state.panel.set('view')
      }
    }, 'Charge')
  ])
  )
}
