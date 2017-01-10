'use strict'

var React = require('react')
var request = require('xhr')

var Signin = React.createClass({

  getInitialState: function () {
    return {login_failed: false}
  },
  signin: function (event) {
    event.preventDefault()
    var username = this.refs.email.value || this.refs.number.value
    var user = {
      username: username,
      password: this.refs.password.value
    }
    var handle_response = function(err, res, body) { //eslint-disable-line
      if (res && res.statusCode === 200) {
        window.location.pathname = res.headers.location
      } else {
        this.setState({login_failed: true})
      }
    }.bind(this)

    request({
      method: 'POST',
      uri: '/signin',
      json: user
    }, handle_response)

  },
  forgotPass: function (event) {
    event.preventDefault()
    var email = this.refs.email.value
    var handle_response = function(err, res, body) { //eslint-disable-line
      if (err) {
        return this.setState({erroredPass: true})
      } else {
        this.setState({passwordReset: true})
      }
    }.bind(this)

    this.setState({needEmail: false, erroredPass: false, passwordReset: false})
    if (!email) {
      return this.setState({needEmail: true})
    }

    request({
      method: 'POST',
      uri: '/forgotPassword',
      json: {
        email: email
      }
    }, handle_response)
  },

  passwordMessage: function () {
    return this.state.needEmail
      ? <h3 className='red'>Please enter the correct email for your account</h3>
      : this.state.erroredPass
        ? <h3 className='red'>There was an error. Your password was not reset</h3>
        : this.state.passwordReset
          ? <h3>
              Your password has been reset. Please check your email.
            </h3>
          : <h4>
              If you are an existing member who is logging in for the first time please click 'Forgot Password' and we'll email you a temporary one
            </h4>
  },

  render: function () {
    return (

      <div className='signin-component'>
        <div className='main-container'>
          <div className='inner-section-divider-small'></div>
          <div className='section-label'>
            <h1>Sign in</h1>
            <a href='#signup'><h1>Sign up</h1></a>
          </div>
          <div className='container-small'>
            <div className='inner-section-divider-medium'></div>

            <div className='input-label-container'>
              <h3>Membership Number</h3>
            </div>

            <form onSubmit={this.signin}>

              <input type='text' ref='number' placeholder='Membership number'/>
              <div className='inner-section-divider-small'></div>

              <div className='input-label-container'>
                <h3>or Email</h3>
              </div>

              <input type='text' ref='email' id='email' placeholder='Email address'/>
              <div className='inner-section-divider-small'></div>
              <input type='password' ref='password' id='password' placeholder='Password'/>

              <div className='inner-section-divider-small'></div>
              {this.state.login_failed
                ? <div className='login-error'>Login Failed</div>
                : ''
}
              <button className='btn-primary' type='submit' id='submit-button'>Submit</button>
              <div className='inner-section-divider-small'></div>

              <div className='input-label-container'>
                <a href='#' onClick={this.forgotPass}>
                  Forgot password?
                </a>
                {this.passwordMessage()}
              </div>

            </form>

          </div>
        </div>
      </div>

    )
  }
})

module.exports = Signin
