'use strict'


var nuclear = require('nuclear.js')
var h       = nuclear.h
var utils   = require('../utils.js')


module.exports = {
  // Account:       Account,
  home:          homePageAccount,
  // payment:       paymentPage,
  // paypal:        paypal,
  // credit:        credit,
  // refundOptions: refundOptions,
  // viewProfile:   viewProfile
}


// var route


// function Account (member) {

//      member          = member || {payments: []}
//      member.payments = member.payments || []

//      var state = nuclear.observS({
//              route:    nuclear.observ(''),
//              member:   nuclear.observS(member),
//              payments: nuclear.observA(member.payments),
//              donation: nuclear.observ(''),
//              channels: {
//                      chargeDonation: chargeDonation
//              }
//      })

//      route = nuclear.router(state)

//      return state
// }

// function chargeDonation (state, chargeAmount) {

//      var charge = {
//              amount: chargeAmount,
//              category: 'donation',
//              description: 'Donation',
//              member: state.member().id
//      }

//      nuclear.request({
//              method: 'POST',
//              url: '/charge',
//              json: charge
//      }, function (error, header, body) {

//              if(error) {

//                      return alert('Problem creating a charge')
//              } else {
//                      var payments = state.payments()
//                      payments.push(body)
//                      state.payments.set(payments)
//                      state.donation.set(chargeAmount)
//                      window.location.hash = 'payment'
//              }
//      })
// }

// Account.render = function (state) {

//      return (
//              h('div.main-container', [
//                      route('/',        homePageAccount),
//                      route('/payment', paymentPage),
//                      route('/paypal',  paypal),
//                      route('/credit',  credit),
//                      route('/refund',  refundOptions),
//                      route('/profile', viewProfile)
//              ])
//      )
// }

function homePageAccount (state) {

  return (
    h('div.main-container', [
      h('div.inner-section-divider-small'),
      h('div.section-label', [
        h('h1', 'Account')
      ]),
      h('div.container-small', [
        h('div.inner-section-divider-small'),
        renderPayments(state),
        h('div.inner-section-divider-medium'),
        refundRender(state),
        h('div.inner-section-divider-medium'),
        expireAnnualSubscription(state),
        h('div.inner-section-divider-medium')
        // renderDonation(state)
      ])
    ])
  )
}

// function viewProfile (state) {

//      var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

//     return (
//         h('div.main-container', [
//             h('div.inner-section-divider-small'),
//             h('div.section-label', [
//                 h('h1#edit-title', 'Member information')
//             ]),
//             h('div.container-small', [

//                 h('div.inner-section-divider-medium'),

//                 listInputs(currentInputValues),

//                 h('div.inner-section-divider-medium'),

//                 h('button.align-one.btn-primary',{
//                     onclick: function () {
//                         state.panel.set('account')
//                     }
//                 },'Back'),

//                 h('div.inner-section-divider-small'),

//                 h('button#save-cahnges.align-two.btn-primary', {
//                     onclick: function () {
//                         var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

//                         state.member.set(memberChanges)
//                         state.panel.set('account')
//                     }
//                 },'Save')
//             ])
//         ])
//     )

//     function listInputs (member) {

//         var propertiesMapper = utils.mocks.memberPropsMapper

//         return propertiesMapper.map(function (elm) {
//             return (
//                 h('div.details-list.no-border', [
//                     h('div.block', [
//                         h('p.left.meta', elm.desc),
//                         (
//                             elm.select === true
//                             ? renderSelect(elm.options, member[elm.prop], 'Click to select one', elm, member)
//                             : renderInput(elm, member)
//                         )
//                     ])
//                 ])
//             )
//         })
//     }

//     function renderInput (elmType, memberObj) {

//         return (
//             h(('input#' + elmType.prop), {
//                 type: 'text',
//                 placeholder: elmType.desc,
//                 value: memberObj[elmType.prop],
//                 onchange: function () {
//                     return memberObj[elmType.prop] = this.value
//                 }
//             })
//         )
//     }

//     function renderSelect (options, selectedOption, placeholder, elmType, memberObj) {

