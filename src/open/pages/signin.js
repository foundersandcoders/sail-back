'use strict';

var React = require('react')
var request = require('xhr')
var win = window // rewireify seems to require variable declaration

var Signin = React.createClass({

    getInitialState: function () {
      return {
        login_failed: false
      }
    },
    signin: function (event) {
      event.preventDefault()
      var user = {
        username: React.findDOMNode(this.refs.email).value,
        password: React.findDOMNode(this.refs.password).value
      }
      var handle_response = function (err, res, body) {
        if (err) setState({login_failed: true})
        else if (res.statusCode === 200) win.location.pathname = res.headers.location
      }

      console.log('bout to request')
      request({
        method: 'POST',
        uri: '/signin',
        json: user
      }, handle_response)

    },
    render: function () {
      return (

        <div id='signin-component'>
          <div className='main-container'>
            <div className='inner-section-divider-small'></div>
            <div className='section-label'>
          <h1>Sign in</h1>
            </div>
          <div className='container-small'>
          <div className='inner-section-divider-medium'></div>

          <div className='input-label-container'>
          <h3>Membership Number</h3>
          </div>

          <form onSubmit={this.signin}>

          <input type='text' placeholder='Membership number' />
          <div className='inner-section-divider-small'></div>

          <div className='input-label-container'>
          <h3>or Email</h3>
          </div>

          <input type='text' ref='email' id='email'  placeholder='Email address' />
          <div className='inner-section-divider-small'></div>
          <input type='password' ref='password' id='password' placeholder='Password' />

          <div className='inner-section-divider-small'></div>
          <button className='btn-primary' type='submit' id='submit-button'>Submit</button>
          <div className='inner-section-divider-small'></div>

        <div className='input-label-container'>
          <a href='/#/forgot'>Forgot password?</a>
          <h4>If you are an existing member who is logging in for the first time please click 'Forgot Password' and we'll email you a temporary one</h4>
        </div>

          </form>

          </div>
          </div>
        </div>

        )
    }
})

module.exports = Signin
