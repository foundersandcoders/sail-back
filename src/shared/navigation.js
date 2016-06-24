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
      </li>,
      <li key={4} id='nav-letters'>
        <a href='#letters'>Letters</a>
      </li>
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