//         return (
//             h(('select.select-signup#' + elmType.prop), {
//                 onchange: function () {

//                     memberObj[elmType.prop] = this.value
//                 }
//             },
//                 utils.vDomHelpers.renderOptionsSelected(options, selectedOption, placeholder)
//             )
//         )
//     }
// }

// function paymentPage (state) {

//      return (
//              h('div.main-container', [
//                      h('div.inner-section-divider-small'),
//                      h('div.section-label', [
//                              h('h1', 'Payment method')
//                      ]),
//                      h('div.container-small', [
//                              h('div.inner-section-divider-medium'),
//                              h('button.btn-primary', {
//                                      onclick: function () {
//                                              window.location.hash = 'credit'
//                                      }
//                              }, 'Credit Card'),
//                              h('div.inner-section-divider-small'),
//                              h('button.btn-primary', {
//                                      onclick: function () {
//                                              window.location.hash = 'paypal'
//                                      }
//                              }, 'PayPal'),
//                              h('div.inner-section-divider-medium'),
//                              h('div.input-label-container', [
//                                      h('h4', 'Paying by bank transfer to Friends of Chichester Harbour.'),
//                                      h('h4', 'A/c No: 87037440 Sort Code 52-41-20')
//                              ]),
//                              h('button.btn-primary', {
//                                      // onclick: state.channels.charge.bind(this, state)
//                              }, 'Bank transfer'),
//                              h('div.inner-section-divider-medium'),
//                              // h('div.input-label-container', [
//                              //      h('h4', 'Paying by bank transfer to Friends of Chichester Harbour.'),
//                              //      h('h4', 'A/c No: 87037440 Sort Code 52-41-20')
//                              // ]),
//                              h('button.btn-primary', {
//                                      // onclick: state.channels.charge.bind(this, state)
//                              }, 'Cheque')
//                      ])
//              ])
//      )
// }

// function paypal (state) {

//     nuclear.request({
//         method: 'GET',
//         uri: '/client_token'
//     }, function (err, header, body) {

//      body = JSON.parse(body)

//         braintree.setup(body.token, 'dropin', {
//             container: 'payment-form',
//             onReady: function () {

//                 var submit = utils.$$('braintree-pay').elm
//                 var amount = utils.$$('amount').elm
//                 var cancel = utils.$$('cancel').elm

//                 submit.className = ''
//                 amount.className = ''
//                 cancel.className = ''
//             },
//             paypal: function () {

//             },
//             onPaymentMethodRecieved: function (payment) {
//              // payment.nonce
//              // payment.type
//              // payment.details
//              console.log(error)
//             },
//             onError: function (error) {
//              // error.type
//              // error.message
//              console.log(error)
//             }
//         })
//     })

//      return (
//              h('div.main-container', [
//                      h('div.inner-section-divider-small'),
//                      h('div.section-label', [
//                              h('h1', 'Payment method')
//                      ]),
//                      h('div.container-small', [
//                              h('form#checkout', {
//                                      method: 'POST',
//                                      action: '/paypal_payment'
//                              }, [
//                                      h('div.inner-section-divider-medium'),
//                                      h('div#payment-form'),
//                                      h('div.inner-section-divider-small'),
//                                      h('input.disabled#amount', {
//                                              type: 'text',
//                                              name: 'amount',
//                                              placeholder: 'Insert amount'
//                                      }),
//                                      h('input.disabled#amount', {
//                                              type: 'hidden',
//                                              name: 'category',
//                                              value: 'payment'
//                                      }),
//                                      h('input.disabled#amount', {
//                                              type: 'hidden',
//                                              name: 'member',
//                                              value: state.member().id
//                                      }),
//                                      h('div.inner-section-divider-medium'),
//                                      h('button.btn-primary.disabled#braintree-pay', {
//                                              type: 'submit'
//                                      }, 'Pay'),
//                                      h('div.inner-section-divider-small'),
//                                      h('button.btn-primary.disabled#cancel', {
//                                              onclick: function () {
//                                                      window.location.hash = ''
//                                              }
//                                      }, 'Cancel')
//                              ])
//                      ])
//              ])
//      )
// }

