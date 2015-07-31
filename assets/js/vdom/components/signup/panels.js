'use strict'

var h = require('virtual-dom/h')
var utils = require('../../app.js').utils

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

function progressBar (state, currentMemberInputs) {

  var panels = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
  var currentPanel = state.panel()
  var vtree = h('div.progress-bar',panels.map(function (panel, i) {
    var switchIndex = panels.indexOf(currentPanel)
    var cl = 'div.progress.'
    cl += (i <= switchIndex) ? 'active' : 'inactive'
    cl += (i === switchIndex) ? '.current' : ''

    return h(cl, {
      onclick: function () {

        var memberChanges = utils
	    .lazy(state.member())
	    .extend(currentMemberInputs)
	    .toObject()

        state.member.set(memberChanges)
        return state.panel.set(panel)
      }
    })
  }))

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
module.exports.one = function (state) {
  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-1', 'Sign up')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('input#email', {
        type: 'text',
        name: 'primary_email',
        placeholder: 'Email address',
        value: currentInputValues.primary_email,
        onkeyup: function () {

          currentInputValues.primary_email = this.value
	  return currentInputValues.primary_email
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#confirm-email', {
        type: 'text',
        name: 'primary_email',
        placeholder: 'Confirm email address',
        value: currentInputValues.confirm_email,
        onkeyup: function () {

          currentInputValues.confirm_email = this.value
	  return this.value
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#password', {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        value: currentInputValues.password,
        onkeyup: function () {

          currentInputValues.password = this.value
	  return this.value
        }
      }),
      h('div.inner-section-divider-small'),
      h('input#confirm-password', {
        type: 'password',
        name: 'password',
        placeholder: 'Confirm password',
        value: currentInputValues.confirm_password,
        onkeyup: function () {

          currentInputValues.confirm_password = this.value
	  return this.value
        }
      }),
      h('div.inner-section-divider-medium'),
      h('button#next-btn.btn-primary', {
        onclick: function () {

	  var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('two', 'changeycgangecange')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

module.exports.two = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  function renderPrice (member) {
    if (utils.is.ok(member.membership_type)) {
      var index = utils.mocks.memberTypes
        .map(function (e) {return e.value})
        .indexOf(member.membership_type)

      return (
      h('div', [
        h('div.inner-section-divider-small'),
        h('h3#membership-details', 'Membership details'),
        h('input', {
          type: 'text',
          value: utils.mocks.memberTypes[index].description,
          disabled: true
        })
      ])
      )
    }
  }

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-2', 'Membership info')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      // h("div.input-label-container", [
      // 	h("h2", "Membership number: 4324319")
      // ]),

      h('div.inner-section-divider-small'),

      h('div.input-label-container', [
        h('h3', 'Choose a membership type')
      ]),

      h('select.select-signup', {
        onchange: function () {
          currentInputValues.membership_type = this.value
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()
          state.member.set(memberChanges)
        }
      },
        utils.vDomHelpers.renderOptionsSelected(utils.mocks.memberTypes, currentInputValues.membership_type, 'Click to select one')
      ),

      renderPrice(currentInputValues),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          return state.panel.set('one')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('three')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

module.exports.three = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-3', 'Personal details')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('div.block', [
        h('input#title.align-one', {
          type: 'text',
          placeholder: 'Title',
          value: currentInputValues.title,
          onkeyup: function () {

            currentInputValues.title = this.value
	    return this.value
          }
        }),
        h('input#initials.align-two', {
          type: 'text',
          placeholder: 'Initials',
          value: currentInputValues.initials,
          onkeyup: function () {

            currentInputValues.initials = this.value
	    return this.value
          }
        })
      ]),
      h('div.inner-section-divider-small'),

      h('div.input-label-container', [
        h('h4', 'First name or nickname (optional). If you are a couple enter both names eg Dick & Val')
      ]),
      h('input#first_name', {
        type: 'text',
        placeholder: 'First name or nickname',
        value: currentInputValues.first_name,
        onkeyup: function () {

          currentInputValues.first_name = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#last_name', {
        type: 'text',
        placeholder: 'Last name',
        value: currentInputValues.last_name,
        onkeyup: function () {

          currentInputValues.last_name = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          return state.panel.set('two')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          return state.panel.set('four')
        }
      }, 'Next')
    ]),
  ])

  return vtree
}

