'use strict'

var h = require('virtual-dom/h')
var utils = require('../../app.js').utils
var clone = require('clone')
var progressBar = require('./progressbar')

module.exports.navbar = function (state) {
  return (
  h('div.mobile-nav', [
    h('h1#menu-nav', {
      onclick: function () {
        return state.panel.set('home')
      }
    }, 'Menu')
  ])
  )
}

module.exports.homePage = function (state) {

  var vtree = h('div.main-container', [
    h('div', [

      h('div.inner-section-divider-small'),

      h('div.block', [
        h('button.align-one.btn-primary#ourtest', {
          onclick: function () {
            state.panel.set('home')
          }
        }, 'Edit'),

        h('button.align-two.btn-primary', {
          onclick: function () {}
        }, 'Logout')
      ]),

      h('div.inner-section-divider-small'),

      h('div.block', [
        h('button.align-one.btn-primary', {
          onclick: function () {}
        }, 'Pay'),

        h('button.align-two.btn-primary', {
          onclick: function () {}
        }, 'Events')
      ]),

      h('div.inner-section-divider-small'),

      h('div.block', [
        h('button.align-one.btn-primary', {
          onclick: function () {}
        }, 'Donation'),

        h('button.align-two.btn-primary', {
          onclick: function () {}
        }, 'Cancel')
      ])
    ])
  ])

  return vtree
}

module.exports.home = function (state) {

  var vtree = h('div.main-container', [
    h('div.container-small', [
      h('div.inner-section-divider-medium'),
      h('button.btn-primary#vieworsignup', {
        onclick: function () {
          if (state.member().registered === 'registered') {
            return state.panel.set('account')
          } else {
            return state.panel.set('one')
          }
        }
      }, (state.member().registered === 'registered' ? 'View account' : 'Sign up')),
      h('div.inner-section-divider-small'),
      h('button#make-payment.btn-primary', {
        onclick: function () {
          return state.panel.set('gimmeMoney')
        }
      }, 'Make payment'),
      h('div.inner-section-divider-small'),
      h('button#make-payment.btn-primary#testytestytest', {
        onclick: function () {
          return state.panel.set('gimmeMoney')
        }
      }, 'Make donation'),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('browseEvents')
        }
      }, 'Browse events'),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('homePage')
        }
      }, 'Home'),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('signIn')
        }
      }, 'Sign in'),
      h('div.inner-section-divider-small'),
      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('logOut')
        }
      }, 'Log out')
    ])
  ])

  return vtree
}

module.exports.signIn = function (state) {

  var data = {}

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Sign in')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h3', 'Membership number')
      ]),

      h('input#email', {
        type: 'text',
        placeholder: 'Membership number',
        onchange: function () {

          data.membership_number = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('div.input-label-container', [
        h('h3', '...or email')
      ]),

      h('input#confirm-email', {
        type: 'text',
        placeholder: 'Email address',
        onchange: function () {

          data.email = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#password', {
        type: 'password',
        placeholder: 'Password',
        onkeyup: function () {

	  data.password = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('a', {
          href: '#',
          onclick: function (event) {
            event.preventDefault()
            state.panel.set('temporaryPassword')
          }
        }, 'Forgot password'),
        h('h4', "If you are an existing member who is logging in for the first time please click 'Forgot Password' and we’ll email you a temporary one.")
      ]),

      h('div.inner-section-divider-medium'),

      h('button#button_sign_up.btn-primary', {
        onclick: function () {
          state.panel.set('home')
        }
      }, 'Sign in')
    ])
  ])

  return vtree
}

module.exports.temporaryPassword = function (state) {

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Sign in')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h3', 'We just emailed you a provisional password')
      ]),
    ])
  ])

  return vtree
}

module.exports.account = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  function list (member) {
    var propertiesMapper = utils.mocks.memberPropsMapper

    return propertiesMapper.map(function (elm) {
      return (
      h('div.details-list', [
        h('div.block', [
          h(('p#' + elm.prop + '.left.meta'), elm.desc),
          h(('p#value-' + elm.prop + '.right.meta'), member[elm.prop])
        ])
      ])
      )
    })
  }

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#account', 'Account info')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      list(currentInputValues),

      h('div.inner-section-divider-medium'),

      h('button#edit-account.align-one.btn-primary', {
        onclick: function () {
          state.panel.set('editAccount')
        }
      }, 'Modify'),

      h('div.inner-section-divider-small'),

      h('button.align-two.btn-primary', {
        onclick: function () {
          state.panel.set('home')
        }
      }, 'Home')
    ])
  ])

  return vtree
}

