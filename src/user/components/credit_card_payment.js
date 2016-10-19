import React from 'react'
import ReactDOM from 'react-dom'
import braintree from 'braintree-web'
import axios from 'axios'

export default class PaymentForm extends React.Component {

  componentDidMount () {
    var { make_payment, payment_error, user_payments: { amount_entered } } = this.props
    var form = ReactDOM.findDOMNode(this.refs.payment_form)
    var submit = ReactDOM.findDOMNode(this.refs.payment_form_submit)
    axios.get('/client_token')
      .then(data => data.data.token)
      .then(token => {
        braintree.client.create({
          authorization: token
        }, function (err, clientInstance) {
          if (err) {
            console.error('token err', err)
            return
          }
          createHostedFields(clientInstance, form, make_payment, payment_error, amount_entered, submit)
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <form method='post' id='cardForm' ref='payment_form'>
        <label className='hosted-fields--label' htmlFor='card-number'>Card Number</label>
        <div id='card-number' className='hosted-field'></div>

        <label className='hosted-fields--label' htmlFor='expiration-date'>Expiration Date</label>
        <div id='expiration-date' className='hosted-field'></div>

        <label className='hosted-fields--label' htmlFor='cvv'>CVV</label>
        <div id='cvv' className='hosted-field'></div>

        <label className='hosted-fields--label' htmlFor='postal-code'>Postal Code</label>
        <div id='postal-code' className='hosted-field'></div>

        {this.props.user_payments.payment_error &&
          <div>
            <h3 className='subtitle subtitle-error'>Oops... Something went wrong.</h3>
            <h3 className='subtitle subtitle-error'>{this.props.user_payments.payment_error.message}</h3>
          </div>
        }

        <div className='button-container'>
          <input
            type='submit'
            className='button button--small button--green'
            value={`Confirm £${this.props.user_payments.amount_entered} Payment`}
            id='submit'
            ref='payment_form_submit'
            disabled
          />
        </div>
      </form>
    )
  }
}

// TODO: make field errors pretty

function createHostedFields (clientInstance, form, make_payment, payment_error, amount, submit) {
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
      console.error('hostedfieldserr', hostedFieldsErr)
      return
    }

    submit.removeAttribute('disabled')

    form.addEventListener('submit', function (event) {
      event.preventDefault()

      hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
        if (tokenizeErr) {
          switch (tokenizeErr.code) {
            case 'HOSTED_FIELDS_FIELDS_EMPTY':
              return payment_error('All fields are empty! Please fill out the form.')
            case 'HOSTED_FIELDS_FIELDS_INVALID':
              return payment_error(`Some fields are invalid: ${tokenizeErr.details.invalidFieldKeys.join(', ')}`)
            default:
              return payment_error('Please refresh and try again.')
          }
        }
        make_payment({ amount, nonce: payload.nonce, type: 'credit card' })
      })
    }, false)
  })
}