module.exports.four = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-4', 'Address details')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('input#address1', {
        type: 'text',
        placeholder: 'Address 1',
        value: currentInputValues.address1,
        onchange: function () {

          currentInputValues.address1 = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#address2', {
        type: 'text',
        placeholder: 'Address 2',
        value: currentInputValues.address2,
        onchange: function () {

	  currentInputValues.address2 = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#address3', {
        type: 'text',
        placeholder: 'Address 3',
        value: currentInputValues.address3,
        onchange: function () {

          currentInputValues.address3 = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#address4', {
        type: 'text',
        placeholder: 'Address 4',
        value: currentInputValues.address4,
        onchange: function () {

          currentInputValues.address4 = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#county', {
        type: 'text',
        placeholder: 'County',
        value: currentInputValues.county,
        onchange: function () {

          currentInputValues.county = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#postcode', {
        type: 'text',
        placeholder: 'Postcode',
        value: currentInputValues.postcode,
        onchange: function () {

          currentInputValues.postcode = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('three')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('five')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

module.exports.five = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-5', 'Contact details')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('input#home', {
        type: 'text',
        placeholder: 'Home phone number',
        value: currentInputValues.home_phone,
        onchange: function () {

          currentInputValues.home_phone = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#mobile', {
        type: 'text',
        placeholder: 'Mobile number',
        value: currentInputValues.mobile_phone,
        onchange: function () {

          currentInputValues.mobile_phone = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-small'),

      h('input#primary', {
        type: 'text',
        placeholder: 'Primary email',
        value: currentInputValues.primary_email,
        disabled: true
      }),

      h('div.inner-section-divider-small'),

      h('input#secondary', {
        type: 'text',
        placeholder: 'Secondary email',
        value: currentInputValues.secondary_email,
        onchange: function () {

          currentInputValues.secondary_email = this.value
	  return this.value
        }
      }),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('four')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('six')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

module.exports.six = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-6', 'Gift aid declaration')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [
      h('div.input-label-container', [
        h('h4', 'If you sign a Gift Aid Declaration it significantly increases the value of your subscription (and any donations you make). If you would like to sign a Gift Aid Declaration please print the form, sign it and post it to Membership Secretary')
      ]),
      h('button#print.btn-primary', {
        onclick: function () {
          return state.print()
        },
      }, 'Print'),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('five')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('seven')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

module.exports.seven = function (state) {

  var currentInputValues = utils.lazy({}).defaults(state.member()).toObject()

  var vtree = h('div.main-container', [
    h('div.inner-section-divider-small'),
    h('div.section-label', [
      h('h1#sign-up-panel-7', 'Notifications')
    ]),
    progressBar(state, currentInputValues),
    h('div.container-small', [

      h('div.input-label-container', [
        h('h2', 'Keeping in touch'),
        h('h4', 'Because it’s much easier (and cheaper) for us, we’ll send you information about Events and things by email.  If you’d prefer us to do it by post please tick the box.')
      ]),

      h('select.select-signup', {
        onchange: function () {

          currentInputValues.news_type = this.value
	  return this.value
        }
      },
        utils.vDomHelpers.renderOptionsSelected(utils.mocks.newsType, currentInputValues.news_type, 'Click to select one')
      ),

      h('div.inner-section-divider-medium'),

      h('button.align-one.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('six')
        }
      }, 'Back'),

      h('div.inner-section-divider-small'),

      h('button#next-btn.align-two.btn-primary', {
        onclick: function () {
          var memberChanges = utils.lazy(state.member()).extend(currentInputValues).toObject()

          state.member.set(memberChanges)
          state.panel.set('eight')
        }
      }, 'Next')
    ])
  ])

  return vtree
}

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
// -------------------------------------------------------------------------------------------
// Erros
// -------------------------------------------------------------------------------------------
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
// -------------------------------------------------------------------------------------------
// Make payments/donations
// -------------------------------------------------------------------------------------------
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
p        onclick: function () {
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
