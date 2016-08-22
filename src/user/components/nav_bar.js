import React from 'react'
import ReactDOM from 'react-dom'
import { map, zip } from 'ramda'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class NavigationBar extends React.Component {
  componentDidMount () {
    const navBar = ReactDOM.findDOMNode(this.refs.navigation_bar)
    const collapsibleNav = navBar.querySelector('div.navbar-collapse')
    const btnToggle = navBar.querySelector('button.navbar-toggle')

    navBar.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A' ||
          e.target.classList.contains('dropdown-toggle') ||
          ! collapsibleNav.classList.contains('in')) return
      btnToggle.click()
    }, false)
  }

  render () {
    return (
      <Navbar ref='navigation_bar'>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            {map(item)(zip(routes, text))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const item = ([route, text]) =>
  <NavItem key={route} href={route}>{text}</NavItem>

const routes = [ '#', '#statements', '#make-payment', '#change-password', '/signout' ]
const text = [ 'My Details', 'My Statements', 'Make a Payment', 'Change Password', 'Sign Out' ]

export default NavigationBar
