'use strict'

var React = require('react')

var MemberPayments = require('../components/member_payments.js')
var MemberInformation = require('../dumb_components/member_information.js')

var ViewMember = (
  { deactivate_member_click
  , edit_member_click
  , reactivate_member_click
  , cancel_member_click
  , save_member_click
  , member
  , member_edit_mode
  , member_payments
  , add_payment
  , delete_payment
  , subscription_amount
}) => (
  <div className='view-member'>
    <div className='main-container' id='member-component'>
      <div className='inner-section-divider-medium'></div>
      <MemberInformation
          {...
            { deactivate_member_click
            , edit_member_click
            , reactivate_member_click
            , cancel_member_click
            , save_member_click
            , member
            , member_edit_mode: mode
            }
          } />

      <div className='inner-section-divider-medium'></div>
      <MemberPayments
          {...
            { member_payments
            , add_payment
            , delete_payment
            , subscription_amount
            }
          } />
    </div>
  </div> )

ViewMember.propTypes =
  { deactivate_member_click: React.PropTypes.func
  , edit_member_click: React.PropTypes.func
  , reactivate_member_click: React.PropTypes.func
  , cancel_member_click: React.PropTypes.func
  , save_member_click: React.PropTypes.func
  , member: React.PropTypes.object
  , member_edit_mode: React.PropTypes.string
  , member_payments: React.PropTypes.array
  , add_payment: React.PropTypes.func
  , delete_payment: React.PropTypes.func
  , subscription_amount: React.PropTypes.number
  }

ViewMember.displayName = 'ViewMember'