// function credit (state) {

//      return paypal(state)
// }

// function renderDonation (state) {

//      var donationAmount

//      return ([
//              h('div.input-label-container', [
//                      h('h3', 'Donation')
//              ]),
//              h('div.block', [
//                      h('input', {
//                              type: 'text',
//                              placeholder: 'Amount',
//                              onchange: function () {
//                                      donationAmount = this.value
//                              }
//                      }, 'Yes please'),
//                      h('div.inner-section-divider-small'),
//                      h('button.btn-primary', {
//                              onclick: function () {

//                                      state.channels.chargeDonation(state, donationAmount)
//                              }
//                      }, 'Add')
//              ])
//      ])
// }

function renderPayments (state) {

  return (
    h('div.table-payments', [
      h('div.header', [
        h('div.item-one', [
          h('p.meta', 'Date')
        ]),
        h('div.item', [
          h('p.meta', 'Description')
        ]),
        h('div.item-one', [
          h('p.meta', 'Charge')
        ]),
        h('div.item-two', [
          h('p.meta', 'Due')
        ])
      ]),
      h('div.body', [
        renderRows(state)
      ])
    ])
  )
}

function renderRows (state) {

  var payments = utils.dateConverter(utils.balanceDue(state.payments()))

  return payments.map(function (elm, index) {

    return (
      h('div.row', [
        h('div.item-one', [
          h('p.micro', elm.date)
        ]),
        h('div.item', [
          h('p.micro', elm.description)
        ]),
        h('div.item-one', [
          h('p.micro', String(elm.amount))
        ]),
        h('div.item-two', [
          h('p.micro', String(elm.balanceDue))
        ])
      ])
    )
  })
}

// function refundOptions (state) {

//      return (
//              h('div.main-container', [
//                      h('div.inner-section-divider-small'),
//                      h('div.section-label', [
//                              h('h1', 'Refund options')
//                      ]),
//                      h('div.container-small', [
//                              h('div.inner-section-divider-medium'),
//                              h('div.input-label-container', [
//                                      h('h4', 'I would like the Friends to hold onto the balance and use it against my next annual subscription.')
//                              ]),
//                              h('div.inner-section-divider-small'),
//                              h('button.btn-primary', {
//                                      onclick: function () {

//                                              state.panel.set('weDoOweMoney')
//                                      }
//                              },'Keep in balance'),
//                              h('div.inner-section-divider-medium'),
//                              h('div.input-label-container', [
//                                      h('h4', 'Please make a bank transfer of the balance owing to me.')
//                              ]),
//                              h('div.inner-section-divider-small'),
//                              h('button.btn-primary', {
//                                      onclick: function () {

//                                              state.panel.set('refundByBankTransfer')
//                                      }
//                              },'Refund bank transfer')
//                      ])
//              ])
//      )
// }

function expireAnnualSubscription (state) {

  if (isSubscriptionDue(state)) {

    return (
      h('div', [
        h('div.input-label-container', [
          h('h3', 'Subscription')
        ]),
        h('div.input-label-container', [
          h('h4', 'Your annual subscription is due on 12-12-2012 pay it now?')
        ]),
        h('div.block', [
          h('button.btn-primary.align-one', {
            onclick: state.channels.redirectTo.bind(null, state, '/account/refund', nuclear)
          }, 'Yes please'),
          h('button.btn-primary.align-two', {
            onclick: state.channels.redirectTo.bind(null, state, '/account/refund', nuclear)
          },'No thanks')
        ])
      ])
    )
  }
}

function isSubscriptionDue (state) {

  return true
}

function refundRender (state) {

  if (getLastMovement(state)) {

    return (
      h('div', [
        h('button.btn-primary', {
          onclick: state.channels.redirectTo.bind(null, state, '/account/refund', nuclear)
        }, 'Refund options')
      ])
    )
  }
}

function getLastMovement (state) {

  if(
    state.payments() &&
      state.payments().length > 0 &&
      state.payments()[state.payments().length - 1] &&
      Number(state.payments()[state.payments().length - 1].balanceDue) < 0
  ) {
    return true
  } else {
    return false
  }
}
