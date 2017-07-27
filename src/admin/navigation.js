'use strict'

var React = require('react')
var connect = require('react-redux').connect
var R = require('ramda')

var NavButton = disabled => label =>
    <li key={label} id={'nav-' + label.toLowerCase().replace(' ', '-')}>
      <a href={'#'+label.toLowerCase().replace(' ', '')} className={disabled ? 'a-tag-disable' : ''}>{label}</a>
    </li>

var AdminButtons =
  [ 'Add Member'
  , 'Reports'
  , 'Labels'
  , 'Emails'
  , 'Letters'
  , 'Change Password'
  , 'Subs Due'
  ]

var Navigation = React.createClass({
  render: function () {
    return (
      <ul className='navigation'>
        <li id='nav-home'>
          <a href='#/' className={this.props.mode === 'edit' ? 'a-tag-disable' : ''}>Home</a>
        </li>
        {AdminButtons.map(NavButton(this.props.mode === 'edit'))}
        <li id='nav-logout'>
          <a href='/signout'>Signout</a>
        </li>
      </ul>
    )
  }
})

module.exports = connect(R.pick(['mode']), null)(Navigation)
