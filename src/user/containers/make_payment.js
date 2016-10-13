import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { credit_card_payment, payment_amount, payment_method } from '../redux/modules/user_payments.js'
import CreditCardForm from '../components/credit_card_payment.js'

import { CREDIT_CARD_PAYMENT } from '../redux/modules/user_payments.js'
const BANK_PAYMENT = 'BANK_PAYMENT'
const HARBOUR_PAYMENT = 'HARBOUR_PAYMENT'

const PaymentForm = (props) => {
  const { user_payments: { payment_method } } = props
  return payment_method
    ? component_mapper[payment_method](props)
    : <PaymentAmount {...props}/>
}

const PaymentAmount = ({ payment_amount, payment_method }) => {
  return (
    <div className='payment-amount-container'>
      <form onSubmit={on_form_submit(payment_amount)}>
        <h3>Payment Amount</h3>
        <input name='amount' placeholder='£10' type='number' min='1' max='1000' required />
        <h3>How would you like to pay?</h3>
        <div>
          <button type='submit'>Paypal or Credit Card</button>
          <button onClick={() => payment_method(BANK_PAYMENT)}>Bank Transfer</button>
          <button onClick={() => payment_method(HARBOUR_PAYMENT)}>Annual Harbour Dues</button>
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

const BankPayment = () =>
  <div>In Bank Payment</div>

const HarbourPayment = () =>
  <div>In Harbour Payment</div>

const component_mapper =
  { [BANK_PAYMENT]: BankPayment
  , [CREDIT_CARD_PAYMENT]: CreditCardPayment
  , [HARBOUR_PAYMENT]: HarbourPayment
  }

export default connect(pick(['user_payments']), { credit_card_payment, payment_amount, payment_method })(PaymentForm)
