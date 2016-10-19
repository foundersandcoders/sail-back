import React from 'react'
import ReactDOM from 'react-dom'
import braintree from 'braintree-web'
import axios from 'axios'

export default class Paypal extends React.Component {

  componentDidMount () {
    var props = this.props
    var button = ReactDOM.findDOMNode(this.refs.paypal_button)
    axios.get('/client_token')
      .then(data => data.data.token)
      .then(token => {
        braintree.client.create({
          authorization: token
        }, function (err, clientInstance) {
          if (err) {
            // console.error('client create paypal error', err)
            return props.braintree_error()
          }
          setUpPaypal(clientInstance, button, props)
        })
      })
      .catch(err => {
        // console.log('catch error paypal', err)
        return props.braintree_error()
      })
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

function setUpPaypal (clientInstance, paypalButton, props) {

  var { make_payment, payment_error, braintree_error, user_payments: { amount_entered } } = props

  braintree.paypal.create({ client: clientInstance }, function (createErr, paypalInstance) {
    if (createErr) {
      // if (createErr.code === 'PAYPAL_BROWSER_NOT_SUPPORTED') {
      //   return console.error('This browser is not supported.')
      // }
      // return console.error('Error creating paypal instance!', createErr)
      return braintree_error()
    }

    paypalButton.removeAttribute('disabled')
    paypalButton.addEventListener('click', function () {
      paypalInstance.tokenize({
        flow: 'checkout',
        amount: amount_entered,
        currency: 'GBP'
      }, function (tokenizeErr, payload) {
        if (tokenizeErr) {
          // console.error('token err paypal', tokenizeErr)
          return payment_error('Please refresh and try again.')
        }
        make_payment({amount: amount_entered, nonce: payload.nonce, type: 'paypal' })
      })
    })
  })
}
