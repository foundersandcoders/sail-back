import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import CreditCardForm from '../components/credit_card_payment.js'
import Paypal from '../components/paypal.js'

import { make_payment, payment_amount, payment_type } from '../redux/modules/user_payments.js'

const CREDIT_CARD_PAYMENT = 'CREDIT_CARD_PAYMENT'
const BANK_PAYMENT = 'BANK_PAYMENT'
const HARBOUR_PAYMENT = 'HARBOUR_PAYMENT'

const PaymentForm = (props) => {
  const { user_payments: { payment_type } } = props
  return payment_type
    ? component_mapper[payment_type](props)
    : <PaymentAmount {...props}/>
}

const PaymentAmount = ({ payment_amount, payment_type }) => {
  return (
    <div className='payment-amount-container'>
      <form onSubmit={on_form_submit(payment_amount)}>
        <h3>Payment Amount</h3>
        <input name='amount' placeholder='£10' type='number' min='1' max='1000' required />
        <h3>How would you like to pay?</h3>
        <div>
          <button type='submit'>Paypal or Credit Card</button>
          <button onClick={() => payment_type(BANK_PAYMENT)}>Bank Transfer</button>
          <button onClick={() => payment_type(HARBOUR_PAYMENT)}>Annual Harbour Dues</button>
        </div>
      </form>
    </div>
  )
}

const on_form_submit = payment_amount => e => {
  e.preventDefault()
  payment_amount(e.target[0].value)
}

const CreditCardPayment = (props) =>
  <CreditCardForm {...props} />

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
  , [CREDIT_CARD_PAYMENT]: CreditCardPayment
  , [HARBOUR_PAYMENT]: Payment(harbour_payment_msg)
  }

export default connect(pick(['user_payments']), { make_payment, payment_amount, payment_type })(PaymentForm)