// -------------------------------------------------------------------------------------------
// Sign up
// -------------------------------------------------------------------------------------------
module.exports.one = require('./one')

module.exports.two = require('./two')

module.exports.three = require('./three')

module.exports.four = require('./four')

module.exports.five = require('./five')

module.exports.six = require('./six')

module.exports.seven = require('./seven')

module.exports.eight = function (state, createMember) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  function list (member) {
    var propertiesMapper = utils.mocks.memberPropsMapper

    return propertiesMapper.map(function (elm) {
      return (
      h('div.details-list', [
        h('div.block', [
          h(('p#' + elm.prop + '.left.meta'), elm.desc),
          h(('p#value-' + elm.prop + '.right.meta'), member[elm.prop])
        ])
      ])
      )
    })
  }

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-8', 'Member information')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      list(currentInputValues),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('seven')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#confirm.align-two.btn-primary', {
        onclick: state.channels.createMember.bind(this, state, currentInputValues)
        // function () {
        // 	var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

        // 	createMember(memberChanges, function (err, member) {

        // 		if(err) {

        // 			return state.panel.set("sorryError")
        // 		}

      // 		state.member.set(member)
      // 		state.panel.set("checkEmail")
      // 	})
      // }
      }, 'Confirm')
    ])
  ])

  return vtree
}
// -------------------------------------------------------------------------------------------

module.exports.editAccount = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  function listInputs (member) {
    var propertiesMapper = utils.mocks.memberPropsMapper

    return propertiesMapper.map(function (elm) {
      return (
      h('div.details-list.no-border', [
        h('div.block', [
          h('p.left.meta', elm.desc),
          (
          elm.select === true
            ? renderSelect(elm.options, member[elm.prop], 'Click to select one', elm, member)
            : renderInput(elm, member)
          )
        ])
      ])
      )
    })
  }

  function renderInput (elmType, memberObj) {
    return (
    h(('input#' + elmType.prop), {
      type: 'text',
      placeholder: elmType.desc,
      value: memberObj[elmType.prop],
      onchange: function () {

        memberObj[elmType.prop] = this.value
	return this.value
      }
    })
    )
  }

  function renderSelect (options, selectedOption, placeholder, elmType, memberObj) {
    return (
    h(('select.select-signup#' + elmType.prop), {
      onchange: function () {
        memberObj[elmType.prop] = this.value
      }
    },
      utils.vDomHelpers.renderOptionsSelected(options, selectedOption, placeholder)
    )
    )
  }

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#edit-title', 'Member information')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      listInputs(currentInputValues),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          state.panel.set('account')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#save-cahnges.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('account')
        }
      }, 'Save')
    ])
  ])

  return vtree
}

module.exports.checkEmail = function (state) {

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#emailSent', 'Welcome!')
    ]),
    h('div.container-small', [
      h('div.inner-section-divider-medium'),
      h('div.input-label-container', [
        h('h3', 'We have just send you and email to validate your information.')
      ]),
      h('div.inner-section-divider-medium'),
      h('button#continue.btn-primary', {
        onclick: function () {
          state.panel.set('home')
        }
      }, 'Continue')
    ])
  ])

  return vtree
}

// Errors
module.exports.sorryError = function (state) {

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#emailSent', 'Welcome!')
    ]),
    h('div.container-small', [
      h('div.inner-section-divider-medium'),
      h('div.input-label-container', [
        h('h3', 'Apparently there was a problem! We are working on that!')
      ]),
      h('div.inner-section-divider-medium'),
      h('button#continue.btn-primary', {
        onclick: function () {
          state.panel.set('home')
        }
      }, 'Continue')
    ])
  ])

  return vtree
}

