import React from 'react'

import CreaditCardPayment from './credit_card_payment.js'
import Paypal from './paypal.js'

export default (props) => {
  return props.user_payments.payment_sent
    ? SuccessfulPayment(props)
    : (props.user_payments.braintree_error ? Error() : PaymentOptions(props))
  }

const Error = () =>
  <div>There has been a network error. Please refresh the browser.</div>

const PaymentOptions = (props) =>
  <div className='make-payment'>
    <h1 className='title'>Online Payment</h1>
    <h3 className='subtitle'>If you would prefer to pay by PayPal</h3>
    <Paypal {...props} />
    <h3 className='subtitle'>Alternatively pay by card</h3>
    <CreaditCardPayment {...props} />
  </div>

const SuccessfulPayment = ({ user_payments }) =>
  <div className='make-payment'>
    <h1 className='title'>Successful Payment</h1>
    <h3 className='subtitle'>
      Thank you for your payment of £{user_payments.amount_entered}.
      Your reference for that payment is {user_payments.payment_sent.reference}.
    </h3>
  </div>
