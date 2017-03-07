import React from 'react'
import { connect } from 'react-redux'
import { pick, propOr, compose, toUpper, map, pipe, split, adjust, join } from 'ramda'

import
  { amount_change
  , make_payment
  , payment_type
  , payment_error
  , braintree_error
  , get_balance_due
  , change_membership
  , add_donation
  } from '../redux/modules/user_payments.js'
import { update_member_user } from '../../shared/redux/modules/member.js'
import OnlinePayments from '../components/online_payments.js'

const CREDIT_CARD_PAYMENT = 'CREDIT_CARD_PAYMENT'
const BANK_PAYMENT = 'BANK_PAYMENT'
const HARBOUR_PAYMENT = 'HARBOUR_PAYMENT'
const CHEQUE_PAYMENT = 'CHEQUE_PAYMENT'

class PaymentForm extends React.Component {

  componentDidMount () {
    this.props.get_balance_due()
  }

  render () {
    const
      { add_donation
      , personal_details: { membership_type }
      , update_member_user
      , user_payments: { payment_type, donation_made, membership_changed }
      } = this.props
    console.log(this.props);

    return payment_type
      ? component_mapper[payment_type](this.props)
      : (<div>
          { membership_changed
            ? SuccessfulMembershipChange(propOr('annual-single', 'value')(membership_type))
            : ChangeMembershipForm (update_member_user, propOr('annual-single', 'value')(membership_type))
          }
          {donation_made ? SuccessfulDonation() : DonationForm(add_donation)}
          <PaymentAmount {...this.props}/>
        </div>)
  }
}

const ChangeMembershipForm = (update_member, membership_type) => {
  return (
    <div className='form-container'>
      <h4>
        Your membership is currently <b>{prettify_membership(membership_type)}</b>.
        If you would like to change it please select one from the dropdown menu and
        click 'Change Membership'.
      </h4>
      <form onSubmit={(e) => {
          e.preventDefault()
          return e.target[0].value !== '' && update_member({ membership_type: e.target[0].value })
      }}
      >
        <select name='membership_type'>
          <option value=''>Choose Membership</option>
          <option value='annual-single'>Annual Single</option>
          <option value='annual-double'>Annual Double</option>
          <option value='annual-family'>Annual Family</option>
          <option value='life-single'>Life Single</option>
          <option value='life-double'>Life Double</option>
        </select>
        <button type='submit'>Change Membership</button>
      </form>
    </div>
  )
}

const SuccessfulMembershipChange = (membership_type) => {
  return (
    <div className='successful-donation'>
      <h3>
        Your membership has been changed to <b>{prettify_membership(membership_type)}</b> and your payment records updated.
      </h3>
    </div>
  )
}

const prettify_membership = compose(join(' '), map(pipe(split(''), adjust(toUpper, 0), join(''))), split('-'))

const DonationForm = (add_donation) => {
  return (
    <div className='form-container'>
      <h4>
        In order to make membership of the Friends available to as many people
        as possible we try to keep our annual subscription rates down.
        If you would like to add a donation please enter the amount in the box
        and click 'Make Donation'. Otherwise select the 'Make a Payment' tab above.
      </h4>
      <form onSubmit={(e) => {
          e.preventDefault()
          add_donation({ amount: e.target[0].value })
      }}
      >
        <input type='number'/>
        <button type='submit'>Make Donation</button>
      </form>
    </div>
  )
}

const SuccessfulDonation = () => {
  return (
    <div className='successful-donation'>
      <h3>Thanks for your donation. It has been added to your records.</h3>
    </div>
  )
}

const PaymentAmount = ({ user_payments: { amount_entered, balance_due }, amount_change, payment_type }) => {
  return (
    <div className='payment-amount-container'>
      <form>
        <h2>Please enter an amount and choose a method of payment</h2>
        <h3>Payment Amount {balance_due > 0 ? `(the outstanding balance on your account is £${balance_due})` : ''}</h3>
        <input
          placeholder={balance_due + '.00'}
          type='number'
          onChange={amount_change}
        />
        <h3 className='subtitle'>Choose a payment method</h3>
        <div>
          <button disabled={amount_entered === '' || amount_entered <= 0} onClick={no_default(payment_type)(CREDIT_CARD_PAYMENT)}>Credit Card or Paypal</button>
          <button onClick={no_default(payment_type)(BANK_PAYMENT)}>Bank Transfer</button>
          <button onClick={no_default(payment_type)(HARBOUR_PAYMENT)}>Annual Harbour Dues</button>
          <button onClick={no_default(payment_type)(CHEQUE_PAYMENT)}>Cheque</button>
        </div>
      </form>
    </div>
  )
}

const no_default = action => type => e => {
  e.preventDefault()
  action(type)
}

const bank_payment_msg =
  `We’ll look forward to receiving your payment by bank transfer to FOCH Account No:
  87037440 Sort Code 52-41-20. Please remember to quote your membership number as the reference.`

const harbour_payment_msg =
  'We’ll look forward to receiving your payment with your Harbour Dues paid to the Harbour Office.'

const Payment = message => () =>
  <div>
    <h2>{message}</h2>
  </div>

const ChequePayment = () =>
  <div>
    <h2 className='cheque-payment-heading'>To pay by cheque please print out the form, fill in your details and send it to us along with your cheque.</h2>
    <a href='/cheque-payment-form.pdf'><button>Payment Form</button></a>
  </div>

const component_mapper =
  { [BANK_PAYMENT]: Payment(bank_payment_msg)
  , [CREDIT_CARD_PAYMENT]: OnlinePayments
  , [HARBOUR_PAYMENT]: Payment(harbour_payment_msg)
  , [CHEQUE_PAYMENT]: ChequePayment
  }

export default connect(pick(['user_payments', 'personal_details']),
  { make_payment
  , payment_type
  , amount_change
  , payment_error
  , braintree_error
  , get_balance_due
  , add_donation
  , change_membership
  , update_member_user
  })
  (PaymentForm)
