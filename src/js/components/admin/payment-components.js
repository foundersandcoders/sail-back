/*global
  alert
*/

'use strict'

var h = require('virtual-dom/h')
var utils = require('../../app.js').utils

module.exports.view = function (state) {
  return (
  h('div#table-payments', [
    h('div.table-section-individual', [
      h('div.table-section-individual-header', [
        h('div.col-1', [
          h('h3', 'Date')
        ]),
        h('div.col-2', [
          h('h3', 'Description')
        ]),
        h('div.col-3', [
          h('h3', 'Charges')
        ]),
        h('div.col-3', [
          h('h3', 'Payments')
        ]),
        h('div.col-4', [
          h('h3', 'Balance Due')
        ]),
        h('div.col-5', [
          h('h3', 'Reference')
        ]),
        h('div.col-6', [
          h('h3', 'Notes')
        ]),
        h('div.col-7', [
          h('h3#member-delete-payment', {
            //	onclick: deleteFn
          }, 'Del.')
        ])
      ]),
      h('div.table-section-individual-rows', renderRows(state))
    ])
  ])
  )

  function renderRows (state) {
    var payments = utils.balanceDue(state.payments() || [])

    return payments.map(function (elm) {
      return (
      h('div.row.payment-row', [
        h('div.col-1', [
          h('p#member-payment-date', utils.moment(elm.date).format('DD-MM-YYYY'))
        ]),
        h('div.col-2', [
          h('p#member-payment-description', (elm.description + (elm.type ? (' by ' + elm.type) : '')))
        ]),
        h('div.col-3', [
          h('p#member-payment-charges',
            (elm.category !== 'payment' && elm.amount) ? elm.amount.toString() : '')
        ]),
        h('div.col-3', [
          h('p#member-payment-payments',
            (elm.category === 'payment' && elm.amount) ? elm.amount.toString() : '')
        ]),
        h('div.col-4', [
          h('p#member-payment-balance-due', elm.balanceDue)
        ]),
        h('div.col-5', [
          h('p#member-payment-reference', elm.reference)
        ]),
        h('div.col-6', [
          h('p#member-payment-notes', elm.notes)
        ]),
        h('div.col-7', [
          h('p#member-payment-delete', {
            onclick: state.channels.deletePayment.bind(this, state, elm.id)
          }, 'x')
        ])
      ])
      )
    })
  }
}

module.exports.subscription = function (state) {
  var data = {}

  return (
  h('div.container-small.subscription-section', [
    h('div.inner-section-divider-small'),

    h('input#amount', {
      placeholder: 'Amount',
      onchange: function () {
        data.amount = this.value
      }
    }),
    
    h('div.inner-section-divider-medium'),

    h('input#date', {
      placeholder: 'Subscription due date',
      type: 'date',
      onchange: function () {
        data.date = this.value
      }
    }),
    
    h('div.inner-section-divider-medium'),

    h('button#view-payment-btn.align-one.btn-primary', {
      onclick: function () {
        state.modePayment.set('view')
      }
    }, 'Back'),

    h('div.inner-section-divider-small'),

    h('button#charge.align-two.btn-primary', {
      onclick: function () {
        data.date = data.date || new Date()
        data.category = 'subscription'
        data.description = 'Subscription'
        data.member = state.member().id

        utils.request({
          method: 'POST',
          uri: '/api/payments',
          json: data
        }, function (err, header, body) {
          console.log('return ffrom request aoeuaoeu')
          if (err) {
            alert('Could not create subscription yo')
          } else {
            var payments = state.payments().concat([body])
            state.payments.set(payments)
            state.modePayment.set('view')
          }
        })
      }
    }, 'Charge')
  ])
  )
}

module.exports.donation = function (state) {
  var data = {}

  return (
  h('div.container-small#donation-section', [
    h('div.inner-section-divider-small'),

    h('input#amount', {
      placeholder: 'Amount',
      onchange: function () {
        data.amount = this.value
      }
    }),

    h('div.inner-section-divider-small'),

    h('input#date', {
      placeholder: 'Payment date',
      type: 'date',
      onchange: function () {
        data.date = this.value
      }
    }),

    h('div.inner-section-divider-small'),

    h('input#notes', {
      placeholder: 'Optional note',
      onchange: function () {
        data.notes = this.value
      }
    }),

    h('div.inner-section-divider-medium'),

    h('button#view-payment-btn.align-one.btn-primary', {
      onclick: function () {
        state.modePayment.set('view')
      }
    }, 'Back'),

    h('div.inner-section-divider-small'),

    h('button#charge.align-two.btn-primary', {
      onclick: function () {
        data.date = data.date || new Date()
        data.description = 'Donation'
        data.category = 'donation'
        data.member = state.member().id

        utils.request({
          method: 'POST',
          uri: '/api/payments',
          json: data
        }, function (err, header, body) {
          if (err) {
            alert('Could not create donation')
          } else {
            var payments = state.payments().concat([body])
            state.payments.set(payments)
            state.modePayment.set('view')
          }
        })
      }
    }, 'Charge')
  ])
  )
}

module.exports.payment = function (state) {
  var data = {}

  return (
  h('div.container-small#payment-section', [
    h('div.inner-section-divider-small'),

    h('select#member-controls-payment-type.mb10', {
      style: {
        width: '100%'
      },
      onchange: function () {
        data.type = this.value
      }
    }, utils.vDomHelpers.renderOptionsSelected(utils.mocks.paymentTypes, '', 'Select type')),

    h('div.inner-section-divider-small'),

    h('input#date', {
      placeholder: 'Payment date',
      type: 'date',
      onchange: function () {
        data.date = this.value
      }
    }),

    h('div.inner-section-divider-small'),

    h('input#reference', {
      placeholder: 'Reference',
      onchange: function () {
        data.reference = this.value
      }
    }),

    h('div.inner-section-divider-small'),

    h('input#amount', {
      placeholder: 'Amount',
      onchange: function () {
        data.amount = this.value
      }
    }),

    h('div.inner-section-divider-small'),

    h('input#notes', {
      placeholder: 'Notes',
      onchange: function () {
        data.notes = this.value
      }
    }),

    h('div.inner-section-divider-medium'),

    h('button#back.align-one.btn-primary', {
      onclick: function () {
        state.modePayment.set('view')
      }
    }, 'Back'),

    h('div.inner-section-divider-small'),

    h('button#charge.align-two.btn-primary', {
      onclick: function () {
        data.description = 'Payment'
        data.category = 'payment'
        data.member = state.member().id

        utils.request({
          method: 'POST',
          uri: '/api/payments',
          json: data
        }, function (err, header, body) {
          if (err) {
            alert('Could not create payment')
          } else {
            var payments = state.payments().concat([body])
            state.payments.set(payments)
            state.modePayment.set('view')
          }
        })

      }
    }, 'Pay')
  ])
  )
}
