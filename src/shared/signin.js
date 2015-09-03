'use strict';

var React = require('react')

var Signin = React.createClass({

    render: function () {

      return (

	<div id='signin-component'>
	  <div className='main-container'>
	    <div className='inner-section-divider-small'></div>
	    <div className='section-label'>
		<h1>Signin</h1>
	    </div>
	  <div className='container-small'>
	  <div className='inner-section-divider-medium'></div>

	  <div className='input-label-container'>
	  <h3>Membership Number</h3>
	  </div>

	  <form action='/signin' method='POST'>

	  <input type='text' placeholder='Membership number' />
	  <div className='inner-section-divider-small'></div>

	  <div className='input-label-container'>
	  <h3>or Email</h3>
	  </div>

	  <input type='text' placeholder='Email address' />
	  <div className='inner-section-divider-small'></div>
	  <input type='password' id='password' placeholder='Password' />

	  <div className='inner-section-divider-medium'></div>

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
