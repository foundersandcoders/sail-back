import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import { amount_change, make_payment, payment_type, payment_error, braintree_error, get_balance_due } from '../redux/modules/user_payments.js'
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
    const { user_payments: { payment_type } } = this.props
    return payment_type
      ? component_mapper[payment_type](this.props)
      : <PaymentAmount {...this.props}/>
  }
}

const PaymentAmount = ({ user_payments: { amount_entered, balance_due }, amount_change, payment_type }) => {
  return (
    <div className='payment-amount-container'>
      <form>
        <h2>Please enter an amount and choose a method of payment</h2>
        <h3>Payment Amount {balance_due > 0 ? `(the outstanding balance on your account is £${balance_due})` : ''}</h3>
        <input
          placeholder={'£' + balance_due}
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

export default connect(pick(['user_payments']),
  { make_payment, payment_type, amount_change, payment_error, braintree_error, get_balance_due })
  (PaymentForm)
