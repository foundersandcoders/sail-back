import React from 'react'
import ReactDOM from 'react-dom'
import braintree from 'braintree-web'
import axios from 'axios'

class PaymentForm extends React.Component {

  componentDidMount () {
    var make_payment = this.props.make_payment
    var form = ReactDOM.findDOMNode(this.refs.payment_form)
    var amount = this.props.user_payments.amount_entered
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
          createHostedFields(clientInstance, form, make_payment, amount)
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='make-payment'>
        <form method='post' id='cardForm' ref='payment_form'>
          <label className='hosted-fields--label' htmlFor='card-number'>Card Number</label>
          <div id='card-number' className='hosted-field'></div>

          <label className='hosted-fields--label' htmlFor='expiration-date'>Expiration Date</label>
          <div id='expiration-date' className='hosted-field'></div>

          <label className='hosted-fields--label' htmlFor='cvv'>CVV</label>
          <div id='cvv' className='hosted-field'></div>

          <label className='hosted-fields--label' htmlFor='postal-code'>Postal Code</label>
          <div id='postal-code' className='hosted-field'></div>

          <div className='button-container'>
            <input type='submit' className='button button--small button--green' value={`Confirm £${this.props.user_payments.amount_entered} Payment`} id='submit'/>
          </div>
        </form>
      </div>
    )
  }
}

function createHostedFields (clientInstance, form, make_payment, amount) {
  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      input: {
        'font-size': '16px',
        'font-family': 'courier, monospace',
        'font-weight': 'lighter',
        color: '#ccc'
      },
      ':focus': {
        color: 'black'
      },
      '.valid': {
        color: '#8bdda8'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: 'MM/YYYY'
      },
      postalCode: {
        selector: '#postal-code',
        placeholder: '11111'
      }
    }
  }, function (hostedFieldsErr, hostedFieldsInstance) {

    if (hostedFieldsErr) {
      console.error(hostedFieldsErr)
      return
    }

    // submit.removeAttribute('disabled');

    form.addEventListener('submit', function (event) {
      event.preventDefault()

      hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
        if (tokenizeErr) {
          console.error(tokenizeErr)
          return
        }

        // If this was a real integration, this is where you would
        // send the nonce to your server.
        console.log('Got a nonce: ' + payload.nonce)
        make_payment({ amount, nonce: payload.nonce, type: 'credit card' })

      })
    }, false)
  })
}

export default PaymentForm