// Make payments/donations
module.exports.gimmeMoney = function (state) {

  function renderPayments () {}

  function expireAnnualSubscription (state) {
    return (
    h('div', [
      h('div.input-label-container', [
        h('h4', 'Your annual subscription is due on 12-12-2012 pay it now?')
      ]),

      h('div.block', [
        h('button.btn-primary.align-one', {
          onclick: function () {
            state.panel.set('paymentMethod')
          }
        }, 'Yes please'),
        h('button.btn-primary.align-two', {
          onclick: function () {
            state.panel.set('paymentMethod')
          }
        }, 'No thanks'),
      ])
    ])
    )
  }

  function doWeOweMoney (state) {
    // if the balance_due is negative render stuff

    return (
    h('div', [
      h('button.btn-primary', {
        onclick: function () {
          state.panel.set('weDoOweMoney')
        }
      }, 'Refund options')
    ])
    )
  }

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#my-account', 'My account')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-small'),

      h('div.table-payments', [
        h('div.header', [
          h('div.item', [
            h('p.meta', 'Date')
          ]),
          h('div.item', [
            h('p.meta', 'Description')
          ]),
          h('div.item', [
            h('p.meta', 'Charge')
          ])
        ]),
        h('div.body', [
          h('div.row', [
            h('div.item', [
              h('p.micro', '12 Mar 16')
            ]),
            h('div.item', [
              h('p.micro', 'Subscription')
            ]),
            h('div.item', [
              h('p.micro', '£ 20')
            ])
          ])
        ])
      ]),

      h('div.inner-section-divider-medium'),

      doWeOweMoney(state),

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h3', 'Subscription')
      ]),

      expireAnnualSubscription(state),

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h3', 'Donation')
      ]),

      h('div.block', [
        h('input.align-one', {
          type: 'text',
          placeholder: 'Amount'
        }, 'Yes please'),
        h('button.btn-primary.align-two', {
          onclick: function () {
            state.panel.set('paymentMethod')
          }
        }, 'Add'),
      ])
    ])
  ])

  return vtree
}

module.exports.weDoOweMoney = function (state) {

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Refund options')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h4', 'I would like the Friends to hold onto the balance and use it against my next annual subscription.')
      ]),
      h('div.inner-section-divider-small'),

      h('button.btn-primary', {
        onclick: function () {
          state.panel.set('weDoOweMoney')
        }
      }, 'Keep in balance'),

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h4', 'Please make a bank transfer of the balance owing to me.')
      ]),
      h('div.inner-section-divider-small'),

      h('button.btn-primary', {
        onclick: function () {
          state.panel.set('refundByBankTransfer')
        }
      }, 'Refund bank transfer')
    ])
  ])

  return vtree
}

module.exports.refundByBankTransfer = function (state) {

  var bankData = {}

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Bank transfer details')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('h3', 'Bank account name'),
      h('input', {
        type: 'text',
        placeholder: 'Bank account name',
        onchange: function () {

          bankDate.name = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('h3', 'Account number'),
      h('input', {
        type: 'text',
        placeholder: 'Account number',
        onchange: function () {

          bankDate.number = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('h3', 'Sort code'),
      h('input', {
        type: 'text',
        placeholder: 'Sort code',
        onchange: function () {

          bankDate.sort_code = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-medium'),

      h('div.input-label-container', [
        h('h4', 'We will not store any data about your bank details')
      ]),
      h('button.btn-primary', {
        onclick: function () {
          state.panel.set('gimmeMoney')
        }
      }, 'Send')
    ])
  ])

  return vtree
}

module.exports.paymentMethod = function (state) {

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1', 'Payment method')
    ]),
    h('div.container-small', [

      h('div.inner-section-divider-medium'),

      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('braintreePayment')
        }
      }, 'Credit Card'),

      h('div.inner-section-divider-small'),

      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('braintreePayment')
        }
      }, 'PayPal'),

      h('div.inner-section-divider-small'),

      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('gimmeMoney')
        }
      }, 'Bank transfer'),

      h('div.inner-section-divider-small'),

      h('button.btn-primary', {
        onclick: function () {
          return state.panel.set('gimmeMoney')
        }
      }, 'Cheque')
    ])
  ])

  return vtree
}

module.exports.braintreePayment = function (state) {
  utils.request({
    method: 'GET',
    uri: '/client_token'
  }, function (err, header, token) {
    braintree.setup(token, 'dropin', {
      container: 'payment-form',
      onReady: function () {
        var submit = utils.$$('braintree-pay').elm
        submit.removeAttribute('disabled')
        submit.className = ''
      }
    })

  })

  return h('form#checkout', {
    method: 'POST',
    action: '/paypal_payment'
  }, [
    h('div#payment-form'),
    h('input', {
      disabled: true,
      value: state().balanceDue,
      name: 'amount'
    }),
    h('input#braintree-pay.disabled', {
      type: 'submit',
      value: 'Pay',
      disabled: true
    })
  ])
}
