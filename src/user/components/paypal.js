import React from 'react'
import ReactDOM from 'react-dom'
import braintree from 'braintree-web'
import axios from 'axios'

export default class Paypal extends React.Component {

  componentDidMount () {
    var { make_payment, payment_error, user_payments: { amount_entered } } = this.props
    var button = ReactDOM.findDOMNode(this.refs.paypal_button)
    axios.get('/client_token')
      .then(data => data.data.token)
      .then(token => {
        braintree.client.create({
          authorization: token
        }, function (err, clientInstance) {
          if (err) {
            console.error(err)
            return
          }
          setUpPaypal(clientInstance, button, amount_entered, make_payment, payment_error)
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='paypal'>
        <input
          className='paypal_button'
          type='button'
          value='PayPal'
          id='submit'
          ref='paypal_button'
          disabled
        />
      </div>
    )
  }
}

// TODO: get rid of braintree console logs before production

function setUpPaypal (clientInstance, paypalButton, amount, make_payment, payment_error) {

  braintree.paypal.create({
  client: clientInstance
  }, function (createErr, paypalInstance) {

    if (createErr) {
      if (createErr.code === 'PAYPAL_BROWSER_NOT_SUPPORTED') {
        return console.error('This browser is not supported.')
      }
      return console.error('Error creating paypal instance!', createErr)
    }

    paypalButton.removeAttribute('disabled')
    paypalButton.addEventListener('click', function () {
      paypalInstance.tokenize({
        flow: 'checkout',
        amount: amount,
        currency: 'GBP'
      }, function (tokenizeErr, payload) {
        if (tokenizeErr) {
          console.error('token err', tokenizeErr)
          return payment_error('Please refresh and try again.')
        }
        make_payment({amount, nonce: payload.nonce, type: 'paypal' })
      })
    })
  })
}
