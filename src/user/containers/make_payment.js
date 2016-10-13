import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { make_payment, payment_amount } from '../redux/modules/user_payments.js'
import CreditCardPayment from '../components/credit_card_payment.js'
import Paypal from '../components/paypal.js'


const PaymentForm = ({ make_payment, payment_amount, user_payments }) => {
  return user_payments.amount_entered
  // LOAD IN AN OPTION FOR PAYPAL/CREDIT CARD HERE, ACTION: PAYMENT_TYPE. COULD ALSO GET CLIENT TOKEN HERE?
    ? <CreditCardPayment make_payment={make_payment} user_payments={user_payments}/>
    // ? <Paypal user_payments={user_payments}/>
    : <PaymentAmount payment_amount={payment_amount}/>
}

const PaymentAmount = ({ payment_amount }) => {
  return (
    <div>
      <form onSubmit={on_form_submit(payment_amount)}>
        <label>How much would you like to pay?</label>
        <input name='amount' placeholder='£10' />
        <button type='submit'>Pay</button>
      </form>
    </div>
  )
}

const on_form_submit = payment_amount => e => {
  e.preventDefault()
  payment_amount(e.target[0].value)
}

export default connect(pick(['user_payments']), { make_payment, payment_amount })(PaymentForm)
