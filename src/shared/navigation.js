'use strict'

var React = require('react')

var UserButtons = function () {
  return (
    <li>
      <a href='#/account'>Account</a>
    </li>
  )
}

var AdminButtons = function () {
  return (
    [
      <li key={0} id='nav-add-member'>
        <a href='#addmember'>Add Member</a>
      </li>,
      <li key={1} id='nav-reports'>
        <a href='#Reports'>Reports</a>
      </li>,
      <li key={2} id='nav-events'>
        <a href='#addevent'>Add Event</a>
      </li>,
      <li key={3} id='nav-emails'>
        <a href='#emails'>Emails</a>
      </li>
    ]
  )
}

var UnregisteredButtons = function () {
  return (
    [
      <li key={0} id='nav-signup'>
        <a href='#/signup'>Signup</a>
      </li>,
      <li key={1}>
        <a href='#/signin'>Signin</a>
      </li>
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
        { this.props.user === 'Admin' ?
            AdminButtons() :
         this.props.user === 'User' ?
            UserButtons() :
            UnregisteredButtons() }
      </ul>
    )
  }
})

module.exports = Navigation
