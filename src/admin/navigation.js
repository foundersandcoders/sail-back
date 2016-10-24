'use strict'

var React = require('react')

function NavButton (label) {
  return (
    <li key={label} id={'nav-' + label.toLowerCase().replace(' ', '-')}>
      <a href={'#'+label.toLowerCase().replace(' ', '')}>{label}</a>
    </li>
  )
}

var UserButtons = function () {
  return ['Account']
}

var AdminButtons = function () {
  return (
    [ 'Add Member'
    , 'Reports'
    , 'Labels'
    , 'Emails'
    , 'Letters'
    , 'Change Password'
    ]
  )
}

var UnregisteredButtons = function () {
  return (
    [ 'Signup'
    , 'Signin'
    ]
  )
}

var Navigation = React.createClass({
  render: function () {
    return (
      <ul className='navigation'>
        <li id='nav-home'>
          <a href='#/'>Home</a>
        </li>
        <li id='nav-logout'>
          <a href='/signout'>Signout</a>
        </li>
        { (this.props.user === 'Admin' ?
            AdminButtons() :
         this.props.user === 'User' ?
            UserButtons() :
            UnregisteredButtons())
            .map(NavButton) }
      </ul>
    )
  }
})

module.exports = Navigation
