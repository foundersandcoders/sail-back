import React from 'react'
import ReactDOM from 'react-dom'
import braintree from 'braintree-web'
import axios from 'axios'

export default class Paypal extends React.Component {
  componentDidMount () {
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
          setUpPaypal(clientInstance, button)
        })
      })
      .catch(err => console.log(err))
  }
  render () {
    return (
      <div>
        <input type='button' value='paypal' id='submit' ref='paypal_button'/>
      </div>
    )
  }

}

function setUpPaypal (clientInstance, paypalButton) {

  braintree.paypal.create({
  client: clientInstance
  }, function (createErr, paypalInstance) {


    if (createErr) {
      if (createErr.code === 'PAYPAL_BROWSER_NOT_SUPPORTED') {
        console.error('This browser is not supported.');
      } else {
        console.error('Error creating paypal instance!', createErr);
      }
    } else {
      paypalButton.addEventListener('click', function () {
        // Tokenize here!
        paypalInstance.tokenize({
          flow: 'checkout',
          amount: '10.00',
          currency: 'EUR'
        }, function (tokenizeErr, payload) {

        if (tokenizeErr) {
        // Handle tokenization errors or premature flow closure
          switch (tokenizeErr.code) {
            case 'PAYPAL_POPUP_CLOSED':
              console.error('Customer closed PayPal popup.');
              break;
            case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
              console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
              break;
            case 'PAYPAL_FLOW_FAILED':
              console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
              break;
            default:
              console.error('Error at tokenizing!', tokenizeErr);
          }
        } else {
          axios.post('/paypal_payment', {amount: '10.00', nonce: payload.nonce })
          .then(res => console.log(res))
        }
        });
      });
    }
  })
}
