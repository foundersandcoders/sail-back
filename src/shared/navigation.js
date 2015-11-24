'use strict'

var React = require('react')

var UserButtons = React.createClass({
  render: function () {
    return (
      <li>
        <li>
          <a href='#/account'>Account</a>
        </li>
      </li>
    )
  }
})

var AdminButtons = React.createClass({
  render: function () {
    return (
      <li>
        <li id='nav-add-member'>
          <a href='#addmember'>Add Member</a>
        </li>
        <li id='nav-reports'>
          <a href='#Reports'>Reports</a>
        </li>
        <li id='nav-events'>
          <a href='#addevent'>Add Event</a>
        </li>
      </li>
    )
  }
})

var UnregisteredButtons = React.createClass({
  render: function () {
    return (
      <li>
        <li id='nav-signup'>
          <a href='#/signup'>Signup</a>
        </li>
        <li>
          <a href='#/signin'>Signin</a>
        </li>
      </li>
    )
  }
})

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
            <AdminButtons /> :
         this.props.user === 'User' ?
            <UserButtons /> :
            <UnregisteredButtons /> }
      </ul>
    )
  }
})

module.exports = Navigation
