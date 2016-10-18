import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { amount_change, make_payment, payment_type } from '../redux/modules/user_payments.js'
import OnlinePayments from '../components/online_payments.js'

const CREDIT_CARD_PAYMENT = 'CREDIT_CARD_PAYMENT'
const BANK_PAYMENT = 'BANK_PAYMENT'
const HARBOUR_PAYMENT = 'HARBOUR_PAYMENT'

const PaymentForm = (props) => {
  const { user_payments: { payment_type } } = props
  return payment_type
    ? component_mapper[payment_type](props)
    : <PaymentAmount {...props}/>
}

const PaymentAmount = ({ user_payments, amount_change, payment_type }) => {
  return (
    <div className='payment-amount-container'>
      <form>
        <h1 className='title'>Please choose an amount and method of payment</h1>
        <h3>Payment Amount</h3>
        <input
          value={user_payments.amount_entered}
          name='amount'
          placeholder='£10'
          type='number'
          min='1'
          max='1000'
          required
          onChange={amount_change}
        />
        <h3 className='subtitle'>How would you like to pay?</h3>
        <div>
          <button disabled={user_payments.amount_entered === ''} onClick={no_default(payment_type)(CREDIT_CARD_PAYMENT)}>Paypal or Credit Card</button>
          <button onClick={no_default(payment_type)(BANK_PAYMENT)}>Bank Transfer</button>
          <button onClick={no_default(payment_type)(HARBOUR_PAYMENT)}>Annual Harbour Dues</button>
        </div>
      </form>
    </div>
  )
}
const no_default = (action) => type => e => {
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

const component_mapper =
  { [BANK_PAYMENT]: Payment(bank_payment_msg)
  , [CREDIT_CARD_PAYMENT]: OnlinePayments
  , [HARBOUR_PAYMENT]: Payment(harbour_payment_msg)
  }

export default connect(pick(['user_payments']),
  { make_payment, payment_type, amount_change })
  (PaymentForm)
